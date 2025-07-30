import prisma from "@/lib";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const { title, description } = await req.json();
  const session = await getServerSession(authOptions);

 
  if (!session|| !session.user|| !session?.user?.email) {
    return NextResponse.json({ errors: "User not login" }, { status: 400 });
  }

  if (!title) return NextResponse.json({ field: "title", message: "Title is required" }, { status: 400 });
  if (!description) return NextResponse.json({ field: "description", message: "Description is required" }, { status: 400 });

  
  const slug = title.trim().toLowerCase().replace(/\s+/g, "-");

  
  const existingTopic = await prisma.topic.findUnique({ where: { slug } });
  if (existingTopic) {
    return NextResponse.json(
      { field: "overall", slug: existingTopic.slug, message: "The Discussion on this Topic Already Exist" },
      { status: 400 }
    );
  }

 
  console.log(session.user.email)
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ errors: "User not found" }, { status: 404 });


  const createTopic = await prisma.topic.create({
    data: {
      description,
      slug,
      userId: user.id,
    },
  });

  revalidatePath("/");

  return NextResponse.json({ createTopic });
}
