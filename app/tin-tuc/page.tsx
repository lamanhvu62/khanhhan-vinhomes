import { PostCard } from '@/components/post-card';
import prisma from '@/lib/prisma';

export const revalidate = 60;

export const metadata = {
    title: "Tin Tức & Kinh Nghiệm BĐS | VinhomesPro"
};

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { publishedAt: 'desc' }
    });

    return (
        <div className="min-h-screen bg-[#F5F5F5] pb-24">
            <div className="bg-[#2F2F2F] text-white py-24 md:py-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#E9C46A] rounded-full blur-[150px] opacity-10"></div>
                <div className="container max-w-[1200px] px-4 mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Cẩm Nang Đầu Tư BĐS</h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Nắm bắt những phân tích sắc bén, chính sách đột phá và phong thủy nhà ở chuẩn xác nhất dành cho tương lai.
                    </p>
                </div>
            </div>

            <div className="container max-w-[1200px] px-4 mx-auto mt-16 md:mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                    {posts.length === 0 && (
                        <div className="col-span-full py-20 text-center text-[#6B7280] bg-white rounded-3xl border border-[#E7E7E7] shadow-sm">
                            <div className="text-xl font-bold text-[#2F2F2F]">Đang cập nhật bài viết.</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
