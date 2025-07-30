'use server'
import prisma from "@/lib";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const PostCreateSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters long"),
  slug: z.string().min(1, "Slug is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = PostCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { title, description, slug } = parsed.data;

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ errors: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const topic = await prisma.topic.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    const createPost = await prisma.post.create({
      data: {
        title,
        content: description,
        userId: user.id,
        topicId: topic.id,
      },
    });
    revalidatePath(`/topics/${slug}`)
    // redirect(`/topics/${slug}/posts/${createPost.id}`)

    return NextResponse.json({
      createPost,
      success: true,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
