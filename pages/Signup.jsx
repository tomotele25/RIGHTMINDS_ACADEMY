import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Show loading toast with spinner
    const toastId = toast.loading(
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>Creating your account...</span>
      </div>,
      {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: false,
        autoClose: false,
      }
    );

    if (password !== confirmPassword) {
      toast.update(toastId, {
        render: "Passwords do not match",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
      });
      setLoading(false);
      return;
    }

    const payload = { email, password, username };
    try {
      const response = await axios.post(
        `${BACKENDURL}/api/auth/signup`,
        payload
      );

      if (response?.data?.message) {
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
          closeOnClick: true,
          closeButton: true,
        });
        setTimeout(() => {
          router.push("/Login");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: error?.response?.data?.message || "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={submitForm}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create an account
          </h1>
        </div>

        {/* Username Field */}
        <div className="space-y-1">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="userName"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Create a username"
            className="w-full h-10 px-4 border rounded-md focus:outline-none border-gray-300"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
            className="w-full h-10 px-4 border rounded-md focus:outline-none border-gray-300"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-10 px-4 border rounded-md focus:outline-none border-gray-300"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-10 px-4 border rounded-md focus:outline-none border-gray-300"
          />
        </div>

        {/* Terms & Conditions Checkbox */}
        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-slate-700" />
          <label className="text-gray-700">
            I accept the{" "}
            <span className="text-blue-600">Terms and Conditions</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || password !== confirmPassword}
          className="w-full h-10 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition duration-200"
        >
          {loading ? "Loading..." : "Create an account"}
        </button>

        {/* Login Link */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/Login"
            className="text-slate-800 font-medium hover:underline"
          >
            Login here
          </Link>
        </div>

        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </form>
    </div>
  );
};

export default Signup;
