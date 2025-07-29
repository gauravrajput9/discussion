"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

type AddCommentPropType = {
  slug: string;
  postId: string;
};

const AddCommentForm: React.FC<AddCommentPropType> = ({ slug, postId }) => {
//   console.log(slug, postId);
  const [comment, setComment] = React.useState<string>("");
//   const [createComment, setCreateComment] = useState("")

  const handleCommentCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/save-comment", {
        method: "POST",
        body: JSON.stringify({ comment, slug, postId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Cannot create post");
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setComment("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-md"
    >
      <form onSubmit={handleCommentCreation} className="space-y-4">
        <Textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-400"
        />
        <Button
          type="submit"
          variant="default"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
        >
          Save Comment
        </Button>
      </form>
    </motion.div>
  );
};

export default AddCommentForm;
