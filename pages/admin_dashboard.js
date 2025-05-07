import React, { useState } from "react";
import {
  FaBars,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaChartBar,
  FaCogs,
  FaMedal,
  FaBullhorn,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Admin_dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle logout
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

    // Only log out admin if they are an admin
    if (session?.user?.role === "admin") {
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
            router.push("/"); // Redirect after logout
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

  // Redirect to homepage if not authenticated
  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  return (
    <div className="h-screen w-full text-black flex bg-white">
      {/* Sidebar */}
      <aside
        className={`h-full bg-white text-black shadow-xl transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        } flex flex-col fixed z-10`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4 ">
          <span
            className={`font-bold text-xl text-black ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            Learnova
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="ml-auto text-white text-sm p-2 rounded "
          >
            <FaBars color="black" size={20} />
          </button>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-2 p-4 border-b border-black">
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin"
            className="w-12 h-12 rounded-full object-cover"
          />
          {isSidebarOpen && (
            <div>
              <p className="font-medium text-sm text-black">
                Tomotele Christopher
              </p>
              <p className="text-xs text-indigo-200">Administrator</p>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-2 space-y-3">
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaChartBar className="mr-3" />
            {isSidebarOpen && <span>Dashboard</span>}
          </div>
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaUserGraduate className="mr-3" />
            {isSidebarOpen && <span>Students</span>}
          </div>
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaChalkboardTeacher className="mr-3" />
            {isSidebarOpen && <span>Teachers</span>}
          </div>
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaBook className="mr-3" />
            {isSidebarOpen && <span>Courses</span>}
          </div>
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaBullhorn className="mr-3" />
            {isSidebarOpen && <span>Announcements</span>}
          </div>
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaMedal className="mr-3" />
            {isSidebarOpen && <span>Certificates & Badges</span>}
          </div>
          <div className="flex items-center p-2 hover:bg-indigo-600 rounded cursor-pointer">
            <FaCogs className="mr-3" />
            {isSidebarOpen && <span>Settings</span>}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-14"
        }`}
      >
        <header className="bg-white p-6 shadow-md flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h2>
          <button
            onClick={logout}
            className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </header>

        <main className="p-6">{/* Content Section */}</main>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Admin_dashboard;
