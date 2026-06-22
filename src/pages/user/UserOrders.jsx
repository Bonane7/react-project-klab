import { Link } from "react-router-dom";
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiEye } from "react-icons/fi";

function UserOrders() {
  const orders = [
    { id: "#ORD-001", date: "2024-01-15", total: "$299.99", status: "Delivered", items: 2 },
    { id: "#ORD-002", date: "2024-01-12", total: "$539.99", status: "Processing", items: 3 },
    { id: "#ORD-003", date: "2024-01-08", total: "$199.99", status: "Shipped", items: 1 },
    { id: "#ORD-004", date: "2024-01-05", total: "$450.00", status: "Pending", items: 4 },
  ];

  const getStatusIcon = (status) => {
    const icons = {
      'Delivered': <FiCheckCircle className="text-green-500" />,
      'Processing': <FiClock className="text-blue-500" />,
      'Shipped': <FiTruck className="text-purple-500" />,
      'Pending': <FiClock className="text-yellow-500" />,
    };
    return icons[status] || <FiPackage />;
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-500 mt-1">Track and manage your orders</p>
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
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg">{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {order.date} • {order.items} items
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-gray-800">{order.total}</span>
                  <Link 
                    to={`/user/order/${order.id}`}
                    className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    <FiEye className="text-sm" />
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserOrders;