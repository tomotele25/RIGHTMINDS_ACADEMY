import React from "react";
import Sidebar from "./Sidebar";

import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <div className="grid bg-red-200">
      <div className="h-[15vh]">
        <Header />
      </div>
      <div className="flex ">
        <div className="h-[85vh] bg-green-500 w-[20vw]">
          <Sidebar />
        </div>
        <div className="h-[85vh] w-[80vw] bg-blue-500">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
