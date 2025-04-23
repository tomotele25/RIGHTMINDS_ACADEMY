import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Show loading toast with spinner
    const toastId = toast.loading(
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>Logging you in...</span>
      </div>,
      {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: false,
        autoClose: false,
      }
    );

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        toast.update(toastId, {
          render: "Invalid email or password",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          closeOnClick: true,
          closeButton: true,
        });
      } else {
        toast.update(toastId, {
          render: "Login successful! Redirecting...",
          type: "success",
          isLoading: false,
          autoClose: 1500,
          closeOnClick: true,
          closeButton: true,
        });
        setTimeout(() => {
          router.push("/student_dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast.update(toastId, {
        render: "Something went wrong. Please try again.",
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

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = (password) => password.length > 4;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Sign in to your account
          </h1>
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
            onFocus={() => setEmailTouched(true)}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
            className={`w-full h-10 px-4 text-black border rounded-md focus:outline-none ${
              !emailTouched
                ? "border-gray-300"
                : email.length === 0
                ? "border-red-500"
                : isEmailValid(email)
                ? "border-green-500"
                : "border-red-500"
            }`}
          />
          {emailTouched && email.length === 0 && (
            <p className="text-sm text-red-600">Email is required.</p>
          )}
          {emailTouched && email.length > 0 && !isEmailValid(email) && (
            <p className="text-sm text-red-600">Please enter a valid email.</p>
          )}
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
            onFocus={() => setPasswordTouched(true)}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full text-black h-10 px-4 border rounded-md focus:outline-none ${
              !passwordTouched
                ? "border-gray-300"
                : !isPasswordValid(password)
                ? "border-red-500"
                : "border-green-500"
            }`}
          />
          {passwordTouched && password.length === 0 && (
            <p className="text-sm text-red-600">Password is required.</p>
          )}
          {passwordTouched && password.length <= 4 && (
            <p className="text-sm text-red-600">
              Password must be more than 4 characters.
            </p>
          )}
        </div>

        {/* Options */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" className="accent-slate-700" />
            Remember me
          </label>
          <span className="text-slate-700 cursor-pointer">
            Forgot password?
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            loading || !isPasswordValid(password) || !isEmailValid(email)
          }
          className="w-full h-10 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition duration-200 flex justify-center items-center"
        >
          {loading ? (
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-0"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></div>
            </div>
          ) : (
            "Log in"
          )}
        </button>

        {/* Signup Link */}
        <div className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/Signup"
            className="text-slate-800 font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>

        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </form>
    </div>
  );
};

export default Login;
