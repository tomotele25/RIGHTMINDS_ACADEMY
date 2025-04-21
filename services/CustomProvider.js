import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const BACKENDURL =
  process.env.NEXT_PUBLIC_BACKEND_DOMAIN ||
  (process.env.NODE_ENV === "production"
    ? "rightmindsbackend.vercel.app"
    : "http://localhost:5000");

const CustomProvider = CredentialsProvider({
  name: "customProvider",
  credentials: {
    email: { type: "text", field: "email" },
    password: { type: "password", field: "password" },
  },
  authorize: async (credentials) => {
    console.log("authorize function reached");
    console.log("Backend :", BACKENDURL);
    try {
      const url = `${BACKENDURL}/api/auth/login`;
      const response = await axios.post(url, credentials);
      console.log("resp: ", response.data);
      if (response.data.success && response.data.accessToken)
        return { access_token: response.data.accessToken };
      return null;
    } catch (error) {
      console.error("Error: ", error);
    }
  },
});
authorize: async (credentials) => {
  console.log("Backend", BACKENDURL);
  try {
    const url = `${BACKENDURL}/api/auth/login`;
    const response = await axios.post(url, credentials);

    if (response.data.success && response.data.accessToken) {
      return {
        access_token: response.data.accessToken,
        user: response.data.user,
      };
    }

    return null;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

export { CustomProvider };
