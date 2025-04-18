import NextAuth from "next-auth";
import { CustomProvider } from "@/services/CustomProvider";

export const nextOptions = {
  providers: [CustomProvider],
  callback: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        return token;
      }
      return null;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log("session, token, user: ", session, token, user);
      if (session && token) {
        session.accessToken = token.accessToken;
        return session;
      }
      return null;
    },
  },
};

export default NextAuth(nextOptions);
