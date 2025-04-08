import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const menuItems = [
    { id: "/Student_Dashboard", icon: "list.svg", name: "overview" },
    { id: "/Course", icon: "book-open.svg", name: "Courses" },
    { id: "/Quiz", icon: "brain.svg", name: "quiz" },
    { id: "/", icon: "wand-sparkles.svg", name: "AI Assistant" },
    { id: "/Anouncement", icon: "bell.svg", name: "Anouncement" },
    {
      id: "/Progress_Tracker",
      icon: "/chart-line.svg",
      name: "Progress Tracker",
    },
    {
      id: "/discussion and forum",
      icon: "/earth.svg",
      name: "Discusion and Forum",
    },
    { id: "/settings", icon: "shield.svg", name: "Settings" },

    { id: "/Profile", icon: "circle-user-round.svg", name: "Profile" },
    { id: "/Profile", icon: "circle-user-round.svg", name: "Profile" },
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
        className={`bg-white w-64 p-4 z-10 fixed h-full transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform lg:translate-x-0 lg:relative lg:w-64 shadow-lg`}
      >
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-lg font-semibold text-black">Student</h2>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden bg-slate-700"
          >
            <FiX color="black" size={30} className="bg-white" />
          </button>
        </div>

        <nav className="mt-4">
          <ul className=" space-y-3">
            {/* Group 1 */}
            <li className="border-b pb-2">
              <div className="space-y-4 md:space-y-4">
                {menuItems.slice(0, 3).map((link, index) => (
                  <Link href={link.id} className="grid gap-2">
                    {" "}
                    <span
                      key={index}
                      className={`flex gap-2 p-2 rounded-md hover:bg-blue-500 hover:text-white ${
                        isActive === link.id
                          ? "bg-blue-500 text-white"
                          : "text-black"
                      }`}
                      onClick={() => setIsActive(link.id)}
                    >
                      <img src={link.icon} alt="" className="w-5 h-5" />
                      <Link href={`${link.id}`} className="text-sm font-medium">
                        {link.name}
                      </Link>
                    </span>
                  </Link>
                ))}
              </div>
            </li>

            {/* Group 2 */}
            <li className="border-b pb-2">
              <div className="space-y-4 md:space-y-2">
                {menuItems.slice(3, 6).map((link, index) => (
                  <Link href={link.id} className="grid gap-3">
                    <span
                      key={index}
                      className={`flex gap-2 p-2 rounded-md hover:bg-blue-500 hover:text-white ${
                        isActive === link.id
                          ? "bg-blue-500 text-white"
                          : "text-black"
                      }`}
                      onClick={() => setIsActive(link.id)}
                    >
                      <img src={link.icon} alt="" className="w-5 h-5" />
                      <Link href={`${link.id}`} className="text-sm font-medium">
                        {link.name}
                      </Link>
                    </span>
                  </Link>
                ))}
              </div>
            </li>

            {/* Group 3 */}
            <li className="pb-2">
              <div className="space-y-4 md:space-y-2">
                {menuItems.slice(6, 9).map((link, index) => (
                  <Link href={link.id} className="grid gap-3">
                    <span
                      key={index}
                      className={`flex gap-2 p-2 rounded-md hover:bg-blue-500 hover:text-white ${
                        isActive === link.id
                          ? "bg-blue-500 text-white"
                          : "text-black"
                      }`}
                      onClick={() => setIsActive(link.id)}
                    >
                      <img src={link.icon} alt="" className="w-5 h-5" />
                      <Link href={`${link.id}`} className="text-sm font-medium">
                        {link.name}
                      </Link>
                    </span>
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </nav>

        {/* Logout Button at the Bottom */}
        <div className="mt-auto">
          <span
            className={`flex gap-2 p-2 rounded-md hover:bg-blue-500 hover:text-white ${
              isActive === "logout" ? "bg-blue-500 text-white" : "text-black"
            }`}
          >
            <img src="/log-out.svg" alt="Logout" className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </span>
        </div>
      </aside>

      {/* <aside
        className={`bg-white w-64 p-4 fixed h-full transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform lg:translate-x-0 lg:relative lg:w-64 shadow-lg`}
      >
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-semibold text-black">Student</h2>
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
            </li>
          </ul>
        </nav>
      </aside> */}

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
            <span className="relative">
              <Link href="/Anouncement">
                <img src="bell.svg" alt="" />
              </Link>
              <div className="bg-red-600 absolute  bottom-4 left-3 text-sm  h-4 w-4 flex justify-center items-center rounded-full">
                <p className="text-[10px]"> 3</p>
              </div>
            </span>
            <span>
              <Link href="/Profile" className="text-gray-700">
                <img src="/ProfilePic.svg" width={30} height={30} alt="" />
              </Link>
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
