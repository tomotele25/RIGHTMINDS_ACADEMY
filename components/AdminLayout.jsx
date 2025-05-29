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

  const navItems = [
    { href: "/Dashboard", icon: FaChartBar, label: "Dashboard" },
    { href: "/Students", icon: FaUserGraduate, label: "Students" },
    { href: "/Teachers", icon: FaChalkboardTeacher, label: "Teachers" },
    { href: "/ManageQuiz", icon: FaChalkboardTeacher, label: "Manage Quiz" },
    { href: "/ManageCourse", icon: FaBook, label: "Courses" },
    { href: "/ManageAnnouncement", icon: FaBullhorn, label: "Announcements" },
    { href: null, icon: FaMedal, label: "Certificates & Badges" },
    { href: null, icon: FaCogs, label: "Settings" },
  ];

  const handleNavClick = () => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`fixed top-4 right-4 z-50 p-2 ${
          isSidebarOpen ? "hidden" : "block"
        } bg-white rounded-lg shadow-md md:hidden transition-shadow hover:shadow-lg`}
        aria-label="Open sidebar"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white w-64 p-4 z-10 fixed h-full transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform lg:translate-x-0 lg:relative shadow-lg flex flex-col overflow-y-auto`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-xl font-extrabold text-indigo-700 select-none">
            Learnova
          </h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2"
          >
            <FaBars size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-8">
          <ul className="space-y-8">
            {[0, 3, 6].map((groupStart, i) => (
              <li key={i} className="border-b pb-2">
                <div className="space-y-3">
                  {navItems
                    .slice(groupStart, groupStart + 3)
                    .map(({ href, icon: Icon, label }) =>
                      href ? (
                        <Link key={label} href={href} legacyBehavior={false}>
                          <span
                            onClick={handleNavClick}
                            className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                              isActive(href)
                                ? "bg-indigo-600 text-white shadow-md"
                                : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                            }`}
                            aria-current={isActive(href) ? "page" : undefined}
                          >
                            <Icon className="text-lg" />
                            <span>{label}</span>
                          </span>
                        </Link>
                      ) : (
                        <div
                          key={label}
                          className="flex items-center gap-3 p-2 rounded-md text-sm text-gray-400 select-none"
                        >
                          <Icon className="text-lg" />
                          <span>{label}</span>
                        </div>
                      )
                    )}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-4 border-t">
          <button onClick={logout} className="w-full text-left">
            <span className="flex items-center gap-2 p-2 rounded-md transition-all hover:bg-red-500 hover:text-white text-black">
              <img src="/log-out.svg" alt="Logout" className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 bg-gray-50 p-6 overflow-y-auto">
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
