import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKENDURL =
  "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const resetToken = Array.isArray(token) ? token[0] : token;

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resetToken) {
      console.log("Token from URL:", resetToken);
    }
  }, [resetToken]);

  if (!resetToken) return <p>Invalid or missing token</p>;

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${BACKENDURL}/api/auth/reset-password/${resetToken}`, {
        password,
      });
      toast.success("Password reset successfully");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4">
      <form
        onSubmit={handleReset}
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          className="w-full h-10 px-4 mb-3 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default ResetPasswordPage;
