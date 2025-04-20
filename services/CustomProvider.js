import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const BACKENDURL = "http://localhost:5000";

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

      console.log("response: ", response.data);

      // If the backend response is successful and has the access token, return it along with user data
      if (response.data.success && response.data.accessToken) {
        return {
          access_token: response.data.accessToken,
          user: response.data.user, // Assuming user data is in the response
        };
      }

      // If credentials are invalid or no accessToken, return null
      return null;
    } catch (error) {
      console.error("Error: ", error);
      return null; // Always return null on error
    }
  },
});

export { CustomProvider };
