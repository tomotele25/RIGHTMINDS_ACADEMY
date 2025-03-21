import Image from "next/image";
const About = () => {
  return (
    <div id="about" className=" h-auto pt-5 w-full bg-slate-50">
      <div className="flex justify-center text-4xl font-semibold sm:text-4xl ">
        <h1>About us</h1>
      </div>
      <div className="grid px-6 py-10 lg:gap-16 sm:px-8 lg:px-10 sm:flex sm:justify-between lg:justify-between lg:flex w-full">
        <div className=" text-black w-full lg:w-8/12 sm:w-8/12">
          <p className="leading-relaxed text-lg">
            <span className=" text-2xl sm:text-4xl">
              Welcome to Rightminds academy
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
          <img src="/About (2).png" className="h-full  sm:w-10/12 lg:w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default About;
