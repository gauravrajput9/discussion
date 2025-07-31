import prisma from "@/lib";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    try {
        const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, name: true, image: true },
        });
    
        if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}