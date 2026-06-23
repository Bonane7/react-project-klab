import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiEye, FiXCircle, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api_v1`;

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  // ✅ Récupérer les commandes depuis l'API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`${BASE_URL}/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setOrders(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Annuler une commande
  const cancelOrder = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      setCancelling(orderId);
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/orders/${orderId}/status`,
        { status: "cancelled" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order cancelled successfully");
      // Mettre à jour la liste
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: "cancelled" } : order
      ));
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(error.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelling(null);
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      'delivered': <FiCheckCircle className="text-green-500" />,
      'processing': <FiClock className="text-blue-500" />,
      'shipped': <FiTruck className="text-purple-500" />,
      'pending': <FiClock className="text-yellow-500" />,
      'cancelled': <FiXCircle className="text-red-500" />,
    };
    return icons[status?.toLowerCase()] || <FiPackage className="text-gray-500" />;
  };

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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center">
        <FiLoader className="animate-spin text-4xl text-orange-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-500 mt-1">
            {orders.length > 0 
              ? `You have ${orders.length} order${orders.length > 1 ? 's' : ''}`
              : "No orders yet"}
          </p>
        </div>
        <Link to="/user/shop" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
          Continue Shopping →
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-600">No orders yet</h3>
          <p className="text-gray-400 mt-1">Start shopping to see your orders here</p>
          <Link to="/user/shop" className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const orderId = order._id || order.id;
            const orderNumber = order.orderNumber || orderId?.slice(-6) || "N/A";
            const status = order.status || "pending";
            const total = order.total || 0;
            const items = order.items?.length || 0;
            const createdAt = order.createdAt || order.date;

            return (
              <div key={orderId} className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="font-bold text-lg text-gray-800">
                        #{orderNumber}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      {status?.toLowerCase() === "pending" && (
                        <button
                          onClick={() => cancelOrder(orderId)}
                          disabled={cancelling === orderId}
                          className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors disabled:opacity-50"
                        >
                          {cancelling === orderId ? (
                            <FiLoader className="animate-spin inline mr-1" />
                          ) : null}
                          Cancel
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                      <span>{formatDate(createdAt)}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{items} item{items > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-gray-800">
                      RWF {typeof total === 'number' ? total.toFixed(2) : total}
                    </span>
                    <Link 
                      to={`/user/order/${orderId}`}
                      className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      <FiEye className="text-sm" />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserOrders;







// import { Link } from "react-router-dom";
// import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiEye } from "react-icons/fi";

// function UserOrders() {
//   const orders = [
//     { id: "#ORD-001", date: "2024-01-15", total: "$299.99", status: "Delivered", items: 2 },
//     { id: "#ORD-002", date: "2024-01-12", total: "$539.99", status: "Processing", items: 3 },
//     { id: "#ORD-003", date: "2024-01-08", total: "$199.99", status: "Shipped", items: 1 },
//     { id: "#ORD-004", date: "2024-01-05", total: "$450.00", status: "Pending", items: 4 },
//   ];

//   const getStatusIcon = (status) => {
//     const icons = {
//       'Delivered': <FiCheckCircle className="text-green-500" />,
//       'Processing': <FiClock className="text-blue-500" />,
//       'Shipped': <FiTruck className="text-purple-500" />,
//       'Pending': <FiClock className="text-yellow-500" />,
//     };
//     return icons[status] || <FiPackage />;
//   };

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
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
//           <p className="text-gray-500 mt-1">Track and manage your orders</p>
//         </div>
//         <Link to="/user/shop" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
//           Continue Shopping →
//         </Link>
//       </div>

//       {orders.length === 0 ? (
//         <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
//           <div className="text-5xl mb-4">📦</div>
//           <h3 className="text-xl font-semibold text-gray-600">No orders yet</h3>
//           <p className="text-gray-400 mt-1">Start shopping to see your orders here</p>
//           <Link to="/user/shop" className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
//             Start Shopping
//           </Link>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                 <div>
//                   <div className="flex items-center gap-3">
//                     <h3 className="font-bold text-lg">{order.id}</h3>
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">
//                     {order.date} • {order.items} items
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <span className="text-xl font-bold text-gray-800">{order.total}</span>
//                   <Link 
//                     to={`/user/order/${order.id}`}
//                     className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
//                   >
//                     <FiEye className="text-sm" />
//                     View
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserOrders;