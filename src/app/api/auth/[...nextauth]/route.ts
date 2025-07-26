import prisma from "@/lib";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error(
    "Missing required environment variables: GITHUB_ID and GITHUB_SECRET. " +
      "Please check your .env.local file and ensure GitHub OAuth app is configured."
  );
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error(
    "Missing NEXTAUTH_SECRET environment variable. " +
      "Please add NEXTAUTH_SECRET to your .env.local file."
  );
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("Google client id not found");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google client secret not found");
}

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email or password not found");
        }
        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!existingUser) {
          throw new Error("User not Found");
        }
        return existingUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user.email || !user.name) {
        throw new Error("Not Enough info. to Sign Up");
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || "",
          },
        });
      }
      return true;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, account }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
