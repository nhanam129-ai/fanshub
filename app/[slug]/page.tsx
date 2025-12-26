import { getSlugData } from '@/utils/get-data';
import RedirectClient from '@/components/RedirectClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Định nghĩa kiểu cho tham số đầu vào của Page
interface PageProps {
  params: {
    slug: string;
  };
}

// 1. Cấu hình Metadata (SEO cho Bluesky/Tumblr)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await getSlugData(params.slug);

  if (!data) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: 'article', // Bluesky/Tumblr thích loại này
    },
    // Thêm Twitter Card cho chắc chắn (Bluesky dùng chung chuẩn này)
    twitter: {
      card: 'summary',
      title: data.title,
      description: data.description,
    }
  };
}

// 2. Nội dung hiển thị chính
export default async function Page({ params }: PageProps) {
  const data = await getSlugData(params.slug);

  if (!data) {
    return notFound();
  }

  return (
    <>
      {/* Nội dung ẩn để Bot scan text (dùng style inline thay vì class để gọn code) */}
      <div style={{ display: 'none', visibility: 'hidden' }}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>

      {/* Component thực hiện redirect ngay lập tức */}
      <RedirectClient destination={data.destination} />
    </>
  );
}