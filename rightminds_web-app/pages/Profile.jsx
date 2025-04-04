import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

const Profile = () => {
  return (
    <div>
      <Layout>
        <span className="flex justify-center sm:justify-start">
          <h1 className="text-black text-2xl"> Account Settings </h1>
        </span>{" "}
        <span className="flex justify-center  pt-10 ">
          <img src="ProfilePic.svg" alt="" />
        </span>
        <span className=" flex flex-col justify-center items-center sm:grid sm:grid-cols-2 w-full sm:place-items-center gap-10 sm:px-40 pt-10">
          <span className="grid gap-5">
            <label className="text-black" htmlFor="">
              Email
            </label>
            <input
              type="text"
              className=" w-64
                 h-10 rounded-md"
            />
          </span>
          <span className="grid gap-5">
            <label className="text-black" htmlFor="">
              Change password
            </label>
            <input
              type="text"
              className=" w-64
                 h-10 rounded-md"
            />
          </span>
          <span className="grid gap-5">
            <label className="text-black" htmlFor="">
              Confirm password
            </label>
            <input
              type="text"
              className=" w-64
                 h-10 rounded-md"
            />
          </span>
          <span className="grid gap-5    ">
            <label className="text-black " htmlFor="">
              Bio
            </label>
            <textarea name="" className="w-64 h-10 p-2" id="">
              description
            </textarea>
          </span>
        </span>
        <span className="items-center justify-center pt-10 flex">
          <button className="bg-blue-800 w-[62%] h-10 rounded-lg ">
            Update
          </button>
        </span>
        {/* <span>
          <span
            className="flex justify-center items-center  
            "
          >
            <span className="grid gap-5 place-items-start  w-[55%] ">
              <label className="text-black " htmlFor="">
                Bio
              </label>
              <textarea name="" className="w-full" id="">
                description
              </textarea>
            </span>
          </span>
        </span> */}
      </Layout>
    </div>
  );
};

export default Profile;
