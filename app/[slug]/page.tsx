import { getSlugData, getAllSlugs } from '@/utils/get-data';
import RedirectClient from '@/components/RedirectClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// 1. DÒNG NÀY ÉP BUỘC CHUYỂN SANG STATIC (●)
// Nó bảo Vercel: "Chỉ build những slug tao khai báo, còn lại 404 hết. Cấm chạy dynamic!"
export const dynamicParams = false; 

interface PageProps {
  params: {
    slug: string;
  };
}

// 2. Tạo danh sách trang tĩnh từ file JSON
export async function generateStaticParams() {
  const allData = getAllSlugs();
  return allData.map((item) => ({
    slug: item.slug,
  }));
}

// 3. Metadata SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const data = getSlugData(slug);

  if (!data) return { title: 'Not Found' };

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
    },
  };
}

// 4. Render trang
export default function Page({ params }: PageProps) {
  const { slug } = params;
  const data = getSlugData(slug);

  if (!data) {
    return notFound();
  }

  return (
    <>
      {/* Meta refresh: Phương án dự phòng nếu JS bị chậm, giúp redirect cực nhanh */}
      <meta httpEquiv="refresh" content={`0;url=${data.destination}`} />
      
      {/* Component Client để xử lý logic chính */}
      <RedirectClient destination={data.destination} />
      
      {/* Nội dung ẩn cho SEO bot đọc */}
      <div style={{ display: 'none' }}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
    </>
  );
}