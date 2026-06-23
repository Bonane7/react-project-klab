import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { 
  FiHome, 
  FiPackage, 
  FiShoppingBag, 
  FiHeart, 
  FiUser, 
  FiLogOut,
  FiMenu,
  FiX,
  FiSearch,
  FiChevronDown
} from "react-icons/fi";
import axios from "axios";
import CartPopup from "../../components/CartPopup";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api_v1`;

function UserLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);
  const navigate = useNavigate();

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

  // ✅ Récupérer le nombre d'articles dans le panier
  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCartCount(0);
        return;
      }

      setCartLoading(true);
      const res = await axios.get(`${BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const items = res.data.data.items || [];
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartCount(0);
    } finally {
      setCartLoading(false);
    }
  };

  // ✅ Charger le compteur au montage et quand le panier s'ouvre/ferme
  useEffect(() => {
    fetchCartCount();
  }, []);

  // ✅ Rafraîchir le compteur quand le panier se ferme
  const handleCartClose = () => {
    setIsCartOpen(false);
    fetchCartCount(); // Recharger le compteur après fermeture
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiMenu className="text-2xl" />
              </button>
              <Link to="/user/dashboard" className="font-Maven font-bold text-2xl">
                <span className="text-black">Miniture </span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              <Link to="/user/dashboard" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Home</Link>
              <Link to="/user/shop" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Shop</Link>
              <Link to="/user/categories" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Categories</Link>
              <Link to="/user/orders" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Orders</Link>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <div className="hidden sm:block relative">
                <form onSubmit={handleSearch}>
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-40 lg:w-56 pl-9 pr-4 py-2 text-sm bg-gray-100 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </form>
              </div>

              {/* ❤️ Wishlist */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FiHeart className="text-xl" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">3</span>
              </button>

              {/* 🛒 Cart - AVEC COMPTEUR DYNAMIQUE */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiShoppingBag className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    {(user?.FirstName || 'U')[0].toUpperCase()}
                  </div>
                  <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border py-2 z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="font-medium text-sm">{user ? `${user.FirstName} ${user.LastName}` : 'User'}</p>
                      <p className="text-xs text-gray-400">{user?.email || 'user@email.com'}</p>
                    </div>
                    <Link to="/user/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors text-sm" onClick={() => setIsProfileOpen(false)}>
                      <FiUser className="text-lg" />
                      <span>Profile</span>
                    </Link>
                    <Link to="/user/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors text-sm" onClick={() => setIsProfileOpen(false)}>
                      <FiPackage className="text-lg" />
                      <span>My Orders</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-orange-50 hover:text-red-500 transition-colors border-t text-sm cursor-pointer">
                      <FiLogOut className="text-lg" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-4 py-3 space-y-2">
              <Link to="/user/dashboard" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/user/shop" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
              <Link to="/user/categories" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
              <Link to="/user/orders" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Orders</Link>
              <Link to="/user/profile" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 text-red-500 font-medium cursor-pointer">Logout</button>
            </div>
          </div>
        )}
      </nav>

      {/* CONTENT */}
      <main className="pt-16 lg:pt-20">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-Maven font-bold text-xl mb-4"><span className="text-orange-500">M</span>uniture</h3>
              <p className="text-gray-400 text-sm">Quality furniture for your home.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/user/shop" className="hover:text-white transition-colors">Shop</Link></li>
                <li><Link to="/user/categories" className="hover:text-white transition-colors">Categories</Link></li>
                <li><Link to="/user/orders" className="hover:text-white transition-colors">Orders</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/user/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/user/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/user/returns" className="hover:text-white transition-colors">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-3">Get the latest updates and offers</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 text-sm rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none" />
                <button className="px-4 py-2 bg-orange-500 rounded-r-lg hover:bg-orange-600 transition-colors text-sm font-medium">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Muniture. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ✅ CART POPUP */}
      <CartPopup
        isOpen={isCartOpen}
        onClose={handleCartClose}
      />
    </div>
  );
}

export default UserLayout;








// import { useState, useEffect } from "react";
// import { Outlet, Link, useNavigate } from "react-router-dom";
// import { 
//   FiHome, 
//   FiPackage, 
//   FiShoppingBag, 
//   FiHeart, 
//   FiUser, 
//   FiLogOut,
//   FiMenu,
//   FiX,
//   FiSearch,
//   FiChevronDown
// } from "react-icons/fi";

// function UserLayout() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     try {
//       const userJson = localStorage.getItem("user");
//       if (userJson) {
//         setUser(JSON.parse(userJson));
//       }
//     } catch (e) {
//       console.error("Error parsing user from localStorage:", e);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("Search:", searchQuery);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 lg:h-20">
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <FiMenu className="text-2xl" />
//               </button>
//               <Link to="/user/dashboard" className="font-Maven font-bold text-2xl">
//                 <span className="text-orange-500">M</span>uniture
//               </Link>
//             </div>

//             <div className="hidden lg:flex items-center gap-8">
//               <Link to="/user/dashboard" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Home</Link>
//               <Link to="/user/shop" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Shop</Link>
//               <Link to="/user/categories" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Categories</Link>
//               <Link to="/user/orders" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">Orders</Link>
//             </div>

//             <div className="flex items-center gap-2 lg:gap-4">
//               <div className="hidden sm:block relative">
//                 <form onSubmit={handleSearch}>
//                   <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-40 lg:w-56 pl-9 pr-4 py-2 text-sm bg-gray-100 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
//                   />
//                 </form>
//               </div>

//               <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <FiHeart className="text-xl" />
//                 <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">3</span>
//               </button>

//               <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <FiShoppingBag className="text-xl" />
//                 <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">2</span>
//               </button>

//               <div className="relative">
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
//                     {(user?.FirstName || 'U')[0].toUpperCase()}
//                   </div>
//                   <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
//                 </button>

//                 {isProfileOpen && (
//                   <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border py-2 z-50">
//                     <div className="px-4 py-3 border-b">
//                       <p className="font-medium text-sm">{user ? `${user.FirstName} ${user.LastName}` : 'User'}</p>
//                       <p className="text-xs text-gray-400">{user?.email || 'user@email.com'}</p>
//                     </div>
//                     <Link to="/user/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors text-sm" onClick={() => setIsProfileOpen(false)}>
//                       <FiUser className="text-lg" />
//                       <span>Profile</span>
//                     </Link>
//                     <Link to="/user/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors text-sm" onClick={() => setIsProfileOpen(false)}>
//                       <FiPackage className="text-lg" />
//                       <span>My Orders</span>
//                     </Link>
//                     <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-orange-50 hover:text-red-500 transition-colors border-t text-sm cursor-pointer">
//                       <FiLogOut className="text-lg" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {isMobileMenuOpen && (
//           <div className="lg:hidden border-t bg-white">
//             <div className="px-4 py-3 space-y-2">
//               <Link to="/user/dashboard" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
//               <Link to="/user/shop" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
//               <Link to="/user/categories" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
//               <Link to="/user/orders" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Orders</Link>
//               <Link to="/user/profile" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
//               <button onClick={handleLogout} className="block w-full text-left py-2 text-red-500 font-medium cursor-pointer">Logout</button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* CONTENT */}
//       <main className="pt-16 lg:pt-20">
//         <Outlet />
//       </main>

//       {/* FOOTER */}
//       <footer className="bg-gray-800 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="font-Maven font-bold text-xl mb-4"><span className="text-orange-500">M</span>uniture</h3>
//               <p className="text-gray-400 text-sm">Quality furniture for your home.</p>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-3">Quick Links</h4>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li><Link to="/user/shop" className="hover:text-white transition-colors">Shop</Link></li>
//                 <li><Link to="/user/categories" className="hover:text-white transition-colors">Categories</Link></li>
//                 <li><Link to="/user/orders" className="hover:text-white transition-colors">Orders</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-3">Support</h4>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li><Link to="/user/faq" className="hover:text-white transition-colors">FAQ</Link></li>
//                 <li><Link to="/user/contact" className="hover:text-white transition-colors">Contact</Link></li>
//                 <li><Link to="/user/returns" className="hover:text-white transition-colors">Returns</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-3">Newsletter</h4>
//               <p className="text-sm text-gray-400 mb-3">Get the latest updates and offers</p>
//               <div className="flex">
//                 <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 text-sm rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none" />
//                 <button className="px-4 py-2 bg-orange-500 rounded-r-lg hover:bg-orange-600 transition-colors text-sm font-medium">Subscribe</button>
//               </div>
//             </div>
//           </div>
//           <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
//             &copy; {new Date().getFullYear()} Muniture. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default UserLayout;