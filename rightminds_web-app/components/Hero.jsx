import React from "react";
import Image from "next/image";
import Link from "next/link";
const Hero = () => {
  return (
    <div className=" py-12 lg:py-0 px-6 sm:px-8 lg:px-10 pt-16  sm:pt-0 lg:pt-0">
      <div></div>
      <div className="sm:flex  h-full items-center  sm:justify-between  sm:py-28">
        <div className="grid gap-6 sm:gap-8  text-slate-700">
          {/* <span className="sm:flex gap-2">
            <span>News</span>
            <span>we have updated the terms condition privacy</span>
          </span> */}
          <h1 className=" text-3xl leading-normal  text-center lg:text-left sm:text-left   sm:text-4xl font-semibold sm:leading-snug ">
            A New Way to Learn, Engage <br /> and Experience Education{" "}
          </h1>
          <p className=" text-base  text-center lg:text-left sm:text-left ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
            iusto sint <br /> dolore expedita quae sapiente repellat, deleniti
            recusandae ipsam <br />
            labore aliquid
          </p>
          <span className="flex justify-center sm:justify-normal lg:justify-normal gap-3">
            <button className="bg-slate-800 text-white px-10 py-2 rounded-lg ">
              <Link href="/Login">Login</Link>
            </button>
            <button className="bg-slate-800 text-white px-10 py-2 rounded-lg ">
              <Link href="/Signup">Signup</Link>
            </button>
          </span>
        </div>
        <div className=" pt-6 sm:pt-0 lg:pt-0">
          <Image
            className="rounded-md"
            src="/Hero.png"
            width={350}
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
