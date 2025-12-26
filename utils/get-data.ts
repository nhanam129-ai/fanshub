import slugsData from '../data/slugs.json'; // Import trực tiếp để Vercel đóng gói data

export interface SlugData {
  slug: string;
  title: string;
  description: string;
  destination: string;
}

// Hàm lấy toàn bộ data (Dùng để tạo trang tĩnh)
export function getAllSlugs(): SlugData[] {
  return slugsData as SlugData[];
}

// Hàm lấy 1 data theo slug
export function getSlugData(slug: string): SlugData | null {
  const data = slugsData as SlugData[];
  
  if (!slug) return null;

  // Chuẩn hóa slug đầu vào: giải mã URL, về chữ thường
  const normalizedInput = decodeURIComponent(slug).toLowerCase();

  return data.find((item) => {
    // Chuẩn hóa slug trong data để so sánh
    const normalizedItemSlug = decodeURIComponent(item.slug).toLowerCase();
    return normalizedItemSlug === normalizedInput;
  }) || null;
}