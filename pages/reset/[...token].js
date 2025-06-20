import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKENDURL = "http://localhost:5001";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const resetToken = Array.isArray(token) ? token[0] : token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resetToken) {
      console.log("Token from URL:", resetToken);
    }
  }, [resetToken]);

  if (!resetToken)
    return <p style={{ color: "black" }}>Invalid or missing token</p>;

  const passwordsMatch = password === confirmPassword;

  const handleReset = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${BACKENDURL}/api/auth/reset-password/${resetToken}`, {
        password,
      });
      toast.success("Password reset successfully");
      setTimeout(() => router.push("/Login"), 2000);
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
        <h2 className="text-xl font-bold mb-4" style={{ color: "black" }}>
          Reset Password
        </h2>
        <input
          type="password"
          placeholder="New password"
          className="w-full h-10 px-4 mb-3 border rounded"
          style={{
            color: "black",
            borderColor: password
              ? passwordsMatch
                ? "green"
                : "red"
              : "#d1d5db", // gray if empty
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full h-10 px-4 mb-3 border rounded"
          style={{
            color: "black",
            borderColor: confirmPassword
              ? passwordsMatch
                ? "green"
                : "red"
              : "#d1d5db",
          }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {!passwordsMatch && confirmPassword && (
          <p style={{ color: "red", marginTop: "-12px", marginBottom: "12px" }}>
            Passwords do not match
          </p>
        )}
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
