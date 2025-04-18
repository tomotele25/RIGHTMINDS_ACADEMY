import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Loader from "@/components/Loader";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const BACKENDURL = "http://localhost:5000";

  const payload = { email, password, userName };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKENDURL}/api/auth/signup`,
        payload
      );
      response && response?.data?.message && alert(response?.data?.message);
      router.push("/Login");
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {loading ? (
        <Loader />
      ) : (
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
        </form>
      )}
    </div>
  );
};

export default Signup;
