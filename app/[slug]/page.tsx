import RedirectClient from '@/components/RedirectClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

// 1. Khóa chặt: Chỉ chạy Static
export const dynamicParams = false; 

// Định nghĩa kiểu dữ liệu
interface SlugItem {
  slug: string;
  title: string;
  description: string;
  destination: string;
}

// Hàm trợ giúp: Đọc data trực tiếp từ file (Chắc chắn 100% lấy được)
function getDataFromFile(): SlugItem[] {
  try {
    // Đường dẫn: Root -> data -> slugs.json
    const filePath = path.join(process.cwd(), 'data', 'slugs.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error("❌ LỖI ĐỌC FILE TRONG LÚC BUILD:", error);
    return [];
  }
}

// 2. Tạo danh sách trang tĩnh (SSG)
export async function generateStaticParams() {
  const allData = getDataFromFile();
  
  // LOG QUAN TRỌNG: Để bạn nhìn thấy trong Vercel Log
  console.log(`🔥 TÌM THẤY ${allData.length} SLUGS ĐỂ BUILD 🔥`);

  return allData.map((item) => ({
    slug: item.slug,
  }));
}

// 3. Metadata SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const allData = getDataFromFile();
  // Tìm slug (so sánh thường để chắc ăn)
  const data = allData.find(item => item.slug.toLowerCase() === slug.toLowerCase());

  if (!data) return { title: 'Not Found' };

  return {
    title: data.title,
    description: data.description,
  };
}

// 4. Render trang
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const allData = getDataFromFile();
  const data = allData.find(item => item.slug.toLowerCase() === slug.toLowerCase());

  if (!data) {
    return notFound();
  }

  return (
    <>
      {/* Meta refresh để redirect siêu tốc */}
      <meta httpEquiv="refresh" content={`0;url=${data.destination}`} />
      
      {/* Client Component */}
      <RedirectClient destination={data.destination} />
      
      {/* Nội dung ẩn cho SEO */}
      <div style={{ display: 'none' }}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
    </>
  );
}