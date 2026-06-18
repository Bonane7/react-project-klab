import { FiShoppingBag, FiUsers, FiPackage, FiDollarSign } from "react-icons/fi";

function Dashboard() {
  const stats = [
    { 
      label: "Total Orders", 
      value: "1,234", 
      icon: <FiShoppingBag className="text-3xl" />,
      color: "bg-blue-500",
      change: "+12%"
    },
    { 
      label: "Total Users", 
      value: "5,678", 
      icon: <FiUsers className="text-3xl" />,
      color: "bg-green-500",
      change: "+8%"
    },
    { 
      label: "Total Products", 
      value: "456", 
      icon: <FiPackage className="text-3xl" />,
      color: "bg-purple-500",
      change: "+5%"
    },
    { 
      label: "Revenue", 
      value: "$12,345", 
      icon: <FiDollarSign className="text-3xl" />,
      color: "bg-orange-500",
      change: "+15%"
    },
  ];

  const recentOrders = [
    { id: "#12345", customer: "John Doe", product: "Ana Grey Chair", amount: "$299.99", status: "Delivered" },
    { id: "#12346", customer: "Jane Smith", product: "Axis Sofa", amount: "$339.99", status: "Processing" },
    { id: "#12347", customer: "Bob Johnson", product: "Curved Chair", amount: "$199.99", status: "Shipped" },
    { id: "#12348", customer: "Alice Brown", product: "Natural Chair", amount: "$300.00", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-green-500 text-xs font-medium mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-lg">Recent Orders</h3>
          <button className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors duration-200">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : ''}
                      ${order.status === 'Processing' ? 'bg-blue-100 text-blue-600' : ''}
                      ${order.status === 'Shipped' ? 'bg-purple-100 text-purple-600' : ''}
                      ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : ''}
                    `}>
                      {order.status}
                    </span>
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

export default Dashboard;