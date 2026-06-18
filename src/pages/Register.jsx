function Register({ switchToLogin }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Register
      </h2>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          className="w-full border p-3 rounded-lg outline-none focus:border-orange-500"
        />

        <input
          type="text"
          placeholder="Last Name"
          className="w-full border p-3 rounded-lg outline-none focus:border-orange-500"
        />

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
          Register
        </button>
      </form>

      <p className="text-center mt-5">
        Already have an account?
        <button
          onClick={switchToLogin}
          className="ml-2 text-orange-500 font-semibold"
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;