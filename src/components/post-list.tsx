import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type PostType = {
  id: number;
  title: string;
  content: string;
  topic: {
    slug: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
    image?: string | null;
  };
  comments: {
    id: number;
    content: string;
    user: {
      id: number;
      name: string;
      email: string;
      image?: string | null;
    };
  }[];
};

type DisplayPostsListProps = {
  posts: PostType[];
  slug: string;
};

const DisplayPostsList = ({ posts, slug }: DisplayPostsListProps) => {
  const router = useRouter();

  console.log(posts)

  return (
    <div>
      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border border-purple-300 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Title */}
              <h3 className="text-2xl font-bold">{post.title}</h3>

              {/* Content */}
              <p className="mt-3 text-white/90 leading-relaxed">
                {post.content.length > 150
                  ? `${post.content.slice(0, 150)}...`
                  : post.content}
              </p>

              {/* View Post Button - aligned right */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() =>
                    router.push(`/topics/${post?.topic?.slug}/posts/${post.id}`)
                  }
                  className="bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-lg transition"
                >
                  View Post
                </button>
              </div>

              {/* Footer: user + comments */}
              <div className="mt-5 flex items-center justify-between text-sm">
                {/* User info */}
                <div className="flex items-center gap-3">
                  {post.user.image ? (
                    <Image
                      src={post.user.image}
                      alt={post.user.name}
                      width={32}
                      height={32}
                      className="rounded-full border border-gray-200 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white font-semibold">
                      {post.user.name.charAt(0)}
                    </div>
                  )}
                  <span className="font-medium">{post.user.name}</span>
                </div>

                {/* Comments count */}
                <span className="text-white/80 bg-white/20 px-3 py-1 rounded-full text-xs">
                  {post.comments.length} comments
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-400 text-center">
          No posts yet. Be the first to create one!
        </p>
      )}
    </div>
  );
};

export default DisplayPostsList;
