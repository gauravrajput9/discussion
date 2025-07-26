"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to My App</h1>
        <p className="text-lg mb-8">Choose an option to continue</p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {/* Navigate to Login */}
          <button
            onClick={() => router.push("/login")}
            className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-lg text-white shadow-md transition"
          >
            Login
          </button>

          {/* Navigate to Signup */}
          <button
            onClick={() => router.push("/signup")}
            className="bg-white text-purple-700 hover:bg-gray-200 px-6 py-3 rounded-lg shadow-md transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}
