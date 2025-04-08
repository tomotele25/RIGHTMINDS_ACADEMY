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
        console.log("invalid credentials");
      }
      router.replace("Student_Dashboard");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
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
            <span className="grid gap-4">
              <label htmlFor="" className="text-black text-sm">
                Your email
              </label>
              <input
                className="border-2 h-10 rounded-md pl-5 text-black  border-slate-100"
                type="text"
                value={email}
                placeholder="test@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </span>
            <span className="grid gap-4">
              <label htmlFor="" className=" text-black text-sm">
                Password
              </label>
              <input
                className="border-2 h-10 rounded-md pl-5  border-slate-100"
                type="text"
                value={password}
                placeholder="* * * * * *"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </span>
            <span className="flex justify-between  items-baseline ">
              <span className="flex items-baseline gap-1 sm:gap-3">
                <input type="checkbox" name="" id="" />
                <label htmlFor="" className="text-black">
                  Remember me
                </label>
              </span>
              <span>Forget password?</span>
            </span>
            <span>
              <button
                disabled={loading}
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
