// layout.js or Layout.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isActive, setIsActive] = useState(pathname);
  const [announcementCount, setAnnouncementCount] = useState(0);

  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  const menuItems = [
    {
      id: "/student_dashboard",
      icon: "/table-of-contents.svg",
      name: "Overview",
    },
    { id: "/Course", icon: "/book.svg", name: "Courses" },
    { id: "/Quiz", icon: "/brain (1).svg", name: "Quiz" },
    { id: "/Ai_Assistant", icon: "/bot.svg", name: "AI Assistant" },
    { id: "/Anouncement", icon: "/bell-ring.svg", name: "Announcement" },
    {
      id: "/Progress_Tracker",
      icon: "/trending-up.svg",
      name: "Progress Tracker",
    },
    {
      id: "/DiscussionPlatform",
      icon: "/message-circle (1).svg",
      name: "Discussion & Forum",
    },
    { id: "/Settings", icon: "/settings.svg", name: "Settings" },
    { id: "/Profile", icon: "/user-round-pen.svg", name: "Profile" },
  ];

  useEffect(() => {
    setIsActive(pathname);
  }, [pathname]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const logout = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>Logging out...</span>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );

    if (session?.user?.role === "student") {
      setTimeout(async () => {
        try {
          await signOut({ redirect: false });

          toast.update(toastId, {
            render: "Logout successful!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });

          setTimeout(() => {
            router.push("/");
          }, 2000);
        } catch (error) {
          toast.update(toastId, {
            render: "Logout failed. Please try again.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }, 1000);
    }
  };

  useEffect(() => {
    const getNumberOfAnnouncements = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/getAnnouncements`);
        if (
          response.data?.status === true &&
          Array.isArray(response.data.data)
        ) {
          setAnnouncementCount(response.data.data.length);
        }
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };

    getNumberOfAnnouncements();
  }, [BACKENDURL]);

  if (status === "unauthenticated") return null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 p-4 z-10 fixed h-full transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform lg:translate-x-0 lg:relative shadow-lg flex flex-col overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-lg font-semibold text-black">Student</h2>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden"
          >
            <FiX className="text-black" size={30} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 mt-8">
          <ul className="space-y-10">
            {[0, 3, 6].map((groupStart, i) => (
              <li key={i} className="border-b pb-2">
                <div className="space-y-3">
                  {menuItems
                    .slice(groupStart, groupStart + 3)
                    .map((link, index) => (
                      <Link key={index} href={link.id} passHref legacyBehavior>
                        <a
                          onClick={() => setIsActive(link.id)}
                          className={`group flex items-center gap-2 p-2 rounded-md transition-all ${
                            isActive === link.id
                              ? "bg-blue-500 text-white"
                              : "text-black hover:bg-blue-100"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 text-lg ${
                              isActive === link.id
                                ? "text-white"
                                : "text-slate-700 group-hover:text-blue-700"
                            }`}
                          >
                            {<img src={link.icon} />}
                          </span>
                          <p className="text-sm font-medium">{link.name}</p>
                          {link.id === "/Anouncement" &&
                            announcementCount > 0 && (
                              <span className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                                {announcementCount}
                              </span>
                            )}
                        </a>
                      </Link>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-4 border-t">
          <button onClick={logout} className="w-full text-left">
            <span className="group flex items-center gap-2 p-2 rounded-md transition-all hover:bg-red-500 hover:text-white text-black">
              <img src="/log-out (1).svg" alt="" />
              <span className="text-sm font-medium">Logout</span>
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden"
          >
            <FiMenu className="text-black" size={30} />
          </button>
          <h2 className="text-xl font-semibold hidden md:flex text-black">
            RightMinds
          </h2>
          <div className="flex items-center space-x-6">
            <span className="relative">
              <Link href="/Anouncement" passHref legacyBehavior>
                <a>
                  <img src="/bell-ring.svg" alt="" />
                </a>
              </Link>
              {announcementCount > 0 && (
                <div className="bg-red-600 text-white absolute -bottom-1 -left-1 text-xs h-4 w-4 flex justify-center items-center rounded-full">
                  <p className="text-[12px]">{announcementCount}</p>
                </div>
              )}
            </span>
            <Link href="/Profile" passHref legacyBehavior>
              <a className="flex items-center gap-3">
                <span className="text-black capitalize hidden md:block text-sm text-right">
                  {session?.user?.firstname}
                  <br /> {session?.user?.lastname}
                </span>
                <img
                  src="/user.svg"
                  className="rounded-full"
                  width={40}
                  height={40}
                  alt="User"
                />
              </a>
            </Link>
          </div>
        </header>

        <main className="p-4 flex-1 overflow-y-auto">{children}</main>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>

      <style jsx>{`
        ::-webkit-scrollbar {
          width: 2px;
        }
        ::-webkit-scrollbar-track {
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #1e293b;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #0062cc;
        }
      `}</style>
    </div>
  );
};

export default Layout;
