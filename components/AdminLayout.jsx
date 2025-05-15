import { useState } from "react";
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

    // Add a delay before performing signOut
    if (session) {
      setTimeout(async () => {
        try {
          await signOut({ redirect: false }); // Prevent automatic redirection

          // Update the toast to success
          toast.update(toastId, {
            render: "Logout successful!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });

          // Wait before redirecting to allow the success toast to be seen
          setTimeout(() => {
            router.push("/Login"); // Redirect after logout
          }, 2000);
        } catch (error) {
          // Handle error and update toast
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

  if (status === "unauthenticated") {
    router.push("/Login");
    return;
  }

  return (
    <div className="flex h-screen  bg-white">
      {/* Mobile Toggle Button (Top Left) */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`fixed top-4 right-4  z-50 p-2 ${
          isSidebarOpen ? "hidden" : "block"
        } bg-white rounded shadow md:hidden`}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar Overlay (mobile only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white text-black shadow-xl transition-transform duration-300 z-50
    w-64 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:static md:w-64 flex flex-col`}
      >
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="font-bold text-xl text-black">Learnova</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="block md:hidden p-2"
          >
            <FaBars color="black" size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-2 space-y-3">
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaChartBar className="mr-3" />
            <span>Dashboard</span>
          </div>
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaUserGraduate className="mr-3" />
            <Link href="/Students">Students</Link>
          </div>
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaChalkboardTeacher className="mr-3" />
            <Link href="/Teachers">Teachers</Link>
          </div>
          <div className="">
            <Link
              href="/ManageCourse"
              className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer"
            >
              <FaBook className="mr-3" />
              <span>Courses</span>
            </Link>
          </div>
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaBullhorn className="mr-3" />
            <Link href="/ManageAnnouncement">Announcements</Link>
          </div>
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaMedal className="mr-3" />
            <span>Certificates & Badges</span>
          </div>
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaCogs className="mr-3" />
            <span>Settings</span>
          </div>
        </nav>

        {/* Logout Button */}
        <div
          onClick={logout}
          className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer mt-auto"
        >
          <img src="/log-out.svg" alt="Logout" className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Logout</span>
        </div>
      </aside>

      {/* Main Content Placeholder */}
      <main className="flex-1 ml-0 bg-white p-4 overflow-y-scroll">
        {children}
      </main>
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
