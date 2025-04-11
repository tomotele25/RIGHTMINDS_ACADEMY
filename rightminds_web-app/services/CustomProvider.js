import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const CustomProvider = CredentialsProvider({
  name: "customProvider",
  credentials: {
    email: { type: "text", field: "email" },
    password: { type: "password", field: "password" },
  },
  authorize: async (credentials) => {
    //logic to check backend response using client credentials
    console.log("authorize function reached");
    try {
      const url = `http://localhost:5000/api/auth/login`;
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
  try {
    const url = `http://localhost:5000/api/auth/login`;
    const response = await axios.post(url, credentials);

    if (response.data.success && response.data.accessToken) {
      // You should make sure you're returning the user data, not just the access token
      return {
        access_token: response.data.accessToken,
        user: response.data.user, // Ensure you have user data in the response
      };
    }

    return null; // No user or invalid credentials
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

export { CustomProvider };
