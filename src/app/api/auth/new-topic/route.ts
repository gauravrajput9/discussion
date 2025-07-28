import prisma from "@/lib";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { title, description } = await req.json();

  const existingTitle = await prisma.topic.findUnique({
    where: {
      slug: title,
    },
  });

  if (existingTitle) {
    return NextResponse.json(
      {
        field: "overall",
        slug: existingTitle.slug,
        message: "The Discussion on this Topic Already Exist",
      },
      { status: 400 }
    );
  }

  if (!title) {
    return NextResponse.json(
      { field: "title", message: "Title is required" },
      { status: 400 }
    );
  }
  if (!description) {
    return NextResponse.json(
      { field: "description", message: "Description is required" },
      { status: 400 }
    );
  }

  const createTopic = await prisma.topic.create({
    data: {
      description: description,
      slug: title,
    },
  });

  if (!createTopic) {
    return NextResponse.json({
      message: "Unable to create the Topic",
      success: false,
    });
  }
  revalidatePath("/");

  return NextResponse.json({
    createTopic,
  });
}
