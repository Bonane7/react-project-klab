// pages/Cart.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiLoader,
  FiArrowLeft,
  FiShoppingBag,
} from "react-icons/fi";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api_v1`;

function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get(`${BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setCart(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/cart/update`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setUpdating(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setUpdating(false);
    }
  };

  const clearCart = async () => {
    if (!confirm("Are you sure you want to clear your cart?")) return;

    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/cart/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setUpdating(false);
    }
  };

  const totalItems = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const subtotal = cart.total || 0;
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="animate-spin text-4xl text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/user/shop"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FiArrowLeft className="text-xl" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
              {totalItems} items
            </span>
          </div>
          {cart.items?.length > 0 && (
            <button
              onClick={clearCart}
              disabled={updating}
              className="text-red-500 hover:text-red-600 transition-colors text-sm font-medium flex items-center gap-1"
            >
              <FiTrash2 />
              Clear Cart
            </button>
          )}
        </div>

        {cart.items?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any items yet.
            </p>
            <Link
              to="/user/shop"
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des produits */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-xl shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML =
                            '<div class="w-full h-full flex items-center justify-center text-gray-300 text-2xl">🛋️</div>';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
                        🛋️
                      </div>
                    )}
                  </div>

                  {/* Détails */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantité */}
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          disabled={updating || item.quantity <= 1}
                          className="px-3 py-2 hover:bg-gray-50 transition disabled:opacity-50"
                        >
                          <FiMinus className="text-sm" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          disabled={updating}
                          className="px-3 py-2 hover:bg-gray-50 transition disabled:opacity-50"
                        >
                          <FiPlus className="text-sm" />
                        </button>
                      </div>

                      <span className="font-semibold text-gray-800 min-w-[70px] text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        disabled={updating}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Résumé */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 border-b pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">FRW {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between py-4 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">FRW {total.toFixed(2)}</span>
                </div>

                {shipping === 0 && (
                  <p className="text-xs text-green-500 font-medium mb-4">
                    ✨ Free shipping applied!
                  </p>
                )}

                <button
                  onClick={() => navigate("/checkout")}
                  disabled={cart.items?.length === 0 || updating}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FiShoppingBag />
                  Proceed to Checkout
                </button>

                <Link
                  to="/user/shop"
                  className="block text-center text-sm text-gray-500 mt-3 hover:text-orange-500 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;