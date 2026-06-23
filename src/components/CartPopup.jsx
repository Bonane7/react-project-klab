// components/CartPopup.jsx
import { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiLoader, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api_v1`;

function CartPopup({ isOpen, onClose }) {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // ✅ Récupérer le panier
  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setCart({ items: [], total: 0 });
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

  // ✅ Charger le panier à l'ouverture
  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  // ✅ Empêcher le scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ✅ Ajouter un produit au panier (via API)
  const addToCart = async (productId) => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post(
        `${BASE_URL}/cart/add`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchCart(); // Recharger le panier
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setUpdating(false);
    }
  };

  // ✅ Mettre à jour la quantité
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      if (!token) return;

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

  // ✅ Supprimer un produit du panier
  const removeFromCart = async (productId) => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      if (!token) return;

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

  // ✅ Calcul du total
  const totalItems = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const subtotal = cart.total || 0;

  // ✅ Limite pour la livraison gratuite
  const freeShippingThreshold = 700.01;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // ✅ Vérifier si l'utilisateur est connecté
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 bg-black transition-all duration-500 z-[100]
          ${isOpen ? 'opacity-50 visible' : 'opacity-0 invisible'}
        `}
        onClick={onClose}
      />

      {/* Popup */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[101]
          transform transition-transform duration-500 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-semibold">
            Shopping Cart{' '}
            <span className="text-gray-400 text-sm">
              {loading ? '...' : totalItems}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-2xl hover:text-orange-500 transition"
          >
            <IoCloseOutline />
          </button>
        </div>

        {/* Contenu */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-5">
            {loading ? (
              <div className="flex justify-center py-10">
                <FiLoader className="animate-spin text-2xl text-orange-500" />
              </div>
            ) : !isAuthenticated ? (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">Please log in to view your cart</p>
                <Link
                  to="/login"
                  onClick={onClose}
                  className="inline-block px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Login
                </Link>
              </div>
            ) : cart.items?.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-4">🛒</p>
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Message free shipping */}
                {remainingForFreeShipping > 0 && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                    Spend ${remainingForFreeShipping.toFixed(2)} more to reach free shipping!
                  </div>
                )}

                {/* Articles du panier */}
                {cart.items.map((item) => (
                  <div key={item.productId} className="border-b pb-4 mb-4">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
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
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-800">
                            {item.productName}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-gray-400 hover:text-red-500 transition text-sm"
                            disabled={updating}
                          >
                            <FiTrash2 />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="font-semibold text-gray-800">
                            FRW {item.price.toFixed(2)}
                          </span>

                          {/* Quantité */}
                          <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                              className="w-6 h-6 flex items-center justify-center hover:text-orange-500 transition disabled:opacity-50"
                              disabled={updating || item.quantity <= 1}
                            >
                              <FiMinus className="text-xs" />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center hover:text-orange-500 transition disabled:opacity-50"
                              disabled={updating}
                            >
                              <FiPlus className="text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Taxes */}
                <div className="text-sm text-gray-500 mb-4">
                  Taxes included and shipping calculated at checkout.
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-5 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-semibold text-gray-800">
                FRW {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="space-y-3">
              <Link
                to="/cart"
                onClick={onClose}
                className="block w-full text-center border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-orange-500 hover:text-orange-500 transition font-medium"
              >
                View Cart
              </Link>

              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/login");
                    return;
                  }
                  // Naviguer vers la page de checkout
                  navigate("/checkout");
                  onClose();
                }}
                disabled={cart.items?.length === 0 || loading}
                className={`w-full py-3 rounded-lg font-medium transition ${
                  cart.items?.length === 0 || loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {loading ? (
                  <FiLoader className="animate-spin inline mr-2" />
                ) : null}
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPopup;