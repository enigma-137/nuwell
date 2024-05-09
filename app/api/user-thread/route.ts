import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
// import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorised" },
      { status: 401 }
    );
  }

  const userThread = await prismadb.userThread.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (userThread) {
    return NextResponse.json({ userThread, success: true }, { status: 200 });
  }
  //Create a new user thread

  try {
    const openai = new OpenAI();
    const thread = await openai.beta.threads.create();

    // Create and save it to database
    const newUserThread = await prismadb.userThread.create({
      data: {
        userId: user.id,
        threadId: thread.id,
      },
    });
    //   Return it
    return NextResponse.json(
      { userThread: newUserThread, success: true },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "Error creating User" },
      { status: 500 }
    );
  }
}
