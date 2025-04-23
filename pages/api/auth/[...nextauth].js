import NextAuth from "next-auth";
import { CustomProvider } from "@/services/CustomProvider";

export const nextOptions = {
  providers: [CustomProvider],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(nextOptions);
