import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const Layout = ({ children }) => {
  const pathname = usePathname();
  const menuItems = [
    { id: "/", icon: "shield.svg", name: "Dashboard" },
    { id: "/students", icon: "users.svg", name: "Students" },
    { id: "/Course", icon: "book-open.svg", name: "Courses" },
    { id: "/Quiz", icon: "brain.svg", name: "quiz" },
    { id: "/Anouncement", icon: "bell.svg", name: "Anouncement" },
    {
      id: "/Progress_Tracker",
      icon: "/chart-line.svg",
      name: "Progress Tracker",
    },
    { id: "/settings", icon: "shield.svg", name: "Settings" },
    {
      id: "/discussion and forum",
      icon: "/earth.svg",
      name: "Discusion and Forum",
    },
    { id: "/Profile", icon: "circle-user-round.svg", name: "Profile" },
    { id: "/logout", icon: "log-out.svg", name: "Logout" },
  ];
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isActive, setIsActive] = useState(pathname);
  useEffect(() => {
    setIsActive(pathname); // Update active link when pathname changes
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 p-4 fixed h-full transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform lg:translate-x-0 lg:relative lg:w-64 shadow-lg`}
      >
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-semibold text-black">Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden bg-slate-700"
          >
            <FiX color="black" size={30} className="bg-white" />
          </button>
        </div>
        <nav className="mt-4">
          <ul className="space-y-4">
            <li className="flex flex-col justify-center h-full  gap-10 pt-12 sm:gap-5 sm:pt-5 ">
              {menuItems.map((link, index) => {
                return (
                  <span
                    className={`flex gap-3 ${
                      isActive === link.id
                        ? "bg-blue-500 p-2 rounded-md text-white font-bold"
                        : ""
                    }`}
                    onClick={() => setIsActive(link.id)}
                  >
                    <img src={link.icon} key={index} alt="" />
                    <Link
                      href={`${link.id}`}
                      className="text-base font-medium text-black"
                    >
                      {link.name}
                    </Link>
                  </span>
                );
              })}
              {/* <Link href="/" className=" gap-2 flex">
                <img src="/house.svg" alt="" />
                <p>Home</p>
              </Link>
              <Link href="/" className=" gap-2 flex">
                {" "}
                <img src="/book-open.svg" alt="" /> <p> Courses</p>
              </Link>
              <Link href="/" className=" gap-2 flex">
                {" "}
                <img src="/chart-line.svg" alt="" /> <p> Progress tracker </p>
              </Link>
              <Link href="/" className=" gap-2 flex text-nowrap">
                {" "}
                <img src="/brain.svg" alt="" /> <p> Quizzes </p>
              </Link>
              <Link href="/" className=" gap-2 flex">
                {" "}
                <img src="/bell.svg" alt="" /> <p> Announcements </p>{" "}
              </Link>
              <Link href="/" className=" gap-2 flex">
                {" "}
                <img src="/message-circle.svg" alt="" />{" "}
                <p> Discussion Forums </p>{" "}
              </Link>
              <Link href="/" className=" gap-2 flex">
                {" "}
                <img src="/users.svg" alt="" /> <p> Profile & Settings </p>
              </Link>
              <Link href="/" className=" gap-2 flex">
                {" "}
                <img src="/log-out.svg" alt="" /> <p> Logout </p>
              </Link> */}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white p-4 shadow-md flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden bg-slate-500"
          >
            <FiMenu size={30} color="black" className="bg-white" />
          </button>
          <h2 className="text-xl font-semibold text-black">RightMinds</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              <img src="/ProfilePic.svg" width={30} height={30} alt="" />
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
