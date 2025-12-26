import fs from 'fs';
import path from 'path';

// Định nghĩa khuôn mẫu dữ liệu (Interface)
export interface SlugData {
  slug: string;
  title: string;
  description: string;
  destination: string;
}

export async function getSlugData(slug: string): Promise<SlugData | null> {
  // Đường dẫn file json (đảm bảo file slugs.json đã được script Python tạo ra)
  const filePath = path.join(process.cwd(), 'data/slugs.json');
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data: SlugData[] = JSON.parse(fileContent);
    
    // Tìm item có slug khớp
    const found = data.find((item) => item.slug === slug);
    return found || null;
  } catch (error) {
    console.error("Lỗi đọc file data:", error);
    return null;
  }
}