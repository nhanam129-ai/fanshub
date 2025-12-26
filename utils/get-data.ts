// utils/get-data.ts

// 1. Import trực tiếp file JSON
// Lưu ý: Dấu .. nghĩa là thoát ra khỏi thư mục utils để về gốc, rồi vào thư mục data
import slugsData from '../data/slugs.json';

export interface SlugData {
  slug: string;
  title: string;
  description: string;
  destination: string;
}

export async function getSlugData(slug: string): Promise<SlugData | null> {
  try {
    // 2. Ép kiểu dữ liệu cho an toàn
    const data = slugsData as SlugData[];

    // 3. Tìm slug (so sánh không phân biệt hoa thường cho chắc ăn)
    const found = data.find((item) => item.slug.toLowerCase() === slug.toLowerCase());

    if (!found) {
      console.error(`❌ Không tìm thấy slug: ${slug}`);
      return null;
    }

    return found;
  } catch (error) {
    console.error("❌ Lỗi xử lý data:", error);
    return null;
  }
}