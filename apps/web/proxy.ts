import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Sesuai dengan konfigurasi Turbopack milikmu
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // LOGIKA BARU: Jika ada yang mengakses root (/) atau nyasar ke rute lama (/dashboard)
  // Langsung arahkan mereka ke pintu gerbang utama kita yaitu /login
  if (pathname === '/' || pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Biarkan halaman lain (seperti /admin, /employee, /login) lewat dengan aman
  return NextResponse.next();
}

export const config = {
  // Satpam ini berjaga di root dan seluruh rute dashboard lama
  matcher: ['/', '/dashboard/:path*'],
};