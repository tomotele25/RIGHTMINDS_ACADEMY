import { useState, useEffect } from "react";
import {
  FaBars,
  FaChartBar,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaBullhorn,
  FaMedal,
  FaCogs,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/Login");
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

    if (session) {
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
            router.push("/Login");
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

  const isActive = (path) => router.pathname === path;

  // Nav items array
  const navItems = [
    { href: "/Dashboard", icon: FaChartBar, label: "Dashboard" },
    { href: "/Students", icon: FaUserGraduate, label: "Students" },
    { href: "/Teachers", icon: FaChalkboardTeacher, label: "Teachers" },
    { href: "/ManageCourse", icon: FaBook, label: "Courses" },
    { href: "/ManageAnnouncement", icon: FaBullhorn, label: "Announcements" },
    { href: null, icon: FaMedal, label: "Certificates & Badges" },
    { href: null, icon: FaCogs, label: "Settings" },
  ];

  const handleNavClick = () => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  if (status === "loading") {
    // Optionally, show loading spinner or blank screen while session loads
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Toggle Button (Top Right) */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`fixed top-4 right-4 z-50 p-2 ${
          isSidebarOpen ? "hidden" : "block"
        } bg-white rounded shadow md:hidden`}
        aria-label="Open sidebar"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar Overlay (mobile only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white text-black shadow-xl transition-transform duration-300 z-50
          w-64 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }
          md:translate-x-0 md:static md:w-64 flex flex-col`}
      >
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="font-bold text-xl text-black">Learnova</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="block md:hidden p-2"
            aria-label="Close sidebar"
          >
            <FaBars color="black" size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-2 space-y-3" aria-label="Main navigation">
          {navItems.map(({ href, icon: Icon, label }) =>
            href ? (
              <Link key={label} href={href}>
                <span
                  onClick={handleNavClick}
                  className={`flex items-center p-2 rounded cursor-pointer select-none ${
                    isActive(href)
                      ? "bg-indigo-700 text-white"
                      : "hover:bg-indigo-600 text-black"
                  }`}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  <Icon className="mr-3" />
                  <span>{label}</span>
                </span>
              </Link>
            ) : (
              <div
                key={label}
                className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-default text-gray-700 select-none"
              >
                <Icon className="mr-3" />
                <span>{label}</span>
              </div>
            )
          )}
        </nav>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer mt-auto text-black w-full"
          aria-label="Logout"
        >
          <img src="/log-out.svg" alt="Logout Icon" className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 bg-white p-4 overflow-y-auto">
        {children}
      </main>

      {/* Toast notifications */}
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
  );
}
