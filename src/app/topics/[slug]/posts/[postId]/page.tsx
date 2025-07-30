import AddCommentForm from "@/components/AddCommentForm";
import CommentsDisplayParticularPosts from "@/components/CommentsDisplayParticularPosts";
import GoBackButton from "@/components/GoBackToSlug";
import PostDisplayPageThroughReceived from "@/components/PostDisplay";
import prisma from "@/lib";

export default async function PostDisplayPage({
  params,
}: {
  params: Promise<{ postId: string; slug: string }>;
}) {
  const { postId, slug } = await params;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      comments: {
        include: { user: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!post) {
    return <div className="text-center text-white mt-20">Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 pt-24 px-6">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <PostDisplayPageThroughReceived postId={postId} slug={slug} />
      </div>

      <div className="max-w-3xl mx-auto text-center mb-16">
        <GoBackButton slug={slug} />
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <AddCommentForm postId={postId} slug={slug} />
      </div>

      <div className="max-w-2xl mx-auto mb-4">
        <CommentsDisplayParticularPosts
          comments={post.comments.map((comment) => ({
            ...comment,
            createdAt: comment.createdAt.toISOString(),
            updatedAt: comment.updatedAt.toISOString(),
            user: {
              ...comment.user,
              name: comment.user.name ?? "Anonymous", // fallback
            },
          }))}
        />
      </div>
    </div>
  );
}
