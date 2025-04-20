import React, { useState } from "react";
import Link from "next/link";
("../utils/Link");
const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className=" hidden   sm:block  w-[17vw] sm:w-[20vw] h-full bg-white rounded-md  shadow-2xl pb-11 px-2 sm:px-4 lg:px-6">
      <div className="flex flex-col justify-center h-full  gap-7 pt-28 ">
        {menuItems.map((Link, index) => {
          return (
            <div className="flex flex-col justify-center h-full  gap-7 pt-28 ">
              <Link key={index} href={`/${{}}`}>
                {Link.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
