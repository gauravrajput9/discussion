import prisma from "@/lib";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { slug } = await req.json();
  console.log(slug);

  const topic = await prisma.topic.findUnique({
    where: {
      slug,
    },
  });

  if (!topic) {
    return NextResponse.json(
      {
        errors: "Cannot find topic",
      },
      { status: 404 }
    );
  }
  return NextResponse.json(
    {
      topic,
    },
    {
      status: 200,
    }
  );
}
