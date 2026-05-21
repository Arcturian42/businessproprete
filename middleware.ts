import { NextResponse, type NextRequest } from 'next/server';

/**
 * URL normalisation: remove trailing slashes, lowercase, collapse double slashes.
 * Per docs/13-seo-technical-impl.md §"URL Normalization".
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let changed = false;

  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '');
    changed = true;
  }

  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase();
    changed = true;
  }

  if (url.pathname.includes('//')) {
    url.pathname = url.pathname.replace(/\/+/g, '/');
    changed = true;
  }

  if (changed) {
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
