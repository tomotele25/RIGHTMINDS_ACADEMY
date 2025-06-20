"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BACKENDURL =
  "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  // ✅ Email format validation
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleForgot = async (e) => {
    e.preventDefault();

    // ✅ Client-side validation
    if (!isEmailValid(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${BACKENDURL}/api/auth/forget-password`, {
        email,
      });

      toast.success(res.data.message || "Reset link sent to your email.");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleForgot}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Enter your email to receive a reset link
        </p>

        {/* Email input */}
        <div className="space-y-1">
          <input
            type="email"
            placeholder="you@example.com"
            className={`w-full h-10 px-4 text-black border rounded focus:outline-none ${
              touched
                ? isEmailValid(email)
                  ? "border-green-500"
                  : "border-red-500"
                : "border-gray-300"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            required
          />

          {/* Live validation message */}
          {touched && email.length > 0 && !isEmailValid(email) && (
            <p className="text-sm text-red-600">Please enter a valid email.</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700 transition duration-200"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <ToastContainer />
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
