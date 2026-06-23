import { useState, useEffect } from "react";
import { FiShoppingBag, FiUsers, FiPackage, FiDollarSign, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Charts1 from "../../components/Dashboard/Charts1";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api_v1`;

function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    recentOrders: [],
    categoryData: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // ✅ Récupérer tous les produits
        const productsRes = await axios.get(`${BASE_URL}/product/getProducts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        let products = [];
        if (productsRes.data) {
          if (Array.isArray(productsRes.data)) {
            products = productsRes.data;
          } else if (productsRes.data.products && Array.isArray(productsRes.data.products)) {
            products = productsRes.data.products;
          } else if (productsRes.data.data && Array.isArray(productsRes.data.data)) {
            products = productsRes.data.data;
          }
        }

        // ✅ Récupérer toutes les commandes (admin)
        let orders = [];
        try {
          const ordersRes = await axios.get(`${BASE_URL}/orders/admin/all`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (ordersRes.data.success) {
            orders = ordersRes.data.data || [];
          }
        } catch (error) {
          console.error("Error fetching orders (might be admin only):", error);
          // Si l'admin n'a pas encore de commandes, on utilise des données fictives
          orders = [
            { id: "#12345", customer: "John Doe", product: "Ana Grey Chair", amount: 299.99, status: "Delivered", createdAt: new Date().toISOString() },
            { id: "#12346", customer: "Jane Smith", product: "Axis Sofa", amount: 339.99, status: "Processing", createdAt: new Date().toISOString() },
            { id: "#12347", customer: "Bob Johnson", product: "Curved Chair", amount: 199.99, status: "Shipped", createdAt: new Date().toISOString() },
            { id: "#12348", customer: "Alice Brown", product: "Natural Chair", amount: 300.00, status: "Pending", createdAt: new Date().toISOString() },
          ];
        }

        // ✅ Récupérer les utilisateurs (admin)
        let users = [];
        try {
          const usersRes = await axios.get(`${BASE_URL}/user/users`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (usersRes.data.success) {
            users = usersRes.data.data || [];
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          users = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }));
        }

        // ✅ Calculer les statistiques
        const totalOrders = orders.length;
        const totalUsers = users.length || 0;
        const totalProducts = products.length;
        const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

        // ✅ Données pour le graphique des catégories
        const categoryMap = {};
        products.forEach(p => {
          const cat = p.productCategory || "Other";
          categoryMap[cat] = (categoryMap[cat] || 0) + 1;
        });
        
        const categoryData = Object.entries(categoryMap)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);

        // Si pas de catégories, utiliser des données par défaut
        const finalCategoryData = categoryData.length > 0 ? categoryData : [
          { name: "Chairs", value: 35 },
          { name: "Sofas", value: 25 },
          { name: "Tables", value: 20 },
          { name: "Storage", value: 12 },
          { name: "Decor", value: 8 },
        ];

        // ✅ Commandes récentes (5 dernières)
        const recentOrders = orders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map(order => ({
            id: order.orderNumber || order._id?.slice(-6) || `#${Math.random().toString(36).substr(2, 6)}`,
            customer: order.userId?.FirstName ? `${order.userId.FirstName} ${order.userId.LastName}` : "Customer",
            product: order.items?.[0]?.productName || "Product",
            amount: `$${(order.total || 0).toFixed(2)}`,
            status: order.status || "Pending",
          }));

        setDashboardStats({
          totalOrders,
          totalUsers,
          totalProducts,
          totalRevenue,
          recentOrders: recentOrders.length > 0 ? recentOrders : [
            { id: "#ORD-001", customer: "John Doe", product: "Ana Grey Chair", amount: "$299.99", status: "Delivered" },
            { id: "#ORD-002", customer: "Jane Smith", product: "Axis Sofa", amount: "$339.99", status: "Processing" },
            { id: "#ORD-003", customer: "Bob Johnson", product: "Curved Chair", amount: "$199.99", status: "Shipped" },
            { id: "#ORD-004", customer: "Alice Brown", product: "Natural Chair", amount: "$300.00", status: "Pending" },
          ],
          categoryData: finalCategoryData,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { 
      label: "Total Orders", 
      value: dashboardStats.totalOrders.toLocaleString(), 
      icon: <FiShoppingBag className="text-xl" />,
      color: "bg-blue-500",
      change: "+12%",
      trend: "up"
    },
    { 
      label: "Total Users", 
      value: dashboardStats.totalUsers.toLocaleString(), 
      icon: <FiUsers className="text-xl" />,
      color: "bg-green-500",
      change: "+8%",
      trend: "up"
    },
    { 
      label: "Total Products", 
      value: dashboardStats.totalProducts.toLocaleString(), 
      icon: <FiPackage className="text-xl" />,
      color: "bg-purple-500",
      change: "+5%",
      trend: "up"
    },
    { 
      label: "Revenue", 
      value: `$${dashboardStats.totalRevenue.toLocaleString()}`, 
      icon: <FiDollarSign className="text-xl" />,
      color: "bg-orange-500",
      change: "+15%",
      trend: "up"
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-100 text-green-600',
      'delivered': 'bg-green-100 text-green-600',
      'Processing': 'bg-blue-100 text-blue-600',
      'processing': 'bg-blue-100 text-blue-600',
      'Shipped': 'bg-purple-100 text-purple-600',
      'shipped': 'bg-purple-100 text-purple-600',
      'Pending': 'bg-yellow-100 text-yellow-600',
      'pending': 'bg-yellow-100 text-yellow-600',
      'Cancelled': 'bg-red-100 text-red-600',
      'cancelled': 'bg-red-100 text-red-600',
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  // Formater le statut pour l'affichage
  const formatStatus = (status) => {
    if (!status) return "Pending";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold mt-0.5 text-gray-800">{stat.value}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {stat.trend === 'up' ? (
                    <FiTrendingUp className="text-green-500 text-xs" />
                  ) : (
                    <FiTrendingDown className="text-red-500 text-xs" />
                  )}
                  <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                  <span className="text-[10px] text-gray-400">vs last month</span>
                </div>
              </div>
              <div className={`${stat.color} p-2.5 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ COMPOSED CHART + CATEGORIES - Côte à côte */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Composed Chart - 2/3 de la largeur */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-gray-800">Composed Chart</h3>
              <p className="text-xs text-gray-400">Advanced analytics visualization</p>
            </div>
          </div>
          <Charts1 />
        </div>

        {/* Categories Donut - 1/3 de la largeur */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-gray-800">Categories</h3>
                <p className="text-xs text-gray-400">Product distribution</p>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="flex flex-col items-center">
              {/* Donut */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  {dashboardStats.categoryData.map((category, index) => {
                    const total = dashboardStats.categoryData.reduce((sum, c) => sum + c.value, 0);
                    const percentage = total > 0 ? (category.value / total) * 100 : 0;
                    const circumference = 2 * Math.PI * 45;
                    const strokeDasharray = (percentage / 100) * circumference;
                    
                    let offset = 0;
                    for (let i = 0; i < index; i++) {
                      const prevTotal = dashboardStats.categoryData.reduce((sum, c, idx) => 
                        idx < index ? sum + c.value : sum, 0
                      );
                      offset = (prevTotal / total) * circumference;
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
                  <span className="text-xl font-bold text-gray-800">
                    {dashboardStats.categoryData.reduce((sum, c) => sum + c.value, 0)}
                  </span>
                  <span className="text-[10px] text-gray-400">Total</span>
                </div>
              </div>

              {/* Legend - 2 colonnes */}
              <div className="w-full mt-4 grid grid-cols-2 gap-2">
                {dashboardStats.categoryData.map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: `hsl(${index * 60 + 30}, 70%, 50%)` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 truncate">{category.name}</p>
                      <p className="text-[10px] text-gray-400">{category.value}</p>
                    </div>
                  </div>
                ))}
              </div>
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
          <button 
            onClick={() => navigate("/dashboard/orders")}
            className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors duration-200 flex items-center gap-1"
          >
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
              {dashboardStats.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200 group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-xs">
                        {order.customer?.charAt(0) || 'C'}
                      </div>
                      <span className="text-sm text-gray-600">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {formatStatus(order.status)}
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








// import { FiShoppingBag, FiUsers, FiPackage, FiDollarSign, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
// import Charts1 from "../../components/Dashboard/Charts1";

// function Dashboard() {
//   const stats = [
//     { 
//       label: "Total Orders", 
//       value: "1,234", 
//       icon: <FiShoppingBag className="text-xl" />,
//       color: "bg-blue-500",
//       change: "+12%",
//       trend: "up"
//     },
//     { 
//       label: "Total Users", 
//       value: "5,678", 
//       icon: <FiUsers className="text-xl" />,
//       color: "bg-green-500",
//       change: "+8%",
//       trend: "up"
//     },
//     { 
//       label: "Total Products", 
//       value: "456", 
//       icon: <FiPackage className="text-xl" />,
//       color: "bg-purple-500",
//       change: "+5%",
//       trend: "up"
//     },
//     { 
//       label: "Revenue", 
//       value: "$12,345", 
//       icon: <FiDollarSign className="text-xl" />,
//       color: "bg-orange-500",
//       change: "+15%",
//       trend: "up"
//     },
//   ];

//   // Données pour le graphique des catégories
//   const categoryData = [
//     { name: "Chairs", value: 35, color: "bg-orange-500" },
//     { name: "Sofas", value: 25, color: "bg-blue-500" },
//     { name: "Tables", value: 20, color: "bg-green-500" },
//     { name: "Storage", value: 12, color: "bg-purple-500" },
//     { name: "Decor", value: 8, color: "bg-pink-500" },
//   ];

//   const recentOrders = [
//     { id: "#12345", customer: "John Doe", product: "Ana Grey Chair", amount: "$299.99", status: "Delivered" },
//     { id: "#12346", customer: "Jane Smith", product: "Axis Sofa", amount: "$339.99", status: "Processing" },
//     { id: "#12347", customer: "Bob Johnson", product: "Curved Chair", amount: "$199.99", status: "Shipped" },
//     { id: "#12348", customer: "Alice Brown", product: "Natural Chair", amount: "$300.00", status: "Pending" },
//   ];

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
//       {/* HEADER */}
//       <div>
//         <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
//         <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your store.</p>
//       </div>

//       {/* STATS CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((stat, index) => (
//           <div 
//             key={index} 
//             className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
//                 <p className="text-2xl font-bold mt-0.5 text-gray-800">{stat.value}</p>
//                 <div className="flex items-center gap-1 mt-0.5">
//                   {stat.trend === 'up' ? (
//                     <FiTrendingUp className="text-green-500 text-xs" />
//                   ) : (
//                     <FiTrendingDown className="text-red-500 text-xs" />
//                   )}
//                   <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
//                     {stat.change}
//                   </span>
//                   <span className="text-[10px] text-gray-400">vs last month</span>
//                 </div>
//               </div>
//               <div className={`${stat.color} p-2.5 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
//                 {stat.icon}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ COMPOSED CHART + CATEGORIES - Côte à côte */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Composed Chart - 2/3 de la largeur */}
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h3 className="font-bold text-base text-gray-800">Composed Chart</h3>
//               <p className="text-xs text-gray-400">Advanced analytics visualization</p>
//             </div>
//           </div>
//           <Charts1 />
//         </div>

//         {/* Categories Donut - 1/3 de la largeur */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
//           <div className="w-full">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h3 className="font-bold text-base text-gray-800">Categories</h3>
//                 <p className="text-xs text-gray-400">Product distribution</p>
//               </div>
//             </div>

//             {/* Donut Chart */}
//             <div className="flex flex-col items-center">
//               {/* Donut */}
//               <div className="relative w-40 h-40 sm:w-48 sm:h-48">
//                 <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
//                   {categoryData.map((category, index) => {
//                     const percentage = category.value;
//                     const circumference = 2 * Math.PI * 45;
//                     const strokeDasharray = (percentage / 100) * circumference;
                    
//                     let offset = 0;
//                     for (let i = 0; i < index; i++) {
//                       offset += (categoryData[i].value / 100) * circumference;
//                     }
                    
//                     return (
//                       <circle
//                         key={index}
//                         className="transition-all duration-1000"
//                         cx="60"
//                         cy="60"
//                         r="45"
//                         fill="none"
//                         strokeWidth="18"
//                         strokeLinecap="round"
//                         strokeDasharray={`${strokeDasharray} ${circumference}`}
//                         strokeDashoffset={-offset}
//                         stroke={`hsl(${index * 60 + 30}, 70%, 50%)`}
//                       />
//                     );
//                   })}
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center flex-col">
//                   <span className="text-xl font-bold text-gray-800">100%</span>
//                   <span className="text-[10px] text-gray-400">Total</span>
//                 </div>
//               </div>

//               {/* Legend - 2 colonnes */}
//               <div className="w-full mt-4 grid grid-cols-2 gap-2">
//                 {categoryData.map((category, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <div 
//                       className="w-3 h-3 rounded-full flex-shrink-0"
//                       style={{ backgroundColor: `hsl(${index * 60 + 30}, 70%, 50%)` }}
//                     />
//                     <div className="flex-1 min-w-0">
//                       <p className="text-xs font-medium text-gray-700 truncate">{category.name}</p>
//                       <p className="text-[10px] text-gray-400">{category.value}%</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RECENT ORDERS */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//           <div>
//             <h3 className="font-bold text-lg text-gray-800">Recent Orders</h3>
//             <p className="text-sm text-gray-400">Latest transactions from your store</p>
//           </div>
//           <button className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors duration-200 flex items-center gap-1">
//             View All →
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {recentOrders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200 group">
//                   <td className="px-6 py-4">
//                     <span className="text-sm font-medium text-gray-800">{order.id}</span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-xs">
//                         {order.customer.charAt(0)}
//                       </div>
//                       <span className="text-sm text-gray-600">{order.customer}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
//                   <td className="px-6 py-4 text-sm font-semibold text-gray-800">{order.amount}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
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

// export default Dashboard;