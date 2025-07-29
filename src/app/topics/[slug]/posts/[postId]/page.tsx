import AddCommentForm from "@/components/AddCommentForm";
import CommentsDisplayParticularPosts from "@/components/CommentsDisplayParticularPosts";
import PostDisplayPageThroughReceived from "@/components/PostDisplay";
import GoBackButton from "@/components/GoBackToSlug";
import React from "react";

export type PostDisplayProps = { postId: string; slug: string };

const PostDisplayPage: React.FC<PostDisplayProps> = async ({ params }) => {
  const { postId, slug } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 pt-24 px-6">
      {/* Post Hero */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <PostDisplayPageThroughReceived postId={postId} slug={slug} />
      </div>

      {/* Go Back Button */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <GoBackButton slug={slug} />
      </div>

      {/* Comment Form */}
      <div className="max-w-2xl mx-auto mb-12">
        <AddCommentForm postId={postId} slug={slug} />
      </div>

      {/* Comments List */}
      <div className="max-w-2xl mx-auto mb-4 ">
        <CommentsDisplayParticularPosts postId = {postId} />
      </div>
    </div>
  );
};

export default PostDisplayPage;
