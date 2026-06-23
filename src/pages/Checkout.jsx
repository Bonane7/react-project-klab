// pages/Checkout.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiLoader,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api_v1`;

function Checkout() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  // Formulaire
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    paymentMethod: "card",
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(`${BASE_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          if (res.data.data.items?.length === 0) {
            navigate("/cart");
            return;
          }
          setCart(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    // Validation
    if (!formData.street || !formData.city || !formData.country || !formData.phone) {
      setError("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}/orders/create`,
        {
          address: {
            street: formData.street,
            city: formData.city,
            country: formData.country,
            postalCode: formData.postalCode,
            phone: formData.phone,
          },
          paymentMethod: formData.paymentMethod,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setSuccess(true);
        setOrderId(res.data.data.orderNumber || res.data.data._id);
        // Optionnel: rediriger après 3 secondes
        setTimeout(() => {
          navigate("/user/orders");
        }, 4000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error creating order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="text-4xl text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Confirmed! 🎉
          </h2>
          <p className="text-gray-500 mb-1">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <p className="text-sm font-medium text-gray-600 mb-4">
            Order ID: <span className="text-orange-500">{orderId}</span>
          </p>
          <p className="text-sm text-gray-400 mb-6">
            You will receive a confirmation email shortly.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/user/orders"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              View My Orders
            </Link>
            <Link
              to="/user/shop"
              className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/cart"
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FiArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Shipping Address
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                  <FiAlertCircle />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Kigali"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Rwanda"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="0000"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+250 788 123 456"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors bg-white"
                  >
                    <option value="card">Credit / Debit Card</option>
                    <option value="mobile_money">Mobile Money</option>
                    <option value="cash">Cash on Delivery</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Place Order - $${total.toFixed(2)}`
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Résumé */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
                {cart.items?.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between text-sm py-1 border-b border-gray-50"
                  >
                    <span className="text-gray-600">
                      {item.productName} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="flex justify-between py-3 border-t mt-3 text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-500">${total.toFixed(2)}</span>
              </div>

              {shipping === 0 && (
                <p className="text-xs text-green-500 font-medium mt-2">
                  ✨ Free shipping applied!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;