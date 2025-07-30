import prisma from "@/lib";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { slug } = await req.json();

  if (!slug) {
    return NextResponse.json(
      { errors: "Cannot find the slug" },
      { status: 404 }
    );
  }
  const topicPosts = await prisma.topic.findUnique({
    where: { slug },
    include: {
      posts: {
        include: {
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
      },
    },
  });
  if (!topicPosts) {
    return NextResponse.json(
      { errors: "Cannot find the Posts related to that Topic" },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      topicPosts,
    },
    { status: 200 }
  );
}
