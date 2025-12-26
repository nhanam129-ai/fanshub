'use client';

import { useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // Không cần dùng hook này nếu dùng window.location

interface Props {
  destination: string;
}

export default function RedirectClient({ destination }: Props) {
  useEffect(() => {
    // Timeout 0 để trình duyệt render xong HTML (cho Bot) rồi mới redirect
    const timer = setTimeout(() => {
      window.location.href = destination;
    }, 0);

    return () => clearTimeout(timer);
  }, [destination]);

  // Trả về null để không vẽ gì lên màn hình user
  return null; 
}