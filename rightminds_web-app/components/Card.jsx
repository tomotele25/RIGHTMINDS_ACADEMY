import React from "react";

const Card = ({ image, heading, sub_heading }) => {
  return (
    <div className="bg-slate-50 shadow-md text-center flex  h-64">
      <div className=" flex-col gap-10 px-3 justify-center items-center flex ">
        <span className="flex justify-center">
          <img src={image} width={50} height={50} alt="" />
        </span>
        <span>
          <h1 className="text-black">{heading}</h1>
          <p> {sub_heading}</p>
        </span>
      </div>
    </div>
  );
};

export default Card;
