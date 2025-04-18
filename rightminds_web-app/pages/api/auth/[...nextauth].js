import NextAuth from "next-auth";
import { CustomProvider } from "@/services/CustomProvider";

export const nextOptions = {
  providers: [CustomProvider],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token; // Always return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      if (session && token) {
        session.accessToken = token.accessToken;
      }
      return session; // Always return session
    },
  },
};

export default NextAuth(nextOptions);
