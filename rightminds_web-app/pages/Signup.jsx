import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const BACKENDURL = "http://localhost:5000";
  const router = useRouter();
  const submitForm = async (e) => {
    e.preventDefault();
    router.push("/Student_Dashboard");
    try {
      const payload = { email, password };
      await axios.post(`${BACKENDURL}/signup`, payload);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const loginMessage = async () => {
  //     try {
  //       axios.get("http://localhost/5000/login", (res, req) => {
  //         const { email, password } = res.body;
  //       });
  //     } catch (error) {
  //       console.log("cant get login message");
  //     }
  //   };
  //   loginMessage();
  // }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        await axios.get(`${BACKENDURL}/signup`);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <div className="h-[100vh] ">
        <div className=" h-full flex flex-col text-nowrap justify-center px-2 sm:px-0 items-center">
          <form
            onSubmit={(e) => {
              submitForm(e);
            }}
            className="grid gap-5  bg-white shadow-2xl rounded-lg  sm:w-5/12  p-4 py-10 "
          >
            <div className="flex justify-center">
              <h1 className=" text-black text-2xl sm:text-3xl font-semibold">
                Create an account
              </h1>
            </div>
            <span className="grid gap-4">
              <label htmlFor="" className="text-black text-sm">
                Your email
              </label>
              <input
                className="border-2 h-10 rounded-md pl-5  border-slate-100"
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
                className="border-2 h-10 rounded-md pl-5  border-slate-100"
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
                className="border-2 h-10 rounded-md pl-5  border-slate-100"
                type="text"
                placeholder="* * * * * *"
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
                className="w-full bg-slate-800 text-white h-10 rounded-lg outline-none"
              >
                Create an account
              </button>
            </span>
            <span className="flex gap-3 text-black  justify-center">
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
