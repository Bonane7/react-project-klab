import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FiHome, 
  FiPackage, 
  FiUsers, 
  FiMail, 
  FiSettings, 
  FiShoppingCart,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiSearch
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
    }
  }, []);

  // Détecter les changements de taille d'écran
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fermer le sidebar automatiquement sur mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FiHome className="text-xl" /> },
    { path: "/dashboard/products", label: "Products", icon: <FiPackage className="text-xl" /> },
    { path: "/dashboard/users", label: "Users", icon: <FiUsers className="text-xl" /> },
    { path: "/dashboard/orders", label: "Orders", icon: <FiShoppingCart className="text-xl" /> },
    { path: "/dashboard/contacts", label: "Contacts", icon: <FiMail className="text-xl" /> },
    { path: "/dashboard/settings", label: "Settings", icon: <FiSettings className="text-xl" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Recherche:", searchQuery);
  };

  const isItemActive = (itemPath) => {
    if (itemPath === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname === itemPath || location.pathname.startsWith(itemPath + '/');
  };

  // Trouver le titre actif
  const activeTitle = menuItems.find(item => 
    location.pathname === item.path || location.pathname.startsWith(item.path + '/')
  )?.label || 'Dashboard';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* OVERLAY MOBILE */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
          onClick={closeMobileSidebar}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-white shadow-2xl lg:shadow-lg
          transition-all duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isSidebarOpen ? 'w-72 lg:w-64' : 'w-20'}
          flex flex-col
          h-full
        `}
      >
        {/* LOGO */}
        <div className="flex items-center justify-between h-16 lg:h-20 px-4 border-b border-gray-100">
          <Link 
            to="/dashboard" 
            className={`flex items-center gap-2 font-Maven font-bold text-xl lg:text-2xl transition-all duration-300 ${!isSidebarOpen ? 'lg:opacity-0 lg:scale-95 lg:pointer-events-none' : 'opacity-100 scale-100'}`}
          >
        
            <span>muniture</span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            {isSidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
          <button
            onClick={closeMobileSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* MENU ITEMS */}
        <nav className="flex-1 overflow-y-auto py-3 lg:py-4 px-2 lg:px-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {menuItems.map((item) => {
            const isActive = isItemActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileSidebar}
                className={`
                  flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl mb-0.5 lg:mb-1
                  transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-orange-50 text-orange-500 shadow-sm' 
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'
                  }
                `}
              >
                <span className={`flex-shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                <span className={`font-medium transition-all duration-300 ${!isSidebarOpen ? 'lg:opacity-0 lg:w-0 lg:overflow-hidden lg:mx-0' : 'opacity-100'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-500 rounded-full" />
                )}
                {/* Tooltip pour sidebar fermée */}
                {!isSidebarOpen && (
                  <span className="hidden lg:block absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER SIDEBAR */}
        <div className="border-t border-gray-100 p-3 lg:p-4 mt-auto">
          <div className={`flex items-center gap-3 ${!isSidebarOpen ? 'lg:justify-center' : ''}`}>
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <span className="text-orange-500 font-bold text-base lg:text-lg">
                {(user?.FirstName || 'A')[0].toUpperCase()}
              </span>
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-300 ${!isSidebarOpen ? 'lg:opacity-0 lg:w-0 lg:overflow-hidden' : 'opacity-100'}`}>
              <p className="font-medium text-sm truncate">
                {user ? `${user.FirstName} ${user.LastName}` : 'Admin User'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email || 'admin@muniture.com'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP NAVBAR */}
        <header className="h-16 lg:h-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-3 sm:px-4 lg:px-8 flex-shrink-0 gap-2 lg:gap-4">
          {/* LEFT - Hamburger + Title */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleSidebar}
              className="p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 lg:hidden"
            >
              <FiMenu className="text-2xl" />
            </button>
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <FiMenu className="text-xl" />
            </button>
            <h1 className="text-lg lg:text-xl font-bold text-gray-800 truncate">
              {activeTitle}
            </h1>
          </div>

          {/* CENTER - Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-2xl mx-auto px-1 sm:px-2 lg:px-4">
            <form onSubmit={handleSearch} className="relative">
              <FiSearch className="absolute left-2.5 lg:left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base lg:text-lg" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full
                  pl-8 lg:pl-10
                  pr-8 lg:pr-12
                  py-1.5 lg:py-2.5
                  text-xs lg:text-sm
                  bg-gray-100
                  border-2
                  border-transparent
                  rounded-lg lg:rounded-xl
                  focus:bg-white
                  focus:border-orange-500
                  focus:outline-none
                  transition-all
                  duration-300
                  placeholder-gray-400
                  hover:bg-gray-200
                "
              />
              <kbd className="
                absolute
                right-2 lg:right-3
                top-1/2
                -translate-y-1/2
                hidden
                sm:flex
                items-center
                gap-0.5 lg:gap-1
                px-1.5 lg:px-2
                py-0.5 lg:py-1
                text-[8px] lg:text-xs
                font-mono
                text-gray-400
                bg-white
                border
                border-gray-200
                rounded
                pointer-events-none
              ">
                <span className="hidden lg:inline">⌘</span>
                <span className="hidden lg:inline">K</span>
              </kbd>
            </form>
          </div>

          {/* RIGHT - Notifications + Profile */}
          <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
            {/* NOTIFICATIONS */}
            <button className="relative p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <span className="text-lg lg:text-xl">🔔</span>
              <span className="absolute top-0.5 right-0.5 lg:top-1 lg:right-1 w-2 h-2 lg:w-2.5 lg:h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* PROFILE */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1 lg:gap-2 p-1 lg:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm lg:text-base">
                  {(user?.FirstName || 'A')[0].toUpperCase()}
                </div>
                <FiChevronDown className={`text-gray-400 transition-transform duration-300 text-sm lg:text-base ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* PROFILE DROPDOWN */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-xl border py-2 z-50 animate-slideDown">
                  <div className="px-3 lg:px-4 py-2 lg:py-3 border-b">
                    <p className="font-medium text-sm truncate">
                      {user ? `${user.FirstName} ${user.LastName}` : 'Admin User'}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user?.email || 'admin@muniture.com'}
                    </p>
                  </div>
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 text-sm"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FaUserCircle className="text-lg lg:text-xl" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="flex items-center gap-3 w-full px-3 lg:px-4 py-2 lg:py-3 hover:bg-orange-50 hover:text-red-500 transition-colors duration-200 border-t text-sm"
                  >
                    <FiLogOut className="text-lg lg:text-xl" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] animate-[fadeIn_.2s_ease]">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-[scaleIn_.2s_ease]">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Logout</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to log out of your account?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 hover:shadow-lg transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;








// import { useState } from "react";
// import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
// import { 
//   FiHome, 
//   FiPackage, 
//   FiUsers, 
//   FiMail, 
//   FiSettings, 
//   FiShoppingCart,
//   FiLogOut,
//   FiMenu,
//   FiX,
//   FiChevronDown,
//   FiSearch
// } from "react-icons/fi";
// import { FaUserCircle } from "react-icons/fa";

// function DashboardLayout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();

//   const menuItems = [
//     { path: "/dashboard", label: "Dashboard", icon: <FiHome className="text-xl" /> },
//     { path: "/dashboard/products", label: "Products", icon: <FiPackage className="text-xl" /> },
//     { path: "/dashboard/users", label: "Users", icon: <FiUsers className="text-xl" /> },
//     { path: "/dashboard/orders", label: "Orders", icon: <FiShoppingCart className="text-xl" /> },
//     { path: "/dashboard/contacts", label: "Contacts", icon: <FiMail className="text-xl" /> },
//     { path: "/dashboard/settings", label: "Settings", icon: <FiSettings className="text-xl" /> },
//   ];

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const toggleSidebar = () => {
//     if (window.innerWidth < 1024) {
//       setIsMobileSidebarOpen(!isMobileSidebarOpen);
//     } else {
//       setIsSidebarOpen(!isSidebarOpen);
//     }
//   };

//   const closeMobileSidebar = () => {
//     setIsMobileSidebarOpen(false);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("Recherche:", searchQuery);
//   };

//   // Fonction pour vérifier si un item est actif
//   const isItemActive = (itemPath) => {
//     if (itemPath === "/dashboard") {
//       return location.pathname === "/dashboard";
//     }
//     return location.pathname === itemPath || location.pathname.startsWith(itemPath + '/');
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       {/* OVERLAY MOBILE */}
//       {isMobileSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={closeMobileSidebar}
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`
//           fixed lg:static inset-y-0 left-0 z-50
//           bg-white shadow-lg
//           transition-all duration-300 ease-in-out
//           ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//           ${isSidebarOpen ? 'w-64' : 'w-20'}
//           flex flex-col
//         `}
//       >
//         {/* LOGO */}
//         <div className="flex items-center justify-between h-20 px-4">
//           <Link 
//             to="/dashboard" 
//             className={`flex items-center gap-2 font-Maven font-bold text-2xl transition-opacity duration-300 ${!isSidebarOpen && 'lg:opacity-0 lg:pointer-events-none'}`}
//           >
//             <span>Muniture</span>
//           </Link>
//           <button
//             onClick={toggleSidebar}
//             className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//           >
//             {isSidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
//           </button>
//           <button
//             onClick={closeMobileSidebar}
//             className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//           >
//             <FiX className="text-2xl" />
//           </button>
//         </div>

//         {/* MENU ITEMS */}
//         <nav className="flex-1 overflow-y-auto py-4 px-3">
//           {menuItems.map((item) => {
//             const isActive = isItemActive(item.path);
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={closeMobileSidebar}
//                 className={`
//                   flex items-center gap-3 px-4 py-3 rounded-xl mb-1
//                   transition-all duration-200 group
//                   ${isActive 
//                     ? 'bg-orange-100 text-orange-500 shadow-lg shadow-orange-500/30' 
//                     : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'
//                   }
//                 `}
//               >
//                 <span className="flex-shrink-0">{item.icon}</span>
//                 <span className={`font-medium transition-opacity duration-300 ${!isSidebarOpen && 'lg:opacity-0 lg:w-0 lg:overflow-hidden'}`}>
//                   {item.label}
//                 </span>
//                 {isActive && (
//                   <span className="ml-auto w-1.5 h-8 bg-blue-500 rounded-full lg:block hidden" />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* FOOTER SIDEBAR */}
//         <div className="border-t p-4">
//           <div className={`flex items-center gap-3 ${!isSidebarOpen && 'lg:justify-center'}`}>
//             <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
//               <span className="text-orange-500 font-bold text-lg">A</span>
//             </div>
//             <div className={`flex-1 min-w-0 ${!isSidebarOpen && 'lg:hidden'}`}>
//               <p className="font-medium text-sm truncate">Admin User</p>
//               <p className="text-xs text-gray-400 truncate">admin@muniture.com</p>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 flex flex-col min-w-0">
//         {/* TOP NAVBAR */}
//         <header className="h-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 lg:px-8 flex-shrink-0 gap-4">
//           {/* LEFT - Hamburger + Title */}
//           <div className="flex items-center ml-8 gap-2 flex-shrink-0">
//             <button
//               onClick={toggleSidebar}
//               className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//             >
//               <FiMenu className="text-2xl" />
//             </button>
//             <h1 className="text-xl font-bold text-gray-800 hidden sm:block ml-2">
//               {menuItems.find(item => 
//                 location.pathname === item.path || location.pathname.startsWith(item.path + '/')
//               )?.label || 'Dashboard'}
//             </h1>
//           </div>

//           {/* CENTER - Search Bar */}
//           <div className="flex-1 max-w-2xl mx-auto px-2 sm:px-4">
//             <form onSubmit={handleSearch} className="relative">
//               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
//               <input
//                 type="text"
//                 placeholder="Search products, orders, users..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="
//                   w-full
//                   pl-10
//                   pr-4
//                   py-2.5
//                   bg-gray-100
//                   border-2
//                   border-transparent
//                   rounded-xl
//                   focus:bg-white
//                   focus:border-orange-500
//                   focus:outline-none
//                   transition-all
//                   duration-300
//                   text-sm
//                   placeholder-gray-400
//                   hover:bg-gray-200
//                 "
//               />
//               <kbd className="
//                 absolute
//                 right-3
//                 top-1/2
//                 -translate-y-1/2
//                 hidden
//                 sm:inline-flex
//                 items-center
//                 gap-1
//                 px-2
//                 py-1
//                 text-xs
//                 font-mono
//                 text-gray-400
//                 bg-white
//                 border
//                 border-gray-200
//                 rounded-md
//                 pointer-events-none
//               ">
//                 <span>⌘</span>
//                 <span>K</span>
//               </kbd>
//             </form>
//           </div>

//           {/* RIGHT - Notifications + Profile */}
//           <div className="flex items-center gap-2 flex-shrink-0">
//             {/* NOTIFICATIONS */}
//             <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//               <span className="text-xl">🔔</span>
//               <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
//             </button>

//             {/* PROFILE */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//               >
//                 <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
//                   A
//                 </div>
//                 <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {/* PROFILE DROPDOWN */}
//               {isProfileOpen && (
//                 <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border py-2 z-50 animate-slideDown">
//                   <div className="px-4 py-3 border-b">
//                     <p className="font-medium text-sm">Admin User</p>
//                     <p className="text-xs text-gray-400">admin@muniture.com</p>
//                   </div>
//                   <Link
//                     to="/dashboard/profile"
//                     className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200"
//                     onClick={() => setIsProfileOpen(false)}
//                   >
//                     <FaUserCircle className="text-xl" />
//                     <span className="text-sm font-medium">Profile</span>
//                   </Link>
//                   <button
//                     onClick={() => {
//                       setIsProfileOpen(false);
//                       handleLogout();
//                     }}
//                     className="flex items-center gap-3 w-full px-4 py-3 hover:bg-orange-50 hover:text-red-500 transition-colors duration-200 border-t"
//                   >
//                     <FiLogOut className="text-xl" />
//                     <span className="text-sm font-medium">Logout</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         {/* PAGE CONTENT */}
//         <main className="flex-1 overflow-y-auto p-4 lg:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;