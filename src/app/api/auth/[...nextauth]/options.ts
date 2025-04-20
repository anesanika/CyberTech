import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/app/req/axios";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "name", type: "text" },
        password: { label: "pass", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await db.post("/api/token/", {
            username: credentials?.username,
            password: credentials?.password,
          });
          console.log(data);

          if (data) {
            return {
              accessToken: data.access,
              refreshToken: data.refresh,
              id: data.id,
              username: credentials?.username,
            };
          }

          return null;
        } catch (e) {
          console.error("Error during authentication:", e);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};
