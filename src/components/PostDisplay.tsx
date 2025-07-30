import prisma from "@/lib";
import { notFound } from "next/navigation";
import React from "react";

type PostDisplayProps = {
  postId: string;
  slug: string;
};

const PostDisplayPageThroughReceived: React.FC<PostDisplayProps> = async ({
  postId,
}) => {
  const post = await prisma.post.findFirst({
    where: { id: postId },
  });

  if (!post) return notFound();

  return (
    <>
      <h1 className="text-3xl font-bold font-serif text-white mb-6">
        POST: {post.title}
      </h1>
      <p className="text-xl font-serif text-white/90 leading-relaxed">
        DESCRIPTION: <span className="ml-3">{post.content}</span>
      </p>
    </>
  );
};

export default PostDisplayPageThroughReceived;
