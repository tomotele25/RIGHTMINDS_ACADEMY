import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const BACKENDURL =
  "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

const CustomProvider = CredentialsProvider({
  name: "customProvider",
  credentials: {
    email: { type: "text", label: "Email" },
    password: { type: "password", label: "Password" },
  },
  async authorize(credentials) {
    console.log("Authorize function reached");
    try {
      const response = await axios.post(
        `${BACKENDURL}/api/auth/login`,
        credentials
      );
      const data = response.data;

      if (data.success && data.accessToken && data.refreshToken && data.user) {
        return {
          access_token: data.accessToken,
          refresh_token: data.refreshToken,
          expires_in: data.expiresIn,
          USER: data.user,
          username: data.user.username,
        };
      }

      return null;
    } catch (error) {
      console.error(
        "Authorization error:",
        error.response?.data || error.message
      );
      throw new Error("Invalid credentials");
    }
  },
});

export { CustomProvider };
