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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RedirectToSlug from "./RedirectToSlug"; // popover component

const TopicCreateForm = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const [showPopover, setShowPopover] = useState(false);
  const [duplicateSlug, setDuplicateSlug] = useState("");

  const router = useRouter();

  const validateFields = () => {
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateTopic = async () => {
    if (!validateFields()) return;

    const res = await fetch("/api/auth/new-topic", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data;
    try {
      data = await res.json();
    } catch {
      alert("Unexpected server response");
      return;
    }
    console.log(data);

    if (!res.ok) {
      if (data.field === "overall" && data.slug) {
        setDuplicateSlug(data.slug);
        setShowPopover(true);
        return;
      }
      if (data.field) {
        setErrors({ [data.field]: data.message });
      } else {
        alert(data.message || "Failed to create topic");
      }
      return;
    }

    router.push(`/topics/${data.createTopic?.slug}`);
    setDialogOpen(false);
    setTitle("");
    setDescription("");
    setErrors({});
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 shadow-lg"
            onClick={() => setDialogOpen(true)}
          >
            New Topic
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-700 to-indigo-800 text-white shadow-2xl border border-purple-400 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Create a New Topic
            </DialogTitle>
            <DialogDescription className="text-purple-200">
              Start a discussion by providing a title and description for your
              topic.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Title
              </label>
              <Input
                className={`bg-purple-900 text-white placeholder-purple-400 border ${
                  errors.title ? "border-red-500" : "border-purple-500"
                } focus:ring-purple-300 focus:border-purple-300`}
                placeholder="Enter topic title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title)
                    setErrors((prev) => ({ ...prev, title: undefined }));
                }}
              />
              {errors.title && (
                <p className="text-red-400 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Description
              </label>
              <Textarea
                className={`bg-purple-900 text-white placeholder-purple-400 border ${
                  errors.description ? "border-red-500" : "border-purple-500"
                } focus:ring-purple-300 focus:border-purple-300`}
                placeholder="Enter topic description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description)
                    setErrors((prev) => ({ ...prev, description: undefined }));
                }}
              />
              {errors.description && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant="outline"
                className="border-purple-400 text-purple-300 hover:bg-purple-800"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setErrors({});
                }}
              >
                Clear
              </Button>
              <Button
                className="bg-purple-500 hover:bg-purple-600 text-white"
                onClick={handleCreateTopic}
              >
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <RedirectToSlug
        slug={duplicateSlug}
        open={showPopover}
        onClose={() => setShowPopover(false)}
        closeDialog={() => setDialogOpen(false)}
      />
    </>
  );
};

export default TopicCreateForm;
