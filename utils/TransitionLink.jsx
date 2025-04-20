"use client";
import React from "react";
const Link = ({ children, href, ...props }) => {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default Link;
