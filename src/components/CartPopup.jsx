// components/CartPopup.jsx
import { useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function CartPopup({ isOpen, onClose }) {
  // Empêcher le scroll du body quand le popup est ouvert
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

  return (
    <>
      {/* Overlay transparent à 50% */}
      <div
        className={`
          fixed inset-0 bg-black transition-all duration-500 z-[100]
          ${isOpen ? 'opacity-50 visible' : 'opacity-0 invisible'}
        `}
        onClick={onClose}
      />

      {/* Popup qui glisse depuis la droite */}
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
            Shopping Cart <span className="text-gray-400 text-sm">1</span>
          </h2>
          <button
            onClick={onClose}
            className="text-2xl hover:text-orange-500 transition"
          >
            <IoCloseOutline />
          </button>
        </div>

        {/* Contenu du panier */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-5">
            
            {/* Message free shipping */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              Spend $700.01 more to reach free shipping!
            </div>

            {/* Article du panier */}
            <div className="border-b pb-4 mb-4">
              <div className="flex gap-4">
                {/* Image placeholder */}
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0"></div>
                
                {/* Détails produit */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800">Ana Grey Dining Chair</h3>
                    <button className="text-gray-400 hover:text-red-500 transition text-sm">
                      ✕
                    </button>
                  </div>
                  
                  <div className="mt-2 space-y-1 text-sm text-gray-500">
                    <p>Color: Blue</p>
                    <p>Material: Range 1</p>
                    <p>Corner: Left corner</p>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-semibold text-gray-800">$299.99</span>
                    
                    {/* Quantity selector */}
                    <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                      <button className="w-6 h-6 flex items-center justify-center hover:text-orange-500 transition">
                        -
                      </button>
                      <span className="w-8 text-center">1</span>
                      <button className="w-6 h-6 flex items-center justify-center hover:text-orange-500 transition">
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button className="mt-2 text-sm text-gray-400 hover:text-orange-500 transition">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Message taxes */}
            <div className="text-sm text-gray-500 mb-4">
              Taxes included and shipping calculated at checkout.
            </div>
          </div>

          {/* Footer avec total et boutons */}
          <div className="border-t p-5 bg-white">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-semibold text-gray-800">
                $299.99 USD
              </span>
            </div>
            
            {/* Boutons */}
            <div className="space-y-3">
              <Link
                to="/cart"
                onClick={onClose}
                className="block w-full text-center border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-orange-500 hover:text-orange-500 transition font-medium"
              >
                View cart
              </Link>
              
              <button
                onClick={() => {
                  // Logique pour checkout
                  console.log('Checkout');
                }}
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-medium"
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPopup;