import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
const Navbar = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfilePicModalOpen, setIsProfilePicModalOpen] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is scrolled down
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleProilePicClick = () => {
    setIsProfilePicModalOpen(!isProfilePicModalOpen);
  };
  // const checkUserName = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/auth/signup",
  //       (req, res) => {
  //         const username = req.query.username;
  //         console.log(username);
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // checkUserName();

  return (
    <nav className="bg-gray-800 z-50 fixed top-0  w-full ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-white  font-semibold text-2xl ">Learnova</div>
          </div>
          <div className="hidden md:block  ">
            <div className="ml-10 flex gap-10 items-center space-x-4">
              <span>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </a>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </a>
              </span>
              <span className="flex relative  justify-center">
                <span className="text-white flex gap-3">
                  <span>
                    <Link href="/Login">login </Link>
                  </span>
                  <div className="border-l-2 border-slate-300"></div>
                  <span>
                    <Link href="/Signup">Sign Up </Link>
                  </span>
                </span>

                {isProfilePicModalOpen && (
                  <span className="absolute h-48 flex flex-col justify-evenly  w-60  bg-white shadow-lg top-14 right-10">
                    <span className="flex justify-center w-10/12 p-2 items-center ml-5 bg-white shadow-lg">
                      <h1 className="text-black  flex justify-center">
                        User18763yyh6ey3h
                      </h1>
                    </span>
                    <span className="flex justify-center w-10/12 p-2 items-center ml-5 bg-white shadow-lg ">
                      <p className="text-black">Messages</p>
                    </span>
                    <span className="flex  gap-3 justify-center">
                      <button className=" rounded-md text-black text-nowrap bg-white shadow-lg px-2  py-2">
                        check Profile
                      </button>
                      <button className="text-black px-4  py-2 ">
                        <img src="/log-out.svg" alt="" />
                      </button>
                    </span>
                  </span>
                )}
              </span>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpened(!isOpened)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpened && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
            <a
              href="#services"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </a>
            <a
              href="#contact"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </a>
            <a
              href="#features"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Features
            </a>
            <a
              href="#courses"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
