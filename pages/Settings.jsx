import React, { useState } from "react";

const Settings = () => {
  const [role, setRole] = useState("student"); // Default role for UI display
  const [loading, setLoading] = useState(false);

  const handleSwitch = (newRole) => {
    setLoading(true);
    setTimeout(() => {
      setRole(newRole);
      setLoading(false);
    }, 800); // Simulated delay for switching role
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-1">Current Role</h3>
        <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      </div>

      <div className="space-y-4">
        {role === "student" && (
          <button
            onClick={() => handleSwitch("teacher")}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Switching..." : "Switch to Teacher"}
          </button>
        )}
        {role === "teacher" && (
          <button
            onClick={() => handleSwitch("admin")}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Switching..." : "Switch to Admin"}
          </button>
        )}
        {role === "admin" && (
          <p className="text-green-600 text-sm font-medium">
            You are currently an Admin. You have access to admin features.
          </p>
        )}
      </div>
    </div>
  );
};

export default Settings;
