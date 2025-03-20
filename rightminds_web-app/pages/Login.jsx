import React from "react";
import Link from "next/link";
const Login = () => {
  return (
    <div>
      <div className="h-[100vh] ">
        <div className=" h-full flex flex-col justify-center text-nowrap  px-2 sm:px-0 items-center">
          <form className="grid gap-5  bg-white shadow-2xl rounded-lg sm:w-5/12 pl-5 p-5 py-10 ">
            <div className="flex justify-center">
              <h1 className=" text-2xl  sm:text-3xl font-semibold">
                Sign in to your account
              </h1>
            </div>
            <span className="grid gap-4">
              <label htmlFor="" className="text-sm">
                Your email
              </label>
              <input
                className="border-2 h-10 rounded-md pl-5  border-slate-100"
                type="text"
                placeholder="test@gmail.com"
              />
            </span>
            <span className="grid gap-4">
              <label htmlFor="" className="text-sm">
                Password
              </label>
              <input
                className="border-2 h-10 rounded-md pl-5  border-slate-100"
                type="text"
                placeholder="* * * * * *"
              />
            </span>
            <span className="flex justify-between  items-baseline ">
              <span className="flex items-baseline gap-1 sm:gap-3">
                <input type="checkbox" name="" id="" />
                <label htmlFor="">Remember me</label>
              </span>
              <span>Forget password?</span>
            </span>
            <span>
              <button className="w-full bg-slate-800 text-white h-10 rounded-lg outline-none">
                Log in to you account
              </button>
            </span>
            <span className="flex justify-center">
              <Link href="/Signup">Dont have an account ?</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
