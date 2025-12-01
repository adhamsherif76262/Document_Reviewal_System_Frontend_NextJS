// // middleware.ts
// import { NextRequest, NextResponse } from 'next/server';

// const PUBLIC_FILE = /\.(.*)$/;
// const SUPPORTED_LOCALES = ['en', 'ar'];
// const DEFAULT_LOCALE = 'en';

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Skip internal/public files or already localized routes
//   if (
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/api') ||
//     PUBLIC_FILE.test(pathname) ||
//     SUPPORTED_LOCALES.some((locale) => pathname.startsWith(`/${locale}`))
//   ) {
//     return NextResponse.next();
//   }

//   // Detect language
//   const langHeader = request.headers.get('accept-language');
//   const preferredLang = langHeader?.split(',')?.[0]?.split('-')[0] || DEFAULT_LOCALE;

//   const locale = SUPPORTED_LOCALES.includes(preferredLang) ? preferredLang : DEFAULT_LOCALE;

//   const url = request.nextUrl.clone();
//   url.pathname = `/${locale}${pathname}`;

//   return NextResponse.redirect(url);
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all routes except:
//      * - API routes
//      * - Static files
//      * - Next.js internal files
//      */
//     '/((?!_next|api|.*\\..*).*)',
//   ],
// };


import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("Middleware RUN:", pathname);

  // Ignore Next.js internals & files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  // If pathname already starts with locale → continue normally
  const locales = ["en", "ar"];
  const hasLocale = locales.some((loc) => pathname.startsWith(`/${loc}`));
  if (hasLocale) return NextResponse.next();

  // Detect browser language
  const langHeader = request.headers.get("accept-language");
  const preferred = langHeader?.split(",")?.[0]?.split("-")[0] || "en";
  const locale = locales.includes(preferred) ? preferred : "en";

  // Redirect / → /en or /ar
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

