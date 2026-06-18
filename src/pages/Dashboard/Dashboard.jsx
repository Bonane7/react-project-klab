import { FiShoppingBag, FiUsers, FiPackage, FiDollarSign, FiTrendingUp, FiTrendingDown } from "react-icons/fi";

function Dashboard() {
  const stats = [
    { 
      label: "Total Orders", 
      value: "1,234", 
      icon: <FiShoppingBag className="text-3xl" />,
      color: "bg-blue-500",
      change: "+12%",
      trend: "up"
    },
    { 
      label: "Total Users", 
      value: "5,678", 
      icon: <FiUsers className="text-3xl" />,
      color: "bg-green-500",
      change: "+8%",
      trend: "up"
    },
    { 
      label: "Total Products", 
      value: "456", 
      icon: <FiPackage className="text-3xl" />,
      color: "bg-purple-500",
      change: "+5%",
      trend: "up"
    },
    { 
      label: "Revenue", 
      value: "$12,345", 
      icon: <FiDollarSign className="text-3xl" />,
      color: "bg-orange-500",
      change: "+15%",
      trend: "up"
    },
  ];

  // Données pour le graphique des ventes mensuelles
  const monthlySales = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 5500 },
    { month: "Jul", sales: 7000 },
    { month: "Aug", sales: 6500 },
    { month: "Sep", sales: 8000 },
    { month: "Oct", sales: 7500 },
    { month: "Nov", sales: 9000 },
    { month: "Dec", sales: 8500 },
  ];

  // Données pour le graphique des catégories
  const categoryData = [
    { name: "Chairs", value: 35, color: "bg-orange-500" },
    { name: "Sofas", value: 25, color: "bg-blue-500" },
    { name: "Tables", value: 20, color: "bg-green-500" },
    { name: "Storage", value: 12, color: "bg-purple-500" },
    { name: "Decor", value: 8, color: "bg-pink-500" },
  ];

  // Calcul du max pour l'échelle du graphique
  const maxSales = Math.max(...monthlySales.map(item => item.sales));

  const recentOrders = [
    { id: "#12345", customer: "John Doe", product: "Ana Grey Chair", amount: "$299.99", status: "Delivered" },
    { id: "#12346", customer: "Jane Smith", product: "Axis Sofa", amount: "$339.99", status: "Processing" },
    { id: "#12347", customer: "Bob Johnson", product: "Curved Chair", amount: "$199.99", status: "Shipped" },
    { id: "#12348", customer: "Alice Brown", product: "Natural Chair", amount: "$300.00", status: "Pending" },
  ];

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
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold mt-1 text-gray-800">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === 'up' ? (
                    <FiTrendingUp className="text-green-500 text-sm" />
                  ) : (
                    <FiTrendingDown className="text-red-500 text-sm" />
                  )}
                  <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-400">vs last month</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BAR CHART - Monthly Sales */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg text-gray-800">Monthly Sales</h3>
              <p className="text-sm text-gray-400">Revenue overview for 2024</p>
            </div>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-orange-500">
              <option>This Year</option>
              <option>Last Year</option>
              <option>Last 6 Months</option>
            </select>
          </div>

          {/* Bar Chart */}
          <div className="h-64 flex items-end gap-2">
            {monthlySales.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full max-w-[40px] bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-lg hover:from-orange-600 hover:to-orange-400 transition-all duration-300 cursor-pointer group relative"
                  style={{ 
                    height: `${(item.sales / maxSales) * 100}%`,
                    minHeight: '10px'
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    ${item.sales}
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-medium">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DONUT CHART - Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg text-gray-800">Categories</h3>
              <p className="text-sm text-gray-400">Product distribution</p>
            </div>
          </div>

          {/* Donut Chart Visualization */}
          <div className="flex flex-col items-center">
            {/* Donut */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                {categoryData.map((category, index) => {
                  const percentage = category.value;
                  const circumference = 2 * Math.PI * 45;
                  const strokeDasharray = (percentage / 100) * circumference;
                  
                  // Calcul de l'offset pour chaque segment
                  let offset = 0;
                  for (let i = 0; i < index; i++) {
                    offset += (categoryData[i].value / 100) * circumference;
                  }
                  
                  return (
                    <circle
                      key={index}
                      className="transition-all duration-1000"
                      cx="60"
                      cy="60"
                      r="45"
                      fill="none"
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeDasharray={`${strokeDasharray} ${circumference}`}
                      strokeDashoffset={-offset}
                      stroke={`hsl(${index * 60 + 30}, 70%, 50%)`}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-gray-800">100%</span>
                <span className="text-xs text-gray-400">Total Products</span>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full mt-6 grid grid-cols-2 gap-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `hsl(${index * 60 + 30}, 70%, 50%)` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{category.name}</p>
                    <p className="text-xs text-gray-400">{category.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg text-gray-800">Recent Orders</h3>
            <p className="text-sm text-gray-400">Latest transactions from your store</p>
          </div>
          <button className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors duration-200 flex items-center gap-1">
            View All →
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
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200 group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-xs">
                        {order.customer.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-600">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
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