import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const PUBLIC_PATHS = ['/login', '/signup', '/api'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ 1. Allow public files & paths
  if (PUBLIC_FILE.test(pathname) || PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // ✅ 2. Check for cookie token
  const token = req.cookies.get('token')?.value;

  // ❌ 3. If no token → redirect to login
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // ✅ 4. If token found → allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
