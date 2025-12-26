import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Dán link Affiliate trang chủ của bạn vào đây
const HOME_AFFILIATE_LINK = 'https://t.crjmpx.com/322477/3785/0?bo=2753,2754,2755,2756&target=domainredirects&po=6456&aff_sub5=SF_006OG000004lmDN';

export function middleware(request: NextRequest) {
  // Chỉ bắt sự kiện khi user vào đúng trang chủ (/)
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(HOME_AFFILIATE_LINK, {
      status: 307, // 307 = Temporary Redirect (Redirect tạm thời, không lưu cache cứng)
    });
  }
}

// Cấu hình để Middleware chỉ chạy trên các path cần thiết (tối ưu hiệu năng)
export const config = {
  matcher: '/',
};