import Image from 'next/image';
import { notFound } from 'next/navigation';
import { formatDateVN } from '@/lib/format';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ChevronLeft, Calendar, UserRound } from 'lucide-react';
import RenderHtml from '@/components/render-html';

export const revalidate = 60;

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug }
    });

    if (!post) return notFound();

    return (
        <div className="min-h-screen bg-[#F5F5F5] pb-24">
            <div className="container max-w-[900px] mx-auto px-4 py-8 md:py-16">
                <Link href="/tin-tuc" className="inline-flex items-center text-[#6B7280] hover:text-[#E9C46A] transition-colors font-bold mb-8 uppercase tracking-wider text-xs bg-white px-4 py-2 rounded-full shadow-sm border border-[#E7E7E7]">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Trở lại danh mục
                </Link>

                <article className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E7E7E7] overflow-hidden">
                    {post.coverImage && (
                        <div className="relative h-[300px] md:h-[500px] w-full bg-[#E7E7E7]">
                            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
                        </div>
                    )}
                    <div className="p-8 md:p-14 lg:p-16">
                        <div className="flex flex-wrap items-center gap-6 text-[#6B7280] mb-8 font-semibold text-sm">
                            <div className="flex items-center gap-2 bg-[#F5F5F5] px-3 py-1.5 rounded-lg text-[#E9C46A]">
                                <Calendar className="w-4 h-4" />
                                {formatDateVN(post.publishedAt)}
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5">
                                <UserRound className="w-4 h-4" />
                                Tác giả: Vinhomes Pro Specialist
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-snug text-[#2F2F2F] tracking-tight">{post.title}</h1>

                        {post.excerpt && (
                            <div className="text-lg md:text-xl text-[#2F2F2F] mb-12 font-medium leading-relaxed border-l-4 border-[#E9C46A] pl-6 py-4 bg-[#FAF3DD]/30 rounded-r-2xl">
                                {post.excerpt}
                            </div>
                        )}

                        <RenderHtml 
                            className="prose prose-sm md:prose-base max-w-none prose-slate whitespace-pre-wrap leading-relaxed text-[#6B7280]"
                            content={post.content || ''}
                        />

                        <div className="mt-16 pt-8 border-t border-[#E7E7E7] flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full mb-4 flex items-center justify-center border border-[#E7E7E7]">
                                <span className="text-[#E9C46A] font-bold text-xl">VP</span>
                            </div>
                            <h4 className="font-bold text-[#2F2F2F] text-lg">Vinhomes Pro</h4>
                            <p className="text-[#6B7280] text-sm max-w-sm mt-2">Kênh cung cấp tri thức chuyên sâu và giải pháp giao dịch bất động sản an toàn cho mọi gia đình Việt.</p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
