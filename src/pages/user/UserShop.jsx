import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiHeart, FiGrid, FiList, FiStar } from "react-icons/fi";

function UserShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api_v1/product/getProducts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log("API Response:", res.data);
        
        // ✅ Extraction robuste des données
        let data = [];
        if (res.data) {
          if (Array.isArray(res.data)) {
            data = res.data;
          } else if (res.data.products && Array.isArray(res.data.products)) {
            data = res.data.products;
          } else if (res.data.data && Array.isArray(res.data.data)) {
            data = res.data.data;
          } else if (res.data.result && Array.isArray(res.data.result)) {
            data = res.data.result;
          } else if (res.data.items && Array.isArray(res.data.items)) {
            data = res.data.items;
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
        
        // ✅ Vérification finale
        if (!Array.isArray(data)) {
          console.warn("Data is not an array, converting to empty array");
          data = [];
        }
        
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError(err.message || "Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filtrage avec sécurité absolue
  const getFilteredProducts = () => {
    // Vérification que products est bien un tableau
    if (!Array.isArray(products)) {
      console.warn("Products is not an array:", typeof products, products);
      return [];
    }
    
    if (products.length === 0 || !searchTerm.trim()) {
      return products;
    }
    
    const search = searchTerm.toLowerCase().trim();
    return products.filter(p => {
      if (!p || typeof p !== 'object') return false;
      const name = (p.productName || p.name || '').toLowerCase();
      const category = (p.productCategory || p.category || '').toLowerCase();
      return name.includes(search) || category.includes(search);
    });
  };

  const filteredProducts = getFilteredProducts();

  // Affichage des erreurs
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="text-center py-20">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-600">Error loading products</h3>
          <p className="text-gray-400 mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ✅ Vérification avant le rendu
  if (!Array.isArray(products)) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🔄</div>
          <h3 className="text-xl font-semibold text-gray-600">Data format error</h3>
          <p className="text-gray-400 mt-1">The API returned an unexpected data format.</p>
          <p className="text-xs text-gray-400 mt-2">Type: {typeof products}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Shop All</h1>
          <p className="text-gray-500">{products.length} products available</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-56"
            />
          </div>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
              <div className="aspect-square bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
          <p className="text-gray-400 mt-1">
            {searchTerm ? `No results for "${searchTerm}"` : "No products available"}
          </p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 text-orange-500 font-medium hover:text-orange-600 transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" 
          : "space-y-4"
        }>
          {filteredProducts.map((product, index) => {
            const productId = product?._id || product?.id || `product-${index}`;
            const productName = product?.productName || product?.name || 'Product';
            const productPrice = product?.productPrice || product?.price || 0;
            const productCategory = product?.productCategory || product?.category || 'Uncategorized';
            const imageUrl = product?.imageUrl || product?.image || null;
            
            return (
              <Link 
                key={productId} 
                to={`/user/product/${productId}`}
                className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${viewMode === "list" ? "flex gap-4 p-4" : ""}`}
              >
                <div className={`${viewMode === "list" ? "w-48 flex-shrink-0" : "relative overflow-hidden aspect-square bg-gray-100"}`}>
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={productName} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-300 text-4xl">🛋️</div>';
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">🛋️</div>
                  )}
                  <button 
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Add to wishlist:", productId);
                    }}
                  >
                    <FiHeart className="text-sm" />
                  </button>
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-medium">{productName}</h3>
                  <p className="text-sm text-gray-500">{productCategory}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <FiStar className="text-yellow-400 text-sm fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                    <span className="text-sm text-gray-400">(124)</span>
                  </div>
                  <p className="text-orange-500 font-bold mt-1 text-lg">
                    ${Number(productPrice).toFixed(2)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserShop;