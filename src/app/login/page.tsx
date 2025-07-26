"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

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
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-full max-w-sm space-y-4 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl font-extrabold mb-2 text-purple-700">
          Welcome Back!
        </h1>
        <p className="text-gray-600 mb-4">Choose a sign-in method</p>

        {/* GitHub Button */}
        <button
          onClick={() => signIn("github")}
          className="w-full bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-lg text-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          Sign in with GitHub
        </button>

        {/* Google Button */}
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
