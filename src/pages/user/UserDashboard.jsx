import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiArrowRight, FiStar, FiHeart, FiTruck, FiShield, FiClock, FiHeadphones, FiChevronLeft, FiChevronRight } from "react-icons/fi";

function UserDashboard() {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [heroProducts, setHeroProducts] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [heroLoading, setHeroLoading] = useState(true);

  // Récupérer l'utilisateur
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

  // Récupérer les produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api_v1/product/getProducts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log("Dashboard API Response:", res.data);
        
        let data = [];
        if (res.data) {
          if (Array.isArray(res.data)) {
            data = res.data;
          } else if (res.data.products && Array.isArray(res.data.products)) {
            data = res.data.products;
          } else if (res.data.data && Array.isArray(res.data.data)) {
            data = res.data.data;
          } else if (typeof res.data === 'object') {
            const values = Object.values(res.data);
            const arrayValue = values.find(v => Array.isArray(v));
            if (arrayValue) {
              data = arrayValue;
            } else {
              data = [res.data];
            }
          }
        }
        
        setRecommendedProducts(data.slice(0, 8));
        
        // Récupérer les produits pour le Hero (les 5 premiers avec images)
        const productsWithImages = data.filter(p => p.imageUrl || p.image).slice(0, 5);
        setHeroProducts(productsWithImages.length > 0 ? productsWithImages : data.slice(0, 5));
        setHeroLoading(false);
      } catch (err) {
        console.error("Failed to load products:", err);
        setRecommendedProducts([]);
        setHeroProducts([]);
        setHeroLoading(false);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Auto-slide pour le Hero
  useEffect(() => {
    if (heroProducts.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => 
        prev === heroProducts.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroProducts.length]);

  // Navigation du slider
  const goToPrevious = () => {
    setCurrentHeroIndex((prev) => 
      prev === 0 ? heroProducts.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentHeroIndex((prev) => 
      prev === heroProducts.length - 1 ? 0 : prev + 1
    );
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

  // Récupérer l'image du produit courant
  const getCurrentHeroImage = () => {
    if (!heroProducts.length || !heroProducts[currentHeroIndex]) {
      return null;
    }
    const product = heroProducts[currentHeroIndex];
    return product.imageUrl || product.image || null;
  };

  const currentProduct = heroProducts[currentHeroIndex] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ✅ HERO SECTION AVEC ZOOM ARRIÈRE-PLAN */}
      <section className="relative rounded-2xl my-4 lg:my-6 overflow-hidden h-[350px] sm:h-[400px] lg:h-[500px]">
        {heroLoading ? (
          <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-2xl" />
        ) : heroProducts.length > 0 ? (
          <>
            {/* ✅ Image en arrière-plan avec zoom */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-[8000ms] ease-in-out scale-110 hover:scale-100"
              style={{ 
                backgroundImage: getCurrentHeroImage() 
                  ? `url(${getCurrentHeroImage()})` 
                  : 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fdfcfb 100%)'
              }}
            />
            
            {/* Overlay pour lisibilité */}
            <div className="absolute inset-0 bg-black/50 rounded-2xl" />

            {/* ✅ Contenu centré */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
              <span className="inline-block px-4 py-1 bg-orange-500/90 text-white text-sm font-medium rounded-full mb-3 backdrop-blur-sm">
                Welcome back, {user ? user.FirstName : 'User'}! 👋
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight max-w-3xl">
                Discover Your Perfect
                <span className="text-orange-400"> Furniture</span>
              </h1>
              <p className="mt-3 text-white/90 text-sm sm:text-base lg:text-lg max-w-xl">
                {currentProduct?.productName 
                  ? `Explore our ${currentProduct.productName} and more quality pieces for your home.`
                  : 'Find the best furniture for your home. Quality pieces that will last for years.'
                }
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
                <Link to="/user/shop" className="px-5 sm:px-7 py-2.5 sm:py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 text-sm sm:text-base">
                  Shop Now <FiArrowRight className="inline ml-1 sm:ml-2" />
                </Link>
                {currentProduct && (
                  <Link 
                    to={`/user/product/${currentProduct._id || currentProduct.id}`}
                    className="px-5 sm:px-7 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/30 transition-colors border border-white/30 text-sm sm:text-base"
                  >
                    View Product
                  </Link>
                )}
              </div>
            </div>

            {/* ✅ Boutons de navigation - positionnés sur les côtés */}
            {heroProducts.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors text-white z-10"
                >
                  <FiChevronLeft className="text-xl sm:text-2xl" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors text-white z-10"
                >
                  <FiChevronRight className="text-xl sm:text-2xl" />
                </button>
              </>
            )}

            {/* ✅ Indicateurs centrés en bas */}
            {heroProducts.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
                {heroProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentHeroIndex 
                        ? 'w-8 h-2.5 bg-white' 
                        : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          // Fallback si pas de produits
          <div className="w-full h-full bg-gradient-to-r from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center">
            <div className="text-center px-4">
              <span className="inline-block px-4 py-1 bg-orange-200 text-orange-700 text-sm font-medium rounded-full mb-4">
                Welcome back, {user ? user.FirstName : 'User'}! 👋
              </span>
              <h1 className="text-2xl sm:text-2xl lg:text-2xl font-bold text-gray-800 leading-tight">
                Discover Your Perfect
                <span className="text-orange-500"> Furniture</span>
              </h1>
              <p className="mt-3 text-gray-600 text-sm sm:text-base lg:text-lg">
                Find the best furniture for your home. Quality pieces that will last for years.
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
                <Link to="/user/shop" className="px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 text-sm sm:text-base">
                  Shop Now <FiArrowRight className="inline ml-1 sm:ml-2" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="py-6 lg:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <FiTruck className="text-orange-500" />
            </div>
            <div>
              <p className="font-semibold text-sm">Free Delivery</p>
              <p className="text-xs text-gray-400">Over $200</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <FiShield className="text-blue-500" />
            </div>
            <div>
              <p className="font-semibold text-sm">Secure Payment</p>
              <p className="text-xs text-gray-400">100% secure</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <FiClock className="text-green-500" />
            </div>
            <div>
              <p className="font-semibold text-sm">Fast Support</p>
              <p className="text-xs text-gray-400">24/7 service</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <FiHeadphones className="text-purple-500" />
            </div>
            <div>
              <p className="font-semibold text-sm">Easy Returns</p>
              <p className="text-xs text-gray-400">30 days policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Special Offers</h2>
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
      <section className="py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
          <Link to="/user/categories" className="text-orange-500 font-medium hover:text-orange-600">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat, index) => (
            <Link key={index} to={`/user/categories/${cat.name.toLowerCase().replace(' ', '-')}`} className="group bg-white rounded-xl p-4 text-center hover:shadow-md transition-all border border-gray-100">
              <div className="text-3xl mb-2">{cat.icon}</div>
              <h3 className="font-medium text-gray-800 group-hover:text-orange-500 transition-colors">{cat.name}</h3>
              <p className="text-xs text-gray-400">{cat.count} products</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended Products */}
      <section className="py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Recommended for You</h2>
            <p className="text-sm text-gray-400">Based on your browsing history</p>
          </div>
          <Link to="/user/shop" className="text-orange-500 font-medium hover:text-orange-600">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
          ) : !Array.isArray(recommendedProducts) || recommendedProducts.length === 0 ? (
            <div className="col-span-4 py-10 text-center text-gray-400">
              <p>No products available.</p>
            </div>
          ) : (
            recommendedProducts.map((product, index) => {
              const productId = product?._id || product?.id || index;
              const productName = product?.productName || product?.name || 'Product';
              const productCategory = product?.productCategory || product?.category || 'Uncategorized';
              const productPrice = product?.productPrice || product?.price || 0;
              const imageUrl = product?.imageUrl || product?.image || null;
              
              return (
                <Link 
                  key={productId} 
                  to={`/user/product/${productId}`} 
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative overflow-hidden aspect-square bg-gray-100">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={productName} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-300 text-4xl">🛋️</div>';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">🛋️</div>
                    )}
                    <button 
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("Add to wishlist:", productId);
                      }}
                    >
                      <FiHeart className="text-sm" />
                    </button>
                  </div>
                  <div className="p-3 lg:p-4">
                    <h3 className="font-medium text-sm truncate">{productName}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{productCategory}</p>
                    <p className="text-orange-500 font-bold mt-1">${Number(productPrice).toFixed(2)}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;