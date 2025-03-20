import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div>
      <div className="h-[100vh] ">
        <div className=" h-full flex flex-col text-nowrap justify-center px-2 sm:px-0 items-center">
          <form className="grid gap-5  bg-white shadow-2xl rounded-lg  sm:w-5/12  p-4 py-10 ">
            <div className="flex justify-center">
              <h1 className=" text-2xl sm:text-3xl font-semibold">
                Create an account
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
            <span className="grid gap-4">
              <label htmlFor="" className="text-sm">
                Confirm password
              </label>
              <input
                className="border-2 h-10 rounded-md pl-5  border-slate-100"
                type="text"
                placeholder="* * * * * *"
              />
            </span>
            <span className="flex justify-between  items-baseline ">
              <span className="flex items-baseline gap-3 sm:gap-3">
                <input type="checkbox" name="" id="" />
                <label htmlFor="">
                  I accept the{" "}
                  <span className="text-blue-600">Terms and Condition</span>
                </label>
              </span>
            </span>
            <span>
              <button className="w-full bg-slate-800 text-white h-10 rounded-lg outline-none">
                Create an account
              </button>
            </span>
            <span className="flex gap-3  justify-center">
              <p>Already have an account ? </p>
              <Link href="/Login">Login here</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
