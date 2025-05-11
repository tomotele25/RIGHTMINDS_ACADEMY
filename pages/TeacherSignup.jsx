"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
const TeacherSignup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKENDURL}/api/auth/teacher-signup`,
        form
      );
      if (response.data.message) {
        toast.success("Signup successful!");
        setTimeout(() => {
          router.push("/Login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 shadow-md rounded-lg bg-white space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Signup as a teacher
        </h2>

        {["fullName", "username", "email"].map((field) => (
          <div key={field} className="space-y-1">
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 capitalize"
            >
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full h-10 px-3 border border-gray-300 rounded-md text-black"
              required
            />
          </div>
        ))}

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full h-10 px-3 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full h-10 px-3 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
        <div className="text-center text-sm text-gray-600 pt-2">
          Already have an account?{" "}
          <Link href="/TeacherLogin" className="text-slate-800 hover:underline">
            Login
          </Link>
        </div>

        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </form>
    </div>
  );
};

export default TeacherSignup;
