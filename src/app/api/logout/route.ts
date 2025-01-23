import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username } = await req.json()

  if (!username) {
    return NextResponse.json({
      error: "User not logged in"
    }, { status: 400 })
  }

  (await cookies()).delete("session")
  
  return NextResponse.json({ success: true }, { status: 200 })
}
