import prisma from "@/lib";
import { NextResponse } from "next/server";

export async function GET() {
  const topPosts = await prisma.post.findMany({
    include: {
      topic: {
        select: {
          slug: true, // Include slug from related topic
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
    orderBy: {
      comments: {
        _count: "desc",
      },
    },
    take: 5,
  });

  return NextResponse.json(
    {
      topPosts,
    },
    {
      status: 200,
    }
  );
}
