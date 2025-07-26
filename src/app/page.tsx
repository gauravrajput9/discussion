"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            My App
          </Link>

          {/* Links */}
          <div className="flex gap-4 items-center">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg hover:bg-purple-600 transition text-white"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-white text-purple-700 hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
