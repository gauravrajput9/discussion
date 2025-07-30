import prisma from "@/lib";
import Link from "next/link";
import React from "react";

const EachTopicDisplay = async () => {
  // Fetch only 20 latest posts
  const posts = await prisma.post.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
    },
  });

  return (
    <div className="mt-24 max-w-6xl mx-auto px-6">
      <h1 className="text-4xl font-extrabold text-white mb-6">
        Latest Posts
      </h1>
      <p className="text-gray-300 mb-10">
        Browse through the latest 20 posts in this topic.
      </p>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/topics/${post.topic.slug}/posts/${post.id}`}
            className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-5 shadow hover:shadow-lg hover:scale-[1.02] transition flex flex-col"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold text-white mb-2 line-clamp-1">
              {post.title}
            </h2>

            {/* Content Preview */}
            <p className="text-sm text-gray-200 line-clamp-2 mb-4">
              {post.content || "No description provided"}
            </p>

            {/* Footer with Author + Date */}
            <div className="flex justify-between items-center text-xs text-gray-300 mt-auto">
              <span>By {post.user.name}</span>
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EachTopicDisplay;
