import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { formatDateVN } from '@/lib/format';
import { Post } from '@prisma/client';
import { Calendar } from 'lucide-react';

export function PostCard({ post }: { post: Post }) {
    return (
        <Link href={`/tin-tuc/${post.slug}`}>
            <Card className="overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-[#E7E7E7] bg-white rounded-2xl cursor-pointer h-full flex flex-col">
                <div className="relative h-[220px] overflow-hidden bg-[#F5F5F5]">
                    {post.coverImage ? (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#6B7280]">Không có ảnh</div>
                    )}
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-3 font-semibold uppercase tracking-wider">
                        <Calendar className="w-4 h-4 text-[#E9C46A]" />
                        {formatDateVN(post.publishedAt)}
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-[#2F2F2F] group-hover:text-[#E9C46A] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] line-clamp-3 leading-relaxed mb-6 flex-1">{post.excerpt}</p>
                    <div className="mt-auto border-t border-[#E7E7E7] pt-4">
                        <span className="text-sm font-bold text-[#E9C46A] flex items-center">
                            Đọc tiếp <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
