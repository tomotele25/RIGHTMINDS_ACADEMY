import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure this is imported
import Loader from "@/components/Loader";

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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
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
        toast.success(response.data.message);
      }

      router.push("/Login");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
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

        {/* Username */}
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

        {/* Email */}
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

        {/* Password */}
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

        {/* Confirm Password */}
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

        {/* Terms */}
        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-slate-700" />
          <label className="text-gray-700">
            I accept the{" "}
            <span className="text-blue-600">Terms and Conditions</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || password !== confirmPassword}
          className="w-full h-10 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition duration-200 flex items-center justify-center gap-2"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          )}
          {loading ? "Creating your account..." : "Create an account"}
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

        {/* Toast */}
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </form>
    </div>
  );
};

export default Signup;
