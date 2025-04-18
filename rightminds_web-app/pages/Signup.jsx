import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/router";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const payload = { email, password, userName };
  const BACKENDURL = "http://localhost:5000";
  const router = useRouter();
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    // router.push("/student_dashboard");
    // try {
    //   if (confirmPassword != password) {
    //     alert("passowrd does not match ");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    try {
      console.log("Details:", userName, email, password);
      const response = await axios.post(
        `${BACKENDURL}/api/auth/signup`,
        payload
      );
      response && response?.data?.message && alert(response?.data?.message);
      // response && toast.success(response?.data?.message);
      router.push("/Login");
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "something went wrong!");
      // toast.error(error?.response?.data?.message || "something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="h-[100vh] overflow-scroll ">
        <div className=" h-full flex flex-col text-nowrap justify-center px-2  sm:px-0 items-center">
          <form
            onSubmit={(e) => {
              submitForm(e);
            }}
            className="grid gap-3  bg-white shadow-2xl rounded-lg  sm:w-5/12  p-4  "
          >
            <div className="flex justify-center">
              <h1 className=" text-black text-2xl sm:text-3xl font-semibold">
                Create an account
              </h1>
            </div>
            <span className="grid gap-4">
              <label htmlFor="" className="text-black text-sm">
                Username
              </label>
              <input
                className="border-2 text-zinc-800 h-10 rounded-md pl-5  border-slate-100"
                type="text"
                value={userName}
                required
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="create a username"
              />
            </span>
            <span className="grid gap-4">
              <label htmlFor="" className="text-black text-sm">
                Your email
              </label>
              <input
                className="border-2 text-zinc-800 h-10 rounded-md pl-5  border-slate-100"
                type="email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="test@gmail.com"
              />
            </span>
            <span className="grid gap-4">
              <label htmlFor="" className="text-black text-sm">
                Password
              </label>
              <input
                className="border-2 h-10 rounded-md text-zinc-800 pl-5  border-slate-100"
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter password"
              />
            </span>
            <span className="grid gap-4">
              <label htmlFor="" className=" text-black text-sm">
                Confirm password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="border-2 text-zinc-800 h-10 rounded-md pl-5  border-slate-100"
                type="password"
                placeholder="Confirm password"
              />
            </span>
            <span className="flex justify-between  items-baseline ">
              <span className="flex items-baseline gap-3 sm:gap-3">
                <input type="checkbox" name="" id="" />
                <label htmlFor="" className="text-black">
                  I accept the{" "}
                  <span className="text-blue-600">Terms and Condition</span>
                </label>
              </span>
            </span>
            <span>
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "bg-slate-400 text-slate-100 cursor-not-allowed text-opacity-70 bg-opacity-70"
                    : "bg-slate-800 text-white"
                } w-full h-10 rounded-lg outline-none`}
              >
                {loading ? "Loading..." : "Create an account"}
              </button>
            </span>
            <span className="flex gap-3 text-black  justify-center">
              <p>Already have an account ? </p>
              <Link href="/login">Login here</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
