"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const AuthPrompt = () => {
  return (
    <div className="bg-purple-700 mt-8 py-12 px-6 md:px-12 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Already have an account?
      </h2>
      <p className="text-gray-900 mb-6">
        Sign in to continue your discussions or create a new account if you’re
        new here.
      </p>

      {/* Sign In and Sign Up Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <Link
          href="/login"
          className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="px-6 py-3 rounded-lg bg-gray-200 text-purple-700 hover:bg-gray-300 transition"
        >
          Sign Up
        </Link>
      </div>

      {/* OR Divider */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="h-px w-16 bg-gray-500"></span>
        <span className="text-gray-900 text-sm font-semibold">OR</span>
        <span className="h-px w-16 bg-gray-500"></span>
      </div>

      {/* Social Logins */}
      <div className="flex flex-col gap-3 max-w-sm mx-auto">
        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-red-600 transition"
        >
          <Image
            src="/search.png"
            alt="Google"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
        <button
          onClick={() => signIn("github")}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
        >
          <Image
            src="/github.png"
            alt="GitHub"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default AuthPrompt;
