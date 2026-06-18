import { useState } from "react";
import { FiSearch, FiEye, FiChevronDown } from "react-icons/fi";

function Orders() {
  const [filter, setFilter] = useState("All");

  const orders = [
    { id: "#12345", customer: "John Doe", product: "Ana Gray Chair", amount: "$299.99", date: "2024-01-15", status: "Delivered" },
    { id: "#12346", customer: "Jane Smith", product: "Axis Sofa", amount: "$339.99", date: "2024-01-14", status: "Processing" },
    { id: "#12347", customer: "Bob Johnson", product: "Curved Chair", amount: "$199.99", date: "2024-01-13", status: "Shipped" },
    { id: "#12348", customer: "Alice Brown", product: "Natural Chair", amount: "$300.00", date: "2024-01-12", status: "Pending" },
  ];

  const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered"];

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-100 text-green-600',
      'Processing': 'bg-blue-100 text-blue-600',
      'Shipped': 'bg-purple-100 text-purple-600',
      'Pending': 'bg-yellow-100 text-yellow-600',
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
        <p className="text-gray-500 text-sm">Track and manage all orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300"
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
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{order.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors duration-200">
                        <FiEye />
                      </button>
                      <button className="p-2 hover:bg-orange-50 rounded-lg text-orange-500 transition-colors duration-200">
                        <FiChevronDown />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;