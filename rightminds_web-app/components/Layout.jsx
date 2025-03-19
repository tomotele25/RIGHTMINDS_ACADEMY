import React from "react";
import Sidebar from "./Sidebar";

import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col bg-red-200">
      <Header />
      <div className="flex ">
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
