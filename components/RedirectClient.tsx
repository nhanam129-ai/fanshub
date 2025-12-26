'use client'; // BẮT BUỘC CÓ DÒNG NÀY

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  destination: string;
}

export default function RedirectClient({ destination }: Props) {
  const router = useRouter();

  useEffect(() => {
    // Dùng window.location.href để chuyển hướng dứt khoát (tốt cho Affiliate)
    if (destination) {
      window.location.href = destination;
    }
  }, [destination]);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <p>Đang chuyển hướng tới Shopee...</p>
    </div>
  );
}