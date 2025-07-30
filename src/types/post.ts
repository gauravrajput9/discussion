// src/types/post.ts
export type PostType = {
  id: string;
  title: string;
  content: string;
  topic: { slug: string };
  user: { id: string; name: string; email: string; image: string | null };
  comments: {
    id: string;
    content: string;
    user: { id: string; name: string; email: string; image: string | null };
  }[];
};
