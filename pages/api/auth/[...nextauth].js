import NextAuth from "next-auth";
import { CustomProvider } from "@/services/CustomProvider";

export const nextOptions = {
  providers: [CustomProvider],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session && token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(nextOptions);
