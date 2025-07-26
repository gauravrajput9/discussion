"use client";

import { useState } from "react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signupApi", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error);
    } else {
      setMessage("Signup successful. Check your email for verification link.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 animate-gradient">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-transform duration-300 hover:scale-105">
        {/* Title */}
        <h1 className="text-3xl font-extrabold mb-6 text-center text-purple-700">
          Create Your Account
        </h1>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-1 text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              className="border rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              type="text"
              placeholder="Enter a unique username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              className="border rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              className="border rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              type="password"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Sign Up
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-center text-sm mt-2 ${
                message.includes("successful")
                  ? "text-green-600 animate-pulse"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;
