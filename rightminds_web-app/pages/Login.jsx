import React from "react";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const BACKENDURL = "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const payload = { email, password };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        console.log("next auth error: ", response.error);
      }
      router.push("/student_dashboard");
      // router.replace("student_dashboard");
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setLoading(false);
    }
  };
  const isEmailValid = (email) => {
    // Simple and common pattern for basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  return (
    <div className="bg-white">
      <div className="h-[100vh] ">
        <div className=" h-full flex flex-col justify-center text-nowrap  px-2 sm:px-0 items-center">
          <form
            onSubmit={handleSubmit}
            className="grid gap-5  bg-white shadow-2xl rounded-lg sm:w-5/12 pl-5 p-5 py-10 "
          >
            <div className="flex justify-center">
              <h1 className=" text-black text-2xl  sm:text-3xl font-semibold">
                Sign in to your account
              </h1>
            </div>
            <span className="grid gap-2 ">
              <label htmlFor="" className="text-black text-sm">
                Your email
              </label>
              <input
                className={`border-2 h-10 rounded-md pl-5 text-black  border-slate-100 ${
                  !emailTouched
                    ? "border-slate-100"
                    : email.length === 0
                    ? "border-red-700"
                    : isEmailValid(email)
                    ? "border-green-700"
                    : "border-red-700"
                }`}
                type="text"
                value={email}
                onFocus={() => setEmailTouched(true)}
                placeholder="test@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {emailTouched && email.length === 0 && (
                <p className="text-red-700 text-sm">Email is required</p>
              )}
              {emailTouched && email.length > 0 && !isEmailValid(email) && (
                <p className="text-red-700 text-sm">
                  Please enter a valid email
                </p>
              )}
              ``
            </span>
            <span className="grid gap-2">
              <label htmlFor="" className=" text-black text-sm">
                Password
              </label>
              <input
                className={`border-2 h-10 rounded-md pl-5 ${
                  password.length === 0
                    ? "border-slate-100"
                    : password.length <= 4
                    ? "border-red-700"
                    : "border-green-700"
                }`}
                type="text"
                value={password}
                placeholder="* * * * * *"
                onFocus={() => setIsTouched(true)}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {isTouched && password.length === 0 && (
                <p className="text-red-700">Must contain password</p>
              )}
              {isTouched && password.length > 0 && password.length <= 4 && (
                <p className="text-red-700">Password has to be more than 4</p>
              )}
            </span>
            <span className="flex justify-between  items-baseline ">
              <span className="flex items-baseline gap-1 sm:gap-3">
                <input type="checkbox" name="" id="" />
                <label htmlFor="" className="text-black">
                  Remember me
                </label>
              </span>
              <span className="text-black">Forget password?</span>
            </span>
            <span>
              <button
                disabled={loading || password.length <= 4}
                className="w-full  bg-slate-800 text-white h-10 rounded-lg outline-none"
              >
                {loading ? "loading...." : "Log in to you account"}
              </button>
            </span>
            <span className="flex justify-center text-black">
              <Link href="/Signup">Dont have an account ?</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
