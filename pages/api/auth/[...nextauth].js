import NextAuth from "next-auth";
import axios from "axios";
import { CustomProvider } from "@/services/CustomProvider";

const BACKENDURL =
  "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

async function refreshAccessToken(token) {
  try {
    console.log("Refreshing with refresh token:", token.refreshToken);

    // Call your backend refresh token endpoint
    const response = await axios.post(`${BACKENDURL}/api/auth/refresh-token`, {
      refreshToken: token.refreshToken,
    });

    const refreshed = response.data;
    console.log("Refresh response data:", refreshed);

    // Backend returns accessToken, refreshToken, and optionally expiresIn (seconds)
    return {
      ...token,
      accessToken: refreshed.accessToken, // Match your backend naming
      // Calculate expiry time; fallback to 15 minutes if expiresIn is not provided
      accessTokenExpires:
        Date.now() +
        (refreshed.expiresIn ? refreshed.expiresIn * 1000 : 15 * 60 * 1000),
      // Use new refresh token or fall back to old one if not returned
      refreshToken: refreshed.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error(
      "Error refreshing access token",
      error.response?.data || error.message
    );
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const nextOptions = {
  providers: [CustomProvider],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.USER._id;
        token.email = user.USER.email;
        token.role = user.USER.role;
        token.firstname = user.USER.firstname;
        token.lastname = user.USER.lastname;
        token.username = user.username;
        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;
        token.accessTokenExpires = Date.now() + user.expires_in * 1000;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.firstname = token.firstname;
      session.user.lastname = token.lastname;
      session.user.username = token.username;
      session.user.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 24 hours
  },

  jwt: {
    maxAge: 60 * 60, // 1 hour
  },
};

export default NextAuth(nextOptions);
