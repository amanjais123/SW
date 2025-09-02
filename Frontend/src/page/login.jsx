import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        formData,
        { withCredentials: true }
      );

      toast.success("✅ Login successful!");
      console.log("Login response:", res.data);

      const accountType = res.data?.user?.accountType;

      if (accountType === "Leader") {
        navigate("/dashboard");
      } else if (accountType === "Campus_Ambasdor") {
        navigate("/campusDashboard");
      } else {
        toast.error("Unknown account type!");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen min-h-screen flex justify-center items-center px-4 overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none"
        src="/login-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/bg2.png"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10 backdrop-blur-[0.5px]" />

      {/* Glassmorphic Form */}
      <form
        onSubmit={handleLogin}
        className="relative bg-white/00 backdrop-blur-xl border border-white/30 
                   rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 text-center drop-shadow-lg">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="px-4 py-3 rounded-lg bg-white/30 text-black placeholder-gray-700 
                     focus:outline-none border border-white/40 backdrop-blur-sm"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="px-4 py-3 rounded-lg bg-white/30 text-black placeholder-gray-700 
                     focus:outline-none border border-white/40 backdrop-blur-sm"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white 
                     font-semibold rounded-lg shadow-lg hover:from-orange-600 hover:to-yellow-500 
                     transition-transform hover:scale-105 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-black font-medium drop-shadow-sm">
          Don’t have an account?{" "}
          <span
            className="text-yellow-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
