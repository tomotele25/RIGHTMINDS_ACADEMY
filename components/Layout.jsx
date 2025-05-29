import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Import FontAwesome icons from react-icons/fa
import {
  FaList,
  FaBookOpen,
  FaBrain,
  FaMagic,
  FaBell,
  FaChartLine,
  FaGlobeAmericas,
  FaShieldAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isActive, setIsActive] = useState(pathname);
  const [anouncementNo, setAnouncementNo] = useState([]);

  // Use environment variable or fallback
  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  // Map menu items with React icons instead of image strings
  const menuItems = [
    { id: "/student_dashboard", icon: <FaList />, name: "overview" },
    { id: "/Course", icon: <FaBookOpen />, name: "Courses" },
    { id: "/Quiz", icon: <FaBrain />, name: "quiz" },
    { id: "/Ai_Assistant", icon: <FaMagic />, name: "AI Assistant" },
    { id: "/Anouncement", icon: <FaBell />, name: "Anouncement" },
    {
      id: "/Progress_Tracker",
      icon: <FaChartLine />,
      name: "Progress Tracker",
    },
    {
      id: "/DiscussionPlatform",
      icon: <FaGlobeAmericas />,
      name: "Discusion and Forum",
    },
    { id: "/Settings", icon: <FaShieldAlt />, name: "Settings" },
    { id: "/Profile", icon: <FaUserCircle />, name: "Profile" },
  ];

  useEffect(() => {
    setIsActive(pathname);
  }, [pathname]);

  // Redirect unauthenticated users
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
          await signOut({ redirect: false }); // Prevent automatic redirect

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

  // Fetch announcements inside useEffect properly
  useEffect(() => {
    const getNumberOfAnouncement = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/getAnnouncements`);
        if (response?.data?.success) {
          setAnouncementNo(response.data.announcements);
          console.log(
            "number of anouncements fetched successfully",
            response.data.announcements
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    getNumberOfAnouncement();
  }, [BACKENDURL]);

  // While redirecting, show nothing or loader
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`bg-white w-64 p-4 z-10 fixed h-full transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-64"
          } transition-transform lg:translate-x-0 lg:relative shadow-lg flex flex-col overflow-y-auto`}
        >
          {/* Sidebar header */}
          <div className="flex justify-between items-center pb-4 border-b">
            <h2 className="text-lg font-semibold text-black">Student</h2>
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
              aria-label="Close sidebar"
            >
              <FiX color="black" size={30} />
            </button>
          </div>

          {/* Sidebar nav */}
          <nav className="flex-1 mt-8">
            <ul className="space-y-10">
              {[0, 3, 6].map((groupStart, i) => (
                <li key={i} className="border-b pb-2">
                  <div className="space-y-3">
                    {menuItems
                      .slice(groupStart, groupStart + 3)
                      .map((link, index) => (
                        <Link
                          key={index}
                          href={link.id}
                          passHref
                          legacyBehavior
                        >
                          <a
                            className={`flex items-center gap-2 p-2 rounded-md transition-all ${
                              isActive === link.id
                                ? "bg-blue-500 text-white"
                                : "text-black hover:bg-blue-100"
                            }`}
                            onClick={() => setIsActive(link.id)}
                          >
                            <span className="w-5 h-5">{link.icon}</span>
                            <p className="text-sm font-medium">{link.name}</p>
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
            <button
              onClick={logout}
              className="w-full text-left"
              aria-label="Logout"
            >
              <span
                className={`flex items-center gap-2 p-2 rounded-md transition-all hover:bg-red-500 hover:text-white ${
                  isActive === "logout" ? "bg-red-500 text-white" : "text-black"
                }`}
              >
                <FaSignOutAlt className="w-5 h-5" />
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
              aria-label="Open sidebar"
            >
              <FiMenu size={30} color="black" />
            </button>
            <h2 className="text-xl font-semibold hidden md:flex text-black">
              RightMinds
            </h2>
            <div className="flex items-center space-x-6">
              <span className="relative">
                <Link href="/Anouncement" passHref legacyBehavior>
                  <a aria-label="Notifications">
                    <FaBell size={24} color="black" />
                  </a>
                </Link>
                <div className="bg-red-600 text-white absolute bottom-4 left-3 text-xs h-4 w-4 flex justify-center items-center rounded-full">
                  <p className="text-[10px]">{anouncementNo.length}</p>
                </div>
              </span>
              <Link href="/Profile" passHref legacyBehavior>
                <a className="flex items-center gap-3">
                  <span className="text-black capitalize hidden md:block text-sm text-right">
                    {session?.user?.firstname}
                    <br /> {session?.user?.lastname}
                  </span>
                  <img
                    src="/Ellipse 514 (6).svg"
                    className="rounded-full"
                    width={40}
                    height={40}
                    alt="User"
                  />
                </a>
              </Link>
            </div>
          </header>

          {/* Page content */}
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
      </div>

      {/* Custom scrollbar */}
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
