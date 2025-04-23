import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

let BACKENDURL;

if (process.env.NEXT_PUBLIC_BACKEND_DOMAIN) {
  BACKENDURL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
} else {
  if (process.env.NODE_ENV === "production") {
    BACKENDURL = "https://rightmindsbackend.vercel.app";
  } else {
    BACKENDURL = "http://localhost:5000";
  }
}

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
      if (response.data.success && response.data.accessToken)
        return { access_token: response.data.accessToken };
      return null;
    } catch (error) {
      console.error("Error: ", error);
    }
  },
});

export { CustomProvider };
