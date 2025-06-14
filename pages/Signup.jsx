import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  // New touched states
  const [emailTouched, setEmailTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);

  const router = useRouter();

  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  const isPasswordMatch = password === confirmPassword;
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
    email
  );
  const isUsernameValid = username.length >= 3;

  const handleNext = () => {
    if (step === 1 && (!isEmailValid || !isUsernameValid)) {
      toast.error("Please enter a valid email and username");
      return;
    }
    if (step === 2 && !isPasswordMatch) {
      toast.error("Passwords do not match");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BACKENDURL}/api/auth/signup`, {
        email,
        username,
        password,
        firstname,
        lastname,
        role: "student",
      });

      toast.success("Signup successful!");
      setTimeout(() => {
        router.push("/Login");
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Create an account
          </h1>
          <p className="text-sm text-slate-600 mt-2">Step {step} of 3</p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-black"
                placeholder="First Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-black"
                placeholder="Last Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameTouched(true);
                }}
                className={`w-full px-4 py-2 border rounded-md text-black ${
                  usernameTouched && !isUsernameValid
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Create a username"
              />
              {usernameTouched && !isUsernameValid && (
                <p className="text-xs text-red-500">
                  Username must be at least 3 characters
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailTouched(true);
                }}
                className={`w-full px-4 py-2 border rounded-md text-black ${
                  emailTouched && !isEmailValid
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="you@example.com"
              />
              {emailTouched && !isEmailValid && (
                <p className="text-xs text-red-500">Invalid email format</p>
              )}
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                placeholder="••••••••"
              />
              {confirmPassword.length > 0 && (
                <p
                  className={`text-xs ${
                    isPasswordMatch ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isPasswordMatch
                    ? "Passwords match"
                    : "Passwords do not match"}
                </p>
              )}
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="accent-slate-700 text-black"
              />
              <label className="text-gray-700">
                I accept the{" "}
                <span className="text-blue-600">Terms and Conditions</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading || !termsAccepted}
              className="w-full py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-slate-600 hover:underline"
            >
              ← Back
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700"
            >
              Next →
            </button>
          )}
        </div>

        <div className="text-center text-sm text-gray-600 pt-2">
          Already have an account?{" "}
          <Link href="/Login" className="text-slate-800 hover:underline">
            Login
          </Link>
        </div>

        <ToastContainer position="top-right" autoClose={2000} />
      </form>
    </div>
  );
};

export default Signup;
