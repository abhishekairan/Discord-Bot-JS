import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { discordLink } from './mcinfo';


export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (pathname == "/discord") {
    console.log(discordLink)
    return NextResponse.redirect(discordLink);
  }

  const session = (await cookies()).get("session")

  if (!session || !session.value) {
    const url = req.nextUrl.clone();
    url.pathname = req.nextUrl.pathname;
    const res = NextResponse.rewrite(url);
    res.headers.set('x-no-session', 'true');
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.ico|images).*)'],
};