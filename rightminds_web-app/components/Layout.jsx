import React from "react";
import Sidebar from "./Sidebar";

import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <div className="flex h-full">
      <div className=" ">
        <Sidebar />
      </div>

      <div className="grid h-full  w-full ">
        <div className="w-full">
          <Header />
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
