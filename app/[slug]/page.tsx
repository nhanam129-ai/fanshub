import { getSlugData, getAllSlugs } from '@/utils/get-data';
import RedirectClient from '@/components/RedirectClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

// 1. QUAN TRỌNG: Hàm này tạo sẵn các trang tĩnh (SSG) lúc Build
// Giúp loại bỏ hoàn toàn lỗi 404 do runtime không tìm thấy file
export async function generateStaticParams() {
  const allData = getAllSlugs();
  return allData.map((item) => ({
    slug: item.slug,
  }));
}

// 2. Metadata cho SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params; // Next.js 14+ không cần await params ở đây
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

// 3. Nội dung trang
export default function Page({ params }: PageProps) {
  const { slug } = params;
  const data = getSlugData(slug);

  // Nếu build static mà vẫn không khớp data thì 404
  if (!data) {
    return notFound();
  }

  return (
    <>
      <div style={{ display: 'none' }}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
      <RedirectClient destination={data.destination} />
    </>
  );
}