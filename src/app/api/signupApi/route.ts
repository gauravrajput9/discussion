import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib";


export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name :username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Signup successful", user });
  } catch (error: unknown) {
    console.error("Signup Error Details:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
