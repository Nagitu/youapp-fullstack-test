import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "input your username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        try {
          const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const data = await response.json();
          console.log("Backend response:", data);

          if (!response.ok) {
            throw new Error(data.message || 'Failed to login');
          }

          if (data && data.access_token) {
            return {
              id: credentials.username,
              token: data.access_token,
            };
          }

          return null;

        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user } : any) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
      }
      console.log("JWT callback - token:", token);
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
      }
      console.log("Session callback - session:", session);
      return session;
    },
    // async redirect({baseUrl:'/' url:''})
  },
  secret: process.env.NEXTAUTH_SECRET || "your_secret",
  session: {
    strategy: "jwt",
  },
};
