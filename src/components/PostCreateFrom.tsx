"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface PostCreateFormProps {
  slug: string;
  refreshPosts: () => void;
}

const PostCreateForm: React.FC<PostCreateFormProps> = ({
  slug,
  refreshPosts,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const handleCreatePost = async () => {
    setErrors({});
    if (!title.trim() || !description.trim()) {
      if (!title.trim())
        setErrors((prev) => ({ ...prev, title: "Title is required" }));
      if (!description.trim())
        setErrors((prev) => ({
          ...prev,
          description: "Description is required",
        }));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/new-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, slug }),
      });

      const data = await res.json();
      console.log(data);

     
      if (!res.ok) {
        if (data.errors?.description) {
          setErrors((prev) => ({
            ...prev,
            description: data.errors.description[0],
          }));
        }
        if (data.errors?.title) {
          setErrors((prev) => ({ ...prev, title: data.errors.title[0] }));
        }

        return;
      }

      // Clear and close
      router.push(`/topics/${slug}/posts/${data.createPost.id}`);
      setTitle("");
      setDescription("");
      setOpen(false);
      refreshPosts();
    } catch (err) {
      console.error(err);
      alert("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-purple-700 hover:bg-purple-100 font-semibold">
          New Post
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-700 to-indigo-800 text-white rounded-2xl border border-purple-400 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Post
          </DialogTitle>
          <DialogDescription className="text-purple-200">
            Provide a title and description for your post.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Input
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`bg-purple-900 text-white placeholder-purple-400 border ${
              errors.title ? "border-red-500" : "border-purple-500"
            }`}
          />
          {errors.title && (
            <p className="text-red-400 text-sm">{errors.title}</p>
          )}

          <Textarea
            placeholder="Post description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`bg-purple-900 text-white placeholder-purple-400 border ${
              errors.description ? "border-red-500" : "border-purple-500"
            }`}
          />
          {errors.description && (
            <p className="text-red-400 text-sm">{errors.description}</p>
          )}

          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white"
            onClick={handleCreatePost}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostCreateForm;
