import { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/50
      z-[999]
      flex
      items-center
      justify-center
      p-4
      "
    >
      <div
        className="
        bg-white
        w-full
        max-w-md
        rounded-2xl
        p-6
        relative
        animate-[fadeIn_.3s_ease]
        "
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl"
        >
          ✕
        </button>

        {isLogin ? (
          <Login switchToRegister={() => setIsLogin(false)} />
        ) : (
          <Register switchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}

export default AuthModal;