import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const BACKENDURL =
  "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

const CustomProvider = CredentialsProvider({
  name: "customProvider",
  credentials: {
    email: { type: "text", field: "email" },
    password: { type: "password", field: "password" },
  },
  secret: process.env.NEXTAUTH_SECRET,
  authorize: async (credentials) => {
    console.log("authorize function reached");
    console.log("Backend :", BACKENDURL);
    try {
      const url = `${BACKENDURL}/api/auth/login`;
      const response = await axios.post(url, credentials);
      console.log("resp: ", response.data);

      if (
        response.data.success &&
        response.data.accessToken &&
        response.data.user
      )
        return {
          access_token: response.data.accessToken,
          USER: response.data.user,
          username: response.data.user.username,
        };
      return null;
    } catch (error) {
      console.error("Error: ", error);
    }
  },
});

export { CustomProvider };
