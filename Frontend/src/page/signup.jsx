import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [step, setStep] = useState(1); // step 1 = signup, step 2 = otp
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: Signup request (send OTP)
  const handleSignup = async (data) => {
    try {
      setLoading(true);
      setFormData(data);

      await axios.post(`${import.meta.env.VITE_PUBLIC_API}/api/v1/auth/sendotp`, {
        email: data.email,
      });

      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error("Error sending OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and complete signup
  const handleVerifyOtp = async (otpData) => {
    try {
      const finalData = { ...formData, otp: otpData.otp };

      const res = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API}/api/v1/auth/signup`,
        finalData
      );

      toast.success("Signup Successful");
      console.log("Server Response:", res.data);
      reset();
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("OTP verification failed. Try again.");
    }
  };

  return (
    <div className="relative w-screen min-h-screen flex justify-center items-start pt-16 px-4 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none"
        src="/login-bg.mp4" // 🔥 place your video in /public
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/bg2.png"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 -z-10 backdrop-blur-[0.5px]" />

      {/* Toasts */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Glassmorphic Form */}
      <form
        onSubmit={handleSubmit(step === 1 ? handleSignup : handleVerifyOtp)}
        className="relative bg-white/00 backdrop-blur-xl border border-white/30 
                   rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-2xl flex flex-col gap-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 text-center mb-6 drop-shadow-lg">
          {step === 1 ? "User Signup" : "Verify OTP"}
        </h1>

        {step === 1 ? (
          <>
            {/* Account Type */}
            <select
              {...register("accountType", { required: "Account Type is required" })}
              defaultValue="Leader"
              className="px-4 py-3 rounded-lg bg-white/30 text-black border border-white/40 
                         focus:outline-none backdrop-blur-sm"
            >
              <option value="Leader">As a Team Leader</option>
              <option value="Campus_Ambasdor">As a Campus Ambassador</option>
            </select>

            {/* Name */}
            <input
              {...register("Name", { required: "Name is required" })}
              placeholder="Full Name"
              className="px-4 py-3 rounded-lg bg-white/30 text-black placeholder-gray-700 
                         border border-white/40 focus:outline-none backdrop-blur-sm"
            />

            {/* Email */}
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="px-4 py-3 rounded-lg bg-white/30 text-black placeholder-gray-700 
                         border border-white/40 focus:outline-none backdrop-blur-sm"
            />

            {/* Roll No */}
            <input
              {...register("rollNo", { required: "Roll No is required" })}
              placeholder="Roll Number"
              className="px-4 py-3 rounded-lg bg-white/30 text-black placeholder-gray-700 
                         border border-white/40 focus:outline-none backdrop-blur-sm"
            />

            {/* Password */}
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="px-4 py-3 rounded-lg bg-white/30 text-black placeholder-gray-700 
                         border border-white/40 focus:outline-none backdrop-blur-sm"
            />

            {/* Confirm Password */}
            <input
              {...register("confirmPassword", { required: "Confirm Password is required" })}
              type="password"
              placeholder="Confirm Password"
              className="px-4 py-3 rounded-lg bg-white/30 text-black placeholder-gray-700 
                         border border-white/40 focus:outline-none backdrop-blur-sm"
            />
          </>
        ) : (
          <>
            {/* OTP Input */}
            <input
              {...register("otp", { required: "OTP is required" })}
              placeholder="Enter OTP"
              className="px-4 py-3 rounded-lg bg-white/30 text-black placeholder-gray-700 
                         border border-white/40 focus:outline-none backdrop-blur-sm"
            />
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-end items-center mt-6 gap-4">
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-6 py-3 bg-white/30 text-yellow-600 
                         border border-yellow-400 rounded-lg font-semibold hover:bg-yellow-400 
                         hover:text-black transition-colors"
            >
              <FaArrowLeft /> Edit Details
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 font-semibold rounded-lg shadow-lg transition-transform ${
              loading
                ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-orange-600 hover:to-yellow-500 hover:scale-105"
            }`}
          >
            {loading
              ? "Sending OTP..."
              : step === 1
              ? "Signup"
              : "Verify OTP"}
          </button>
        </div>

        {/* Already have account? */}
        {step === 1 && (
          <p className="text-center text-black font-medium mt-4 drop-shadow-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
