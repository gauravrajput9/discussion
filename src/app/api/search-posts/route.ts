import prisma from "@/lib";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: query || "" } },
          { content: { contains: query || "" } },
          { topic: { slug: { contains: query || "" } } },
        ],
      },
      include: {
        user: { select: { name: true, image: true } },
        topic: { select: { slug: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
