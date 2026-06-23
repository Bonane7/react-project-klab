import { useState, useEffect } from "react";
import { FiSearch, FiEye, FiChevronDown, FiLoader, FiAlertCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api_v1`;

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  // ✅ Récupérer les commandes depuis l'API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to view orders");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${BASE_URL}/orders/admin/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Orders API Response:", res.data);

        if (res.data.success) {
          setOrders(res.data.data || []);
        } else {
          toast.error("Failed to load orders");
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error(error.response?.data?.message || "Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Mettre à jour le statut d'une commande
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(orderId);
      const token = localStorage.getItem("token");
      
      const res = await axios.put(
        `${BASE_URL}/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        // Mettre à jour la liste
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error.response?.data?.message || "Failed to update order status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // ✅ Filtrer les commandes
  const getFilteredOrders = () => {
    let filtered = orders;

    // Filtre par statut
    if (filter !== "All") {
      filtered = filtered.filter(order => 
        order.status?.toLowerCase() === filter.toLowerCase()
      );
    }

    // Filtre par recherche
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(order => {
        const orderNumber = order.orderNumber || order._id || '';
        const customerName = order.userId?.FirstName || order.userId?.name || order.customerName || '';
        const productName = order.items?.[0]?.productName || order.product || '';
        return orderNumber.toLowerCase().includes(search) ||
               customerName.toLowerCase().includes(search) ||
               productName.toLowerCase().includes(search);
      });
    }

    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  const getStatusColor = (status) => {
    const colors = {
      'delivered': 'bg-green-100 text-green-600',
      'processing': 'bg-blue-100 text-blue-600',
      'shipped': 'bg-purple-100 text-purple-600',
      'pending': 'bg-yellow-100 text-yellow-600',
      'cancelled': 'bg-red-100 text-red-600',
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'delivered': <FiCheckCircle className="text-green-500" />,
      'processing': <FiLoader className="text-blue-500 animate-spin" />,
      'shipped': <FiLoader className="text-purple-500" />,
      'pending': <FiLoader className="text-yellow-500 animate-spin" />,
      'cancelled': <FiXCircle className="text-red-500" />,
    };
    return icons[status?.toLowerCase()] || null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatStatus = (status) => {
    if (!status) return "Pending";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const getCustomerName = (order) => {
    if (order.userId) {
      if (typeof order.userId === 'object') {
        return order.userId.FirstName 
          ? `${order.userId.FirstName} ${order.userId.LastName || ''}` 
          : order.userId.name || "Customer";
      }
    }
    return order.customerName || "Customer";
  };

  const getProductName = (order) => {
    if (order.items && order.items.length > 0) {
      return order.items[0].productName || "Product";
    }
    return order.product || "Product";
  };

  const getTotalItems = (order) => {
    if (order.items) {
      return order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }
    return 1;
  };

  // ✅ Voir les détails de la commande
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="animate-spin text-4xl text-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
          <p className="text-gray-500 text-sm">Track and manage all orders</p>
        </div>
        <div className="text-sm text-gray-400">
          Total: <span className="font-semibold text-gray-600">{orders.length}</span> orders
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders by ID, customer or product..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200
                ${filter === status 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }
              `}
            >
              {status} {status === "All" && `(${orders.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
            <FiAlertCircle className="text-4xl" />
            <p className="text-sm font-medium">No orders found</p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="text-orange-500 hover:text-orange-600 text-sm font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => {
                  const orderId = order._id || order.id;
                  const orderNumber = order.orderNumber || orderId?.slice(-6) || "N/A";
                  
                  return (
                    <tr key={orderId} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        #{orderNumber}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-xs">
                            {getCustomerName(order).charAt(0) || 'C'}
                          </div>
                          <span className="text-sm text-gray-600">{getCustomerName(order)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {getProductName(order)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {getTotalItems(order)}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                        ${(order.total || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <select
                            value={order.status || "pending"}
                            onChange={(e) => updateOrderStatus(orderId, e.target.value)}
                            disabled={updatingStatus === orderId}
                            className={`
                              px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer
                              ${getStatusColor(order.status)}
                              ${updatingStatus === orderId ? 'opacity-50 cursor-not-allowed' : ''}
                              focus:outline-none focus:ring-2 focus:ring-orange-500
                            `}
                          >
                            {statusOptions.filter(s => s !== "All").map((status) => (
                              <option key={status} value={status.toLowerCase()}>
                                {status}
                              </option>
                            ))}
                          </select>
                          {updatingStatus === orderId && (
                            <FiLoader className="absolute -right-6 top-1/2 -translate-y-1/2 animate-spin text-orange-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => viewOrderDetails(order)}
                            className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors duration-200"
                            title="View Details"
                          >
                            <FiEye />
                          </button>
                          <button 
                            className="p-2 hover:bg-orange-50 rounded-lg text-orange-500 transition-colors duration-200"
                            title="More Options"
                          >
                            <FiChevronDown />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order count */}
      {!loading && filteredOrders.length > 0 && (
        <p className="text-sm text-gray-400 text-right">
          Showing <span className="font-semibold text-gray-600">{filteredOrders.length}</span> of <span className="font-semibold text-gray-600">{orders.length}</span> orders
        </p>
      )}

      {/* ✅ Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 animate-[fadeIn_.2s_ease]">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-800">
                Order Details #{selectedOrder.orderNumber || selectedOrder._id?.slice(-6)}
              </h3>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiXCircle className="text-xl text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Status</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {formatStatus(selectedOrder.status)}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Date</p>
                  <p className="text-sm font-medium">{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Customer</p>
                  <p className="text-sm font-medium">{getCustomerName(selectedOrder)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Total</p>
                  <p className="text-sm font-bold text-orange-500">${(selectedOrder.total || 0).toFixed(2)}</p>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.productName} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">🛋️</div>
                        )}
                        <div>
                          <p className="text-sm font-medium">{item.productName}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              {selectedOrder.address && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Shipping Address</h4>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                    <p>{selectedOrder.address.street}</p>
                    <p>{selectedOrder.address.city}, {selectedOrder.address.country}</p>
                    {selectedOrder.address.postalCode && <p>Postal: {selectedOrder.address.postalCode}</p>}
                    {selectedOrder.address.phone && <p>Phone: {selectedOrder.address.phone}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;





// import { useState } from "react";
// import { FiSearch, FiEye, FiChevronDown } from "react-icons/fi";

// function Orders() {
//   const [filter, setFilter] = useState("All");

//   const orders = [
//     { id: "#12345", customer: "John Doe", product: "Ana Gray Chair", amount: "$299.99", date: "2024-01-15", status: "Delivered" },
//     { id: "#12346", customer: "Jane Smith", product: "Axis Sofa", amount: "$339.99", date: "2024-01-14", status: "Processing" },
//     { id: "#12347", customer: "Bob Johnson", product: "Curved Chair", amount: "$199.99", date: "2024-01-13", status: "Shipped" },
//     { id: "#12348", customer: "Alice Brown", product: "Natural Chair", amount: "$300.00", date: "2024-01-12", status: "Pending" },
//   ];

//   const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered"];

//   const getStatusColor = (status) => {
//     const colors = {
//       'Delivered': 'bg-green-100 text-green-600',
//       'Processing': 'bg-blue-100 text-blue-600',
//       'Shipped': 'bg-purple-100 text-purple-600',
//       'Pending': 'bg-yellow-100 text-yellow-600',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-600';
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
//         <p className="text-gray-500 text-sm">Track and manage all orders</p>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1 max-w-md">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search orders..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300"
//           />
//         </div>
//         <div className="flex gap-2 overflow-x-auto pb-2">
//           {statusOptions.map((status) => (
//             <button
//               key={status}
//               onClick={() => setFilter(status)}
//               className={`
//                 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200
//                 ${filter === status 
//                   ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
//                   : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }
//               `}
//             >
//               {status}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {orders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
//                   <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
//                   <td className="px-6 py-4 text-sm font-semibold">{order.amount}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-end gap-2">
//                       <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors duration-200">
//                         <FiEye />
//                       </button>
//                       <button className="p-2 hover:bg-orange-50 rounded-lg text-orange-500 transition-colors duration-200">
//                         <FiChevronDown />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Orders;






// import { useState } from "react";
// import { FiSearch, FiEye, FiChevronDown } from "react-icons/fi";

// function Orders() {
//   const [filter, setFilter] = useState("All");

//   const orders = [
//     { id: "#12345", customer: "John Doe", product: "Ana Gray Chair", amount: "$299.99", date: "2024-01-15", status: "Delivered" },
//     { id: "#12346", customer: "Jane Smith", product: "Axis Sofa", amount: "$339.99", date: "2024-01-14", status: "Processing" },
//     { id: "#12347", customer: "Bob Johnson", product: "Curved Chair", amount: "$199.99", date: "2024-01-13", status: "Shipped" },
//     { id: "#12348", customer: "Alice Brown", product: "Natural Chair", amount: "$300.00", date: "2024-01-12", status: "Pending" },
//   ];

//   const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered"];

//   const getStatusColor = (status) => {
//     const colors = {
//       'Delivered': 'bg-green-100 text-green-600',
//       'Processing': 'bg-blue-100 text-blue-600',
//       'Shipped': 'bg-purple-100 text-purple-600',
//       'Pending': 'bg-yellow-100 text-yellow-600',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-600';
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
//         <p className="text-gray-500 text-sm">Track and manage all orders</p>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1 max-w-md">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search orders..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300"
//           />
//         </div>
//         <div className="flex gap-2 overflow-x-auto pb-2">
//           {statusOptions.map((status) => (
//             <button
//               key={status}
//               onClick={() => setFilter(status)}
//               className={`
//                 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200
//                 ${filter === status 
//                   ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
//                   : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
//                 }
//               `}
//             >
//               {status}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {orders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
//                   <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
//                   <td className="px-6 py-4 text-sm font-semibold">{order.amount}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-end gap-2">
//                       <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors duration-200">
//                         <FiEye />
//                       </button>
//                       <button className="p-2 hover:bg-orange-50 rounded-lg text-orange-500 transition-colors duration-200">
//                         <FiChevronDown />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Orders;