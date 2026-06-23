import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
  FiChevronDown,
  FiStar,
  FiClock,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiArrowRight
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api_v1`;

function UserLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Produits recommandés
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);

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

  // ✅ Récupérer les produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/product/getProducts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        let data = [];
        if (res.data) {
          if (Array.isArray(res.data)) {
            data = res.data;
          } else if (res.data.products && Array.isArray(res.data.products)) {
            data = res.data.products;
          } else if (res.data.data && Array.isArray(res.data.data)) {
            data = res.data.data;
          }
        }
        setRecommendedProducts(data.slice(0, 8));
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Récupérer le compteur du panier
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
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
      }
    };
    fetchCartCount();
  }, []);

  // ✅ Ajouter au panier
  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      setAddingToCart(productId);
      const res = await axios.post(
        `${BASE_URL}/cart/add`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Product added to cart! 🛒");
        // Mettre à jour le compteur
        const items = res.data.data.items || [];
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(null);
    }
  };

  const categories = [
    { name: "Living Room", icon: "🛋️", count: 45 },
    { name: "Bedroom", icon: "🛏️", count: 38 },
    { name: "Kitchen", icon: "🍳", count: 52 },
    { name: "Outdoor", icon: "🌿", count: 27 },
  ];

  const specialOffers = [
    { title: "Up to 30% Off", description: "On selected living room furniture", color: "bg-orange-500" },
    { title: "Free Shipping", description: "On orders over $200", color: "bg-blue-500" },
    { title: "New Arrivals", description: "Discover our latest collection", color: "bg-purple-500" },
  ];

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
      {/* ===== NAVBAR ===== */}
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
                <span className="text-black">Miniture</span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              <Link to="/user/dashboard" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                Home
              </Link>
              <Link to="/user/shop" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                Shop
              </Link>
              <Link to="/user/categories" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                Categories
              </Link>
              <Link to="/user/orders" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                Orders
              </Link>
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

              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FiHeart className="text-xl" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">3</span>
              </button>

              <button 
                onClick={() => navigate("/cart")}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiShoppingBag className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

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
                      <p className="font-medium text-sm">
                        {user ? `${user.FirstName} ${user.LastName}` : 'User'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {user?.email || 'user@email.com'}
                      </p>
                    </div>
                    <Link to="/user/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors text-sm" onClick={() => setIsProfileOpen(false)}>
                      <FiUser className="text-lg" />
                      <span>Profile</span>
                    </Link>
                    <Link to="/user/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors text-sm" onClick={() => setIsProfileOpen(false)}>
                      <FiPackage className="text-lg" />
                      <span>My Orders</span>
                    </Link>
                    <button onClick={() => { setIsProfileOpen(false); setShowLogoutConfirm(true); }} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-orange-50 hover:text-red-500 transition-colors border-t text-sm cursor-pointer">
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
              <button onClick={() => { setIsMobileMenuOpen(false); setShowLogoutConfirm(true); }} className="block w-full text-left py-2 text-red-500 font-medium cursor-pointer">Logout</button>
            </div>
          </div>
        )}
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-orange-100 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-4 py-1 bg-orange-200 text-orange-700 text-sm font-medium rounded-full mb-4">
                  Welcome back, {user ? user.FirstName : 'User'}! 👋
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                  Discover Your Perfect
                  <span className="text-orange-500"> Furniture</span>
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                  Find the best furniture for your home. Quality pieces that will last for years.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link to="/user/shop" className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
                    Shop Now
                    <FiArrowRight className="inline ml-2" />
                  </Link>
                  <button className="px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors">
                    Browse Categories
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="https://via.placeholder.com/500x400" 
                  alt="Hero" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <FiTruck className="text-orange-500 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-400">On orders over $200</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FiShield className="text-blue-500 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-400">100% secure</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FiClock className="text-green-500 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Fast Support</p>
                  <p className="text-xs text-gray-400">24/7 customer service</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <FiHeadphones className="text-purple-500 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-400">30 days return policy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Offers */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Special Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {specialOffers.map((offer, index) => (
              <div key={index} className={`${offer.color} rounded-xl p-6 text-white`}>
                <h3 className="text-xl font-bold">{offer.title}</h3>
                <p className="text-sm opacity-90 mt-1">{offer.description}</p>
                <button className="mt-3 text-sm font-medium underline underline-offset-2 hover:opacity-80 transition-opacity">
                  Shop Now →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white border-y">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
              <Link to="/user/categories" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((cat, index) => (
                <Link key={index} to={`/user/categories/${cat.name.toLowerCase().replace(' ', '-')}`} className="group bg-gray-50 rounded-xl p-4 text-center hover:bg-orange-50 transition-all hover:shadow-md">
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <h3 className="font-medium text-gray-800 group-hover:text-orange-500 transition-colors">{cat.name}</h3>
                  <p className="text-xs text-gray-400">{cat.count} products</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ Recommended Products avec bouton "Ajouter au panier" */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Recommended for You</h2>
              <p className="text-sm text-gray-400 mt-1">Based on your browsing history</p>
            </div>
            <Link to="/user/shop" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {productsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : recommendedProducts.length === 0 ? (
              <div className="col-span-4 py-10 text-center text-gray-400">
                <p>No products available yet.</p>
              </div>
            ) : (
              recommendedProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative"
                >
                  <Link to={`/user/product/${product._id}`} className="block">
                    <div className="relative overflow-hidden aspect-square bg-gray-100">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.productName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                          🛋️
                        </div>
                      )}
                      <button 
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("Add to wishlist:", product._id);
                        }}
                      >
                        <FiHeart className="text-sm" />
                      </button>
                    </div>
                    <div className="p-3 lg:p-4">
                      <h3 className="font-medium text-sm truncate">{product.productName}</h3>
                      <p className="text-xs text-orange-400 mt-0.5">{product.productCategory}</p>
                      <p className="text-orange-500 font-bold mt-1">${Number(product.productPrice).toFixed(2)}</p>
                    </div>
                  </Link>

                  {/* ✅ Bouton "Ajouter au panier" */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product._id);
                    }}
                    disabled={addingToCart === product._id}
                    className="absolute bottom-16 right-3 bg-orange-500 text-white p-2.5 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-orange-600 hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {addingToCart === product._id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiShoppingBag className="text-sm" />
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-Maven font-bold text-xl mb-4">
                <span className="text-black">muniture</span>
              </h3>
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

export default UserLanding;








// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
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
//   FiChevronDown,
//   FiStar,
//   FiClock,
//   FiTruck,
//   FiShield,
//   FiHeadphones,
//   FiArrowRight
// } from "react-icons/fi";
// import { FaUserCircle } from "react-icons/fa";


// function UserLanding() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

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

//   // Produits recommandés (dynamiques depuis l'API)
//   const [recommendedProducts, setRecommendedProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api_v1/product/getProducts", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = res.data.products || res.data || [];
//         setRecommendedProducts(data.slice(0, 8)); // Show up to 8 products
//       } catch (err) {
//         console.error("Failed to load products:", err);
//       } finally {
//         setProductsLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Catégories populaires
//   const categories = [
//     { name: "Living Room", icon: "🛋️", count: 45 },
//     { name: "Bedroom", icon: "🛏️", count: 38 },
//     { name: "Kitchen", icon: "🍳", count: 52 },
//     { name: "Outdoor", icon: "🌿", count: 27 },
//   ];

//   // Offres spéciales
//   const specialOffers = [
//     { title: "Up to 30% Off", description: "On selected living room furniture", color: "bg-orange-500" },
//     { title: "Free Shipping", description: "On orders over $200", color: "bg-blue-500" },
//     { title: "New Arrivals", description: "Discover our latest collection", color: "bg-purple-500" },
//   ];

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
//       {/* ===== NAVBAR ===== */}
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 lg:h-20">
//             {/* Logo */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <FiMenu className="text-2xl" />
//               </button>
//               <Link to="/user/dashboard" className="font-Maven font-bold text-2xl">
//                 <span className="text-black">Muniture</span>
//               </Link>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden lg:flex items-center gap-8">
//               <Link to="/user/dashboard" className="text-gray-700 hover:text-blue-500 font-medium transition-colors">
//                 Home
//               </Link>
//               <Link to="/user/shop" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
//                 Shop
//               </Link>
//               <Link to="/user/categories" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
//                 Categories
//               </Link>
//               <Link to="/user/orders" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
//                 Orders
//               </Link>
//             </div>

//             {/* Right Section */}
//             <div className="flex items-center gap-2 lg:gap-4">
//               {/* Search */}
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

//               {/* Wishlist */}
//               <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <FiHeart className="text-xl" />
//                 <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
//                   3
//                 </span>
//               </button>

//               {/* Cart */}
//               <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <FiShoppingBag className="text-xl" />
//                 <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
//                   2
//                 </span>
//               </button>

//               {/* Profile */}
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
//                       <p className="font-medium text-sm">
//                         {user ? `${user.FirstName} ${user.LastName}` : 'User'}
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         {user?.email || 'user@email.com'}
//                       </p>
//                     </div>
//                     <Link to="/user/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors text-sm" onClick={() => setIsProfileOpen(false)}>
//                       <FiUser className="text-lg" />
//                       <span>Profile</span>
//                     </Link>
//                     <Link to="/user/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-500 transition-colors text-sm" onClick={() => setIsProfileOpen(false)}>
//                       <FiPackage className="text-lg" />
//                       <span>My Orders</span>
//                     </Link>
//                     <button onClick={() => { setIsProfileOpen(false); setShowLogoutConfirm(true); }} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-orange-50 hover:text-red-500 transition-colors border-t text-sm cursor-pointer">
//                       <FiLogOut className="text-lg" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="lg:hidden border-t bg-white">
//             <div className="px-4 py-3 space-y-2">
//               <Link to="/user/dashboard" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
//               <Link to="/user/shop" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
//               <Link to="/user/categories" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
//               <Link to="/user/orders" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Orders</Link>
//               <Link to="/user/profile" className="block py-2 text-gray-700 hover:text-orange-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
//               <button onClick={() => { setIsMobileMenuOpen(false); setShowLogoutConfirm(true); }} className="block w-full text-left py-2 text-red-500 font-medium cursor-pointer">Logout</button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* ===== MAIN CONTENT ===== */}
//       <main className="pt-16 lg:pt-20">
//         {/* Hero Section */}
//         <section className="relative bg-gradient-to-r from-orange-100 to-orange-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//               <div>
//                 <span className="inline-block px-4 py-1 bg-orange-200 text-orange-700 text-sm font-medium rounded-full mb-4">
//                   Welcome back, {user ? user.FirstName : 'User'}! 👋
//                 </span>
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
//                   Discover Your Perfect
//                   <span className="text-orange-500"> Furniture</span>
//                 </h1>
//                 <p className="mt-4 text-gray-600 text-lg">
//                   Find the best furniture for your home. Quality pieces that will last for years.
//                 </p>
//                 <div className="mt-6 flex flex-wrap gap-4">
//                   <Link to="/user/shop" className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
//                     Shop Now
//                     <FiArrowRight className="inline ml-2" />
//                   </Link>
//                   <button className="px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors">
//                     Browse Categories
//                   </button>
//                 </div>
//               </div>
//               <div className="hidden lg:block">
//                 <img 
//                   src="https://via.placeholder.com/500x400" 
//                   alt="Hero" 
//                   className="rounded-2xl shadow-2xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="bg-white border-b">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
//                   <FiTruck className="text-orange-500 text-xl" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-sm">Free Delivery</p>
//                   <p className="text-xs text-gray-400">On orders over $200</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//                   <FiShield className="text-blue-500 text-xl" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-sm">Secure Payment</p>
//                   <p className="text-xs text-gray-400">100% secure</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
//                   <FiClock className="text-green-500 text-xl" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-sm">Fast Support</p>
//                   <p className="text-xs text-gray-400">24/7 customer service</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
//                   <FiHeadphones className="text-purple-500 text-xl" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-sm">Easy Returns</p>
//                   <p className="text-xs text-gray-400">30 days return policy</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Special Offers */}
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Special Offers</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             {specialOffers.map((offer, index) => (
//               <div key={index} className={`${offer.color} rounded-xl p-6 text-white`}>
//                 <h3 className="text-xl font-bold">{offer.title}</h3>
//                 <p className="text-sm opacity-90 mt-1">{offer.description}</p>
//                 <button className="mt-3 text-sm font-medium underline underline-offset-2 hover:opacity-80 transition-opacity">
//                   Shop Now →
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Categories */}
//         <section className="bg-white border-y">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
//               <Link to="/user/categories" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
//                 View All →
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {categories.map((cat, index) => (
//                 <Link key={index} to={`/user/categories/${cat.name.toLowerCase().replace(' ', '-')}`} className="group bg-gray-50 rounded-xl p-4 text-center hover:bg-orange-50 transition-all hover:shadow-md">
//                   <div className="text-3xl mb-2">{cat.icon}</div>
//                   <h3 className="font-medium text-gray-800 group-hover:text-orange-500 transition-colors">{cat.name}</h3>
//                   <p className="text-xs text-gray-400">{cat.count} products</p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Recommended Products */}
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">Recommended for You</h2>
//               <p className="text-sm text-gray-400 mt-1">Based on your browsing history</p>
//             </div>
//             <Link to="/user/shop" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
//               View All →
//             </Link>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
//             {productsLoading ? (
//               Array.from({ length: 4 }).map((_, i) => (
//                 <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
//                   <div className="aspect-square bg-gray-200" />
//                   <div className="p-4 space-y-2">
//                     <div className="h-3 bg-gray-200 rounded w-3/4" />
//                     <div className="h-3 bg-gray-200 rounded w-1/2" />
//                   </div>
//                 </div>
//               ))
//             ) : recommendedProducts.length === 0 ? (
//               <div className="col-span-4 py-10 text-center text-gray-400">
//                 <p>No products available yet.</p>
//               </div>
//             ) : (
//               recommendedProducts.map((product) => (
//                 <Link
//                   key={product._id}
//                   to={`/user/product/${product._id}`}
//                   className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
//                 >
//                   <div className="relative overflow-hidden aspect-square bg-gray-100">
//                     {product.imageUrl ? (
//                       <img
//                         src={product.imageUrl}
//                         alt={product.productName}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
//                         🛋️
//                       </div>
//                     )}
//                     <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors">
//                       <FiHeart className="text-sm" />
//                     </button>
//                   </div>
//                   <div className="p-3 lg:p-4">
//                     <h3 className="font-medium text-sm truncate">{product.productName}</h3>
//                     <p className="text-xs text-orange-400 mt-0.5">{product.productCategory}</p>
//                     <p className="text-orange-500 font-bold mt-1">${Number(product.productPrice).toFixed(2)}</p>
//                   </div>
//                 </Link>
//               ))
//             )}
//           </div>
//         </section>
//       </main>

//       {/* ===== FOOTER ===== */}
//       <footer className="bg-gray-800 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="font-Maven font-bold text-xl mb-4">
//                 <span className="text-orange-500">M</span>uniture
//               </h3>
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

//       {/* LOGOUT CONFIRMATION MODAL */}
//       {showLogoutConfirm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] animate-[fadeIn_.2s_ease]">
//           <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-[scaleIn_.2s_ease]">
//             <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Logout</h3>
//             <p className="text-sm text-gray-500 mb-6">Are you sure you want to log out of your account?</p>
//             <div className="flex justify-end gap-3">
//               <button 
//                 onClick={() => setShowLogoutConfirm(false)}
//                 className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 hover:shadow-lg transition-colors cursor-pointer"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserLanding;