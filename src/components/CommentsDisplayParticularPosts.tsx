"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CommentType = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  parentId: string | null;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
};

const CommentsDisplayParticularPosts = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/auth/fetch-post-comments", {
        method: "POST",
        body: JSON.stringify({ postId }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Cannot fetch comments");
      const data = await res.json();
      setComments(data.comments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  // Format date to something like "July 29, 2025"
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold text-white mb-4">Comments</h2>

      {/* Loading State */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="animate-pulse bg-white/10 h-16 rounded-xl"
            ></div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        comments.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow flex gap-4 items-start"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              {c.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.user.image}
                  alt={c.user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                c.user.name.charAt(0).toUpperCase()
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{c.user.name}</span>
                <span className="text-xs text-gray-400">
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <p className="text-white/90 mt-1">{c.content}</p>
              {c.updatedAt !== c.createdAt && (
                <span className="text-xs text-gray-400 italic">(Edited)</span>
              )}
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-white/70">No comments yet. Be the first!</p>
      )}
    </motion.div>
  );
};

export default CommentsDisplayParticularPosts;
