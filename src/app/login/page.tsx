"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  }

  if (session) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 animate-gradient">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-transform duration-300">
          <p className="text-gray-700 mb-4 text-lg">
            Signed in as:{" "}
            <span className="font-semibold text-purple-600">
              {session.user?.email}
            </span>
          </p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Sign Out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 animate-gradient">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold text-center text-purple-700">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-all duration-300 hover:shadow-md"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Login Buttons */}
        <button
          onClick={() => signIn("github")}
          className="w-full bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-lg text-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          Sign in with GitHub
        </button>

        <button
          onClick={() => signIn("google")}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-6 py-3 rounded-lg text-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
