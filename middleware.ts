import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 使用 Neon 数据库，不需要 Supabase 中间件
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
