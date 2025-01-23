import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  
  const { username, url } = await req.json()

  if (username.length < 3) {
    return NextResponse.json({
      error: "Username must be at least 3 characters long"
    }, { status: 400 })
  }

  const secret = createRandomString(32);

  (await cookies()).set("session", secret, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    domain: process.env.NODE_ENV === "production" ? ".nhero.tech" : undefined
  });
  
  return NextResponse.json({
    success: true
  }, { status: 200})
}

function createRandomString(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
