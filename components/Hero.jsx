import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
const Hero = () => {
  return (
    <div className=" py-12 lg:py-0 px-6 sm:px-8 bg-white lg:px-10 pt-20  sm:pt-0 lg:pt-20">
      <div></div>
      <div className="sm:flex  h-full items-center  sm:justify-between  sm:py-28">
        <div className="grid gap-6 sm:gap-8  ">
          <div className="max-w-3xl mx-auto lg:mx-0 px-4">
            {/* Heading */}
            <h1 className="text-[#111827] text-3xl sm:text-4xl font-semibold leading-snug text-center lg:text-left sm:text-left">
              A New Way to Learn, Engage <br /> and Experience Education
            </h1>

            {/* Animated paragraph (TypeAnimation) */}
            <p className="mt-4 text-lg text-[#1F2937] text-center lg:text-left sm:text-left">
              <TypeAnimation
                preRenderFirstString={true}
                sequence={[
                  500,
                  "Learn at your own pace, anytime and anywhere.",
                  1500,
                  "Join a vibrant community of learners.",
                  1500,
                  "Track your progress and earn achievements.",
                  1500,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </p>

            {/* Subtext under animation */}
            <p className="mt-4 text-sm sm:text-base text-[#6B7280] text-center lg:text-left sm:text-left">
              Empowering you with the tools to grow, connect, and succeed <br />
              in your learning journey.
            </p>
          </div>

          <span className="flex md:pl-5 justify-center sm:justify-normal lg:justify-normal gap-3">
            <Link
              href="/Login"
              className="bg-slate-800 text-white px-10 py-2 rounded-lg transition duration-300 ease-in-out transform hover:bg-slate-700 hover:scale-105"
            >
              Login
            </Link>
            <Link
              href="/Signup"
              className="bg-slate-800 text-white px-10 py-2 rounded-lg transition duration-300 ease-in-out transform hover:bg-slate-700 hover:scale-105"
            >
              Signup
            </Link>
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
