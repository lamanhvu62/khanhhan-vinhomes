"use client";

import DOMPurify from 'dompurify';

export default function RenderHtml({ content, className }: { content: string; className?: string }) {
  let cleanHTML = content;
  
  // Chỉ chạy DOMPurify trên Client để tránh lỗi window is not defined lúc SSR
  if (typeof window !== "undefined") {
    cleanHTML = DOMPurify.sanitize(content);
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
      suppressHydrationWarning
    />
  );
}
