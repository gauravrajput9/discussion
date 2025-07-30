'use server'
import prisma from "@/lib";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { errors: "Post ID not found" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        topic: true
      }
    });

    if (!post) {
      return NextResponse.json(
        { errors: "Cannot find the topic to redirect" },
        { status: 404 }
      );
    }

    const slug = post.topic.slug;

    const comments = await prisma.comment.findMany({
      where: { postId },
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
      orderBy: { createdAt: "desc" },
    });

    // **Convert dates to strings**
    const serializedComments = comments.map((comment) => ({
      ...comment,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      slug,
      comments: serializedComments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { errors: "Internal server error" },
      { status: 500 }
    );
  }
}
