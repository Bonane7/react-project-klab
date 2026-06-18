function Login({ switchToRegister }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Login
      </h2>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg outline-none focus:border-orange-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg outline-none focus:border-orange-500"
        />

        <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600">
          Login
        </button>
      </form>

      <p className="text-center mt-5">
        Don't have an account?
        <button
          onClick={switchToRegister}
          className="ml-2 text-orange-500 font-semibold"
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;