import React from "react";

const Header = () => {
  return (
    <div className="flex sm:absolute sm:right-0 bg-slate-600 justify-between items-center pt-1 px-6 sm:px-8 lg:px-10 h-[10vh]  sm:w-[75vw]  ">
      <div className="flex sm:hidden">
        <h1>Rightminds</h1>
      </div>
      <div className=" hidden sm:flex   h-10 py-2   px-6 items-center justify-center  gap-3  rounded-lg shadow-md">
        <button>
          <img src="/search.svg" alt="" />
        </button>
        <input type="text" placeholder="search" className="outline-none " />
      </div>
      <div className="hidden sm:flex p-2">
        <span className="flex gap-4 sm:gap-6">
          <img height={20} width={20} src="/message-circle.svg" alt="" />
          <img height={20} width={20} src="/bell.svg" alt="" />
          <p className="text-nowrap text-right pt-2 text-sm">
            chris chris <br /> Admin
          </p>
          <img src="users.svg" height={20} width={20} alt="" />
        </span>
      </div>
      <div className=" flex sm:hidden  ">
        <button className="text-gray-800 hover:text-white focus:outline-none">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
