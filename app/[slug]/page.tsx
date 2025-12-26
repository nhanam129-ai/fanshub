import RedirectClient from '@/components/RedirectClient';
import { notFound } from 'next/navigation';

// 1. ÉP BUỘC STATIC: Nếu dòng này chạy, Log bắt buộc phải hiện ●
export const dynamicParams = false; 

// 2. GIẢ LẬP DỮ LIỆU (Không đọc file nữa để test)
// Chúng ta tạo giả 1 slug tên là "test-thu-cong"
export async function generateStaticParams() {
  console.log("🚀 ĐANG CHẠY CODE MỚI NHẤT: TẠO SLUG THỦ CÔNG 🚀");
  
  return [
    { slug: 'test-thu-cong' }
  ];
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Nếu vào đúng link test thì redirect về Google
  if (slug === 'test-thu-cong') {
    return (
      <>
        <meta httpEquiv="refresh" content="0;url=https://google.com" />
        <RedirectClient destination="https://google.com" />
      </>
    );
  }

  // Còn lại 404
  return notFound();
}