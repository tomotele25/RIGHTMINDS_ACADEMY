import React from "react";

const users = [
  {
    name: "Tomotele christopher",
    rating: "rating",
    comment:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis placeat non dolor illo fugit sapiente dolore vel eligendi voluptatum iure enim dolores,debitis sed, culpa ea, inventore reprehenderit earum magni.",
  },
  {
    name: "Mathew isreal",
    rating: "rating",
    comment:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis placeat non dolor illo fugit sapiente dolore vel eligendi voluptatum iure enim dolores, debitis sed, culpa ea, inventore reprehenderit earum magni.",
  },
  {
    name: "Alaba christian",
    rating: "rating",
    comment:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis placeat non dolor illo fugit sapiente dolore vel eligendi voluptatum iure enim dolores, debitis sed, culpa ea, inventore reprehenderit earum magni.",
  },
  {
    name: "Adeyanju Mercy",
    rating: "rating",
    comment:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis placeat non dolor illo fugit sapiente dolore vel eligendi voluptatum iure enim dolores, debitis sed, culpa ea, inventore reprehenderit earum magni.",
  },
  {
    name: "Adedapo collins",
    rating: "rating",
    comment:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis placeat non dolor illo fugit sapiente dolore vel eligendi voluptatum iure enim dolores, debitis sed, culpa ea, inventore reprehenderit earum magni.",
  },
  {
    name: "Ezeikel ojons",
    rating: "rating",
    comment:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis placeat nodolor illo fugit sapiente dolore vel eligendi voluptatum iure enim dolores,debitis sed, culpa ea, inventore reprehenderit earum magni.",
  },
  {
    name: "Ekelebedichikwudi madi",
    rating: "rating",
    comment:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis placeat nodolor illo fugit sapiente dolore vel eligendi voluptatum iure enim dolores,debitis sed, culpa ea, inventore reprehenderit earum magni.",
  },
  {
    name: "Okonkwo ijeoma",
    rating: "rating",
    comment:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis placeat nodolor illo fugit sapiente dolore vel eligendi voluptatum iure enim dolores,debitis sed, culpa ea, inventore reprehenderit earum magni.",
  },
];

const Reviews = () => {
  return (
    <div className=" py-10 bg-white flex flex-col justify-center items-center ">
      <span className="flex flex-col justify-center items-center ">
        <h1 className="text-2xl text-black font-semibold">Reviews</h1>
        <p className="text-sm text-slate-700">What our users are saying</p>
      </span>
      <div className=" grid grid-cols-1 sm:grid-cols-4 pt-10 gap-5 px-10">
        {users.map((users, index) => {
          return (
            <div
              key={index}
              className=" text-black grid border-2 gap-5 p-3 w-72 h-60 bg-white rounded-md"
            >
              <div className="flex gap-10 items-center  ">
                <span className="flex gap-2 items-center">
                  <img height={30} width={30} src="/ProfilePic.svg" alt="" />
                  <h1 className="text-nowrap">{users.name}</h1>
                </span>
                <span>{users.rating}</span>
              </div>
              <div>
                <p className="text-sm pl-3">{users.comment}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
