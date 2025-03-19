import React from "react";

const Card = ({ image, heading, sub_heading }) => {
  return (
    <div className="bg-slate-300 shadow-md text-center flex  h-64">
      <div className=" flex-col gap-10 px-3 justify-center items-center flex ">
        <span className="flex justify-center">logo</span>
        <span>
          <h1>{heading}</h1>
          <p>{sub_heading}</p>
        </span>
      </div>
    </div>
  );
};

export default Card;
