"use client";

import AuthPrompt from "@/components/AuthPrompt";
import HeroSection from "@/components/HeroSection";
import DisplayPostsList from "@/components/post-list";
import TopicCreateForm from "@/components/TopicCreateFrom";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PostType } from "@/types/post";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchTopPosts = async () => {
    try {
      const res = await fetch("/api/get-posts-without-slug");
      if (!res.ok) throw new Error("Unable to fetch posts");
      const data = await res.json();
      setPosts(data.topPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchTopPosts();
  }, [status]);

  return (
    <div className="pt-20 text-center px-6 md:px-16 lg:px-24">
      {/* Hero Section */}
      <HeroSection />

      {/* Topic Creation Section */}
      {session ? (
        <div className="mt-16 mx-auto max-w-3xl p-10 rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-800 shadow-xl border border-purple-500 flex flex-col items-center gap-6">
          <h1 className="text-3xl font-bold text-white">
            Let&#39;s Create a New Topic
          </h1>
          <p className="text-purple-200 text-base max-w-md">
            Start a discussion by adding a title and description for your topic
            below.
          </p>
          <TopicCreateForm />
        </div>
      ) : (
        <AuthPrompt />
      )}

      {/* Top Posts Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Top Discussions
        </h2>
        <DisplayPostsList posts={posts} />
      </div>
    </div>
  );
}
