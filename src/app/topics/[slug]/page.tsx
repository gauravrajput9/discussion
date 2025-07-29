"use client";
import React, { useEffect, useState } from "react";
import PostCreateForm from "@/components/PostCreateFrom";
import { useParams } from "next/navigation";
import DisplayPostsList from "@/components/post-list";

interface TopicType {
  slug: string;
  description: string;
}

interface PostType {
  id: string;
  title: string;
  content: string;
}

const TopicShowPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [topic, setTopic] = useState<TopicType | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);

  const getPostsData = async () => {
    try {
      const res = await fetch(`/api/auth/get-posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();

      setTopic(
        data?.topicPosts.slug
          ? {
              slug: data.topicPosts.slug,
              description: data.topicPosts.description,
            }
          : null
      );
      setPosts(data?.topicPosts.posts || []);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (slug) {
      getPostsData();
    }
  }, [slug]);

  return (
    <div className="flex flex-col mt-10 min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      {/* Main Content */}
      <main className="flex-grow p-8">
        <div className="max-w-5xl mx-auto">
          {/* Topic Header */}
          <div className="bg-white/10 rounded-xl p-8 shadow-lg backdrop-blur-md mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">
                  {topic?.slug ?? "Loading..."}
                </h1>
                <p className="text-lg text-white/80">
                  {topic?.description ?? "Fetching topic details..."}
                </p>
              </div>

              {/* Pass refresh function */}
              <PostCreateForm slug={slug} refreshPosts={getPostsData} />
            </div>
          </div>

          {/* Posts Section */}
          <h2 className="text-3xl font-bold mb-4">Posts</h2>
          {/* <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white text-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-2xl font-semibold">{post.title}</h3>
                  <p className="mt-2 text-gray-700">{post.content}</p>
                </div>
              ))
            ) : (
              <p className="text-lg text-white/80">
                No posts yet. Be the first to create one!
              </p>
            )}
          </div> */}
          <DisplayPostsList posts ={posts} slug={slug} />
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-white/70">Discussion Hub © 2025</footer>
    </div>
  );
};

export default TopicShowPage;
