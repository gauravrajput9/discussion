import prisma from "@/lib";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { comment, slug, postId } = await req.json();
  console.log(comment, slug, postId);

  if (!comment || !slug || !postId) {
    return NextResponse.json(
      {
        errors: "Cannot get enough data to create comment",
        success: false,
      },
      { status: 400 }
    );
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  if (!post) {
    return NextResponse.json(
      {
        errors: "Cannot find the post",
        success: false,
      },
      { status: 404 }
    );
  }

  const topic = await prisma.topic.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!topic) {
    return NextResponse.json(
      {
        errors: "Cannot find the topic",
        success: false,
      },
      { status: 404 }
    );
  }

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json(
      {
        errors: "Cannot find the user to create the comment",
        success: false,
      },
      { status: 404 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email,
    },
  });
  if (!user) {
    return NextResponse.json(
      { errors: "Missing user id", success: false },
      { status: 400 }
    );
  }

  const createComment = await prisma.comment.create({
    data: {
      userId: user?.id,
      postId: post.id,
      content: comment,
    },
  });

  if (!createComment) {
    return NextResponse.json(
      {
        errors: "Cannot create comment",
        success: false,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    createComment,
    success: true,
  });
}
