import { useEffect, useState } from "react";

const About = () => {
  const [currentText, setCurrentText] = useState(0);

  const textArray = [
    "Welcome to Rightminds Academy",
    "Innovation meets learning",
    // "Crafting exceptional digital experiences",
    // "Empowering you with tech and trading knowledge",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % textArray.length); // Loop through the text array
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [textArray.length]);

  return (
    <div id="about" className="h-auto pt-5 pb-3 w-full text-black bg-slate-50">
      <div className="flex justify-center text-4xl font-semibold sm:text-4xl">
        <h1 className="text-black">About us</h1>
      </div>
      <div className="grid px-6 py-10 lg:gap-16 sm:px-8 lg:px-10 sm:flex sm:justify-between lg:justify-between lg:flex w-full">
        <div className="w-full lg:w-8/12 sm:w-8/12">
          <p className="text-black leading-relaxed text-lg">
            <span className="text-center sm:text-right text-2xl sm:text-4xl">
              {textArray[currentText]}
            </span>
            , where innovation meets excellence. As a team of software
            developers and traders, we combine technical expertise with
            strategic insights to create solutions that drive results. Whether
            it’s building robust web applications, crafting seamless user
            experiences, or navigating the financial markets, our focus is
            always on delivering value. Beyond development and trading, we are
            passionate about continuous learning and problem-solving. Our
            projects reflect a commitment to efficiency, functionality, and
            design. If you're looking for a reliable partner for software
            solutions or market insights, you've come to the right place. Let’s
            build something great together! --- Would you like to add more
            details about your services or company vision?
          </p>
        </div>
        <div className="w-full flex justify-center pt-10 sm:pt-0 sm:w-2/3 lg:w-2/3">
          <img src="/About (2).png" className="h-full sm:w-10/12 lg:w-2/3" />
        </div>
      </div>

      {/* Bullet Indicators */}
      <div className="flex justify-center mt-5">
        {textArray.map((_, index) => (
          <span
            key={index}
            className={`mx-2 w-3 h-3 rounded-full ${
              currentText === index ? "bg-blue-500" : "bg-gray-300"
            } transition-all duration-300`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default About;
