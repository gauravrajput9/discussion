"use client";

import AuthPrompt from "@/components/AuthPrompt";
import HeroSection from "@/components/HeroSection";
import TopicCreateForm from "@/components/TopicCreateFrom";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="pt-16 text-center">
      {/* Hero Section */}
      <HeroSection />

      {session ? (
        <div
          className="mt-12 mx-auto max-w-2xl p-8 rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-800 shadow-xl border border-purple-500 flex flex-col items-center gap-6"
        >
          <h1 className="text-3xl font-bold text-white">
            Let&#39;s Create a New Topic
          </h1>
          <p className="text-purple-200 text-base max-w-md">
            Start a discussion by adding a title and description for your topic below.
          </p>

          {/* New Topic Button / Dialog */}
          <TopicCreateForm />
        </div>
      ) : (
        <AuthPrompt />
      )}
    </div>
  );
}
