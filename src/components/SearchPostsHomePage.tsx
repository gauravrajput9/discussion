"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PostType } from "@/types/post";

export default function SearchPosts() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search-posts?q=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectPost = (slug: string, postId: string) => {
    router.push(`/topics/${slug}/posts/${postId}`);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-lg">
      <input
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-12 px-4 rounded-full bg-white/20 placeholder-gray-200 text-white text-base border border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30 transition"
      />

      {query && results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-14 w-full bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg p-2 space-y-2 border border-white/20 z-50"
        >
          {results.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleSelectPost(post.topic.slug, post.id)}
              className="p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition"
            >
              <h3 className="text-sm font-semibold text-white">{post.title}</h3>
              <p className="text-xs text-gray-200 truncate">
                {post.content || "No description"}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {query && loading && (
        <p className="absolute top-14 mt-2 text-sm text-gray-200">Searching...</p>
      )}
    </div>
  );
}
