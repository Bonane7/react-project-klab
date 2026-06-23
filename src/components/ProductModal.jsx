import { useState } from "react";
import { FiX, FiHeart, FiMinus, FiPlus, FiShoppingBag, FiCreditCard, FiLoader } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api_v1`;

function ProductModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  if (!isOpen || !product) return null;

  const colors = [
    { name: "Black", value: "#1a1a1a" },
    { name: "White", value: "#ffffff" },
    { name: "Brown", value: "#8B6914" },
    { name: "Gray", value: "#808080" },
  ];

  const sizes = ["S", "M", "L", "XL"];

  const imageUrl = product?.imageUrl || product?.image || null;
  const productName = product?.productName || product?.name || product?.title || 'Product';
  const productPrice = product?.productPrice || product?.price || 0;
  const productId = product?._id || product?.id;
  
  const productDescription = product?.productDescription || product?.description || product?.desc || 
    "Experience the perfect blend of comfort and style with this premium furniture piece. Crafted with high-quality materials for lasting durability.";

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  // ✅ Ajouter au panier depuis le modal
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      setAddingToCart(true);
      const res = await axios.post(
        `${BASE_URL}/cart/add`,
        { 
          productId: productId, 
          quantity: quantity 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(`${quantity} × ${productName} added to cart! 🛒`);
        // Option: fermer le modal après ajout
        // onClose();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    // Rediriger vers le checkout avec le produit
    // ou ajouter au panier puis rediriger
    handleAddToCart();
    // setTimeout(() => {
    //   window.location.href = "/checkout";
    // }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-gray-100 rounded-full transition-colors shadow-md"
        >
          <FiX className="text-2xl" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* LEFT - Image */}
          <div className="bg-gray-50 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-6 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={productName}
                className="w-full h-full max-h-[400px] object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="text-6xl text-gray-300">🛋️</div>';
                }}
              />
            ) : (
              <div className="text-6xl text-gray-300">🛋️</div>
            )}
          </div>

          {/* RIGHT - Details */}
          <div className="p-6 md:p-8 flex flex-col">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {productName}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-sm fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500">(4.8 • 124 reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <span className="text-3xl font-bold text-orange-500">
                ${Number(productPrice).toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-gray-400 line-through">
                ${(Number(productPrice) * 1.2).toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-green-500 font-medium">-20%</span>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                {productDescription}
              </p>
            </div>

            {/* Colors */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Color</p>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color.name 
                        ? 'border-orange-500 ring-2 ring-orange-500/30 scale-110' 
                        : 'border-gray-200 hover:scale-105'
                    }`}
                    style={{ 
                      backgroundColor: color.value,
                      borderColor: color.value === '#ffffff' ? '#d1d5db' : color.value
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Size</p>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-orange-500 bg-orange-50 text-orange-500'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <FiMinus className="text-sm" />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors text-gray-600"
                  >
                    <FiPlus className="text-sm" />
                  </button>
                </div>
                <span className="text-sm text-gray-400">
                  {product?.stock || product?.quantity || 50} available
                </span>
              </div>
            </div>

            {/* ✅ Action Buttons avec ajout au panier */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  <FiShoppingBag className="text-lg" />
                )}
                {addingToCart ? "Adding..." : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={addingToCart}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <FiCreditCard className="text-lg" />
                Buy Now
              </button>
            </div>

            {/* Wishlist */}
            <button className="mt-4 flex items-center justify-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm">
              <FiHeart className="text-lg" />
              Add to Wishlist
            </button>

            {/* Category & SKU */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
              <span>Category: {product?.productCategory || product?.category || 'Furniture'}</span>
              <span>SKU: {product?.sku || product?._id?.slice(-6) || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;