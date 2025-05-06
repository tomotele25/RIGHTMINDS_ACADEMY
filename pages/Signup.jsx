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
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const router = useRouter();

  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isPasswordMatch) {
      toast.error("Passwords do not match!");
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
        toast.success("Signup successful");
        setTimeout(() => {
          router.push("/Login");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const pass = e.target.value;
    setPassword(pass);
    setIsPasswordMatch(pass === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPass = e.target.value;
    setConfirmPassword(confirmPass);
    setIsPasswordMatch(password === confirmPass);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setEmailValid(emailPattern.test(emailValue));
  };

  const handleUsernameChange = (e) => {
    const usernameValue = e.target.value;
    setUsername(usernameValue);
    setUsernameValid(usernameValue.length >= 3);
  };

  return (
    <div className="flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={submitForm}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create an account
          </h1>
          <p className="text-sm text-slate-800 mt-2">
            Welcome to Learnova, create your account to get started!
          </p>
        </div>

        <div className="space-y-2">
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
            onChange={handleUsernameChange}
            placeholder="Create a username"
            className={`w-full h-12 px-4 border rounded-md focus:outline-none ${
              usernameValid ? "border-gray-300" : "border-red-700"
            } text-black`}
          />
          {!usernameValid && (
            <p className="text-xs text-red-500">
              Username must be at least 3 characters long
            </p>
          )}
        </div>

        <div className="space-y-2">
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
            onChange={handleEmailChange}
            placeholder="test@example.com"
            className={`w-full h-12 px-4 border rounded-md focus:outline-none ${
              emailValid ? "border-gray-300" : "border-red-500"
            } text-black`}
          />
          {!emailValid && (
            <p className="text-xs text-red-500">Please enter a valid email</p>
          )}
        </div>

        <div className="space-y-2">
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
            onChange={handlePasswordChange}
            placeholder="••••••••"
            className="w-full h-12 text-black px-4 border rounded-md focus:outline-none border-gray-300"
          />
        </div>

        <div className="space-y-2">
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
            onChange={handleConfirmPasswordChange}
            placeholder="••••••••"
            className="w-full h-12 px-4 text-black border rounded-md focus:outline-none border-gray-300"
          />
          <p
            className={`text-xs ${
              isPasswordMatch ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPasswordMatch ? "Passwords match!" : "Passwords do not match!"}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-slate-700 text-black" />
          <label className="text-gray-700">
            I accept the{" "}
            <span className="text-blue-600">Terms and Conditions</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={
            loading || !isPasswordMatch || !usernameValid || !emailValid
          }
          className="w-full h-12 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition duration-200"
        >
          {loading ? "Loading..." : "Create an account"}
        </button>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/Login"
            className="text-slate-800 font-medium hover:underline"
          >
            Login here
          </Link>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          style={{ zIndex: 9999 }}
        />
      </form>
    </div>
  );
};

export default Signup;
