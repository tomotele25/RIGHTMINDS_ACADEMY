import NextAuth from "next-auth";
import { CustomProvider } from "@/services/CustomProvider";

export const nextOptions = {
  providers: [CustomProvider],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // jwt callback to store additional info in JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.USER._id;
        token.email = user.USER.email;
        token.role = user.USER.role;
        token.accessToken = user.access_token; // Corrected this to use user.access_token
      }
      return token;
    },

    // session callback to return the correct session data
    async session({ session, token }) {
      // Now you properly attach the role and accessToken to session.user
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      session.user.email = token.email;
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(nextOptions);
