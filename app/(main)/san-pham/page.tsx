import { UnitCard } from '@/components/unit-card';
import prisma from '@/lib/prisma';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Prisma } from '@prisma/client';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
    title: "Giỏ hàng Sản Phẩm | VinhomesPro",
    description: "Trình duyệt tìm kiếm toàn bộ kho hàng nhà và chung cư Vinhomes đang mở bán với thông tin chi tiết."
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const params = await searchParams;

    const keyword = params.keyword || '';
    const projectId = params.project || '';
    const priceRange = params.price || '';
    const unitType = params.type || '';
    const status = params.status || '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (keyword) {
        where.OR = [
            { title: { contains: keyword, mode: 'insensitive' } },
            { content: { contains: keyword, mode: 'insensitive' } },
            { building: { contains: keyword, mode: 'insensitive' } },
            { project: { title: { contains: keyword, mode: 'insensitive' } } }
        ];
    }
    if (projectId) {
        where.project = { slug: projectId };
    }
    if (unitType) {
        where.unitType = { contains: unitType, mode: 'insensitive' };
    }
    if (status) {
        where.status = status;
    }
    if (priceRange) {
        if (priceRange === 'under-2') {
            where.price = { lt: 2000000000 };
        } else if (priceRange === '2-5') {
            where.price = { gte: 2000000000, lte: 5000000000 };
        } else if (priceRange === 'above-5') {
            where.price = { gt: 5000000000 };
        }
    }

    const units = await prisma.unit.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { project: true }
    });

    return (
        <div className="min-h-screen bg-[#F5F5F5] pb-24">
            <div className="bg-[#2F2F2F] text-white py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2F2F2F]"></div>
                <div className="container max-w-[1200px] px-4 mx-auto relative z-10 text-center">
                    <div className="inline-block border border-[#E9C46A] text-[#E9C46A] font-bold tracking-widest uppercase mb-6 text-xs px-4 py-1.5 rounded-full backdrop-blur-sm bg-black/20">An Cư Bền Vững</div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Căn Hộ Đang Bán</h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Tiếp cận mức giá ưu đãi và chọn lọc những căn hộ, biệt thự có vị trí đẹp nhất.
                    </p>
                </div>
            </div>

            <div className="container max-w-[1200px] px-4 mx-auto mt-12">
                {/* PREMIUM FILTER TOOLBAR */}
                <form method="GET" action="/san-pham" className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#E7E7E7] mb-12 relative z-20 -mt-20">
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#E7E7E7]">
                        <div className="flex items-center gap-3">
                            <SlidersHorizontal className="w-5 h-5 text-[#E9C46A]" />
                            <h3 className="font-bold text-[#2F2F2F] text-lg uppercase tracking-wider">Đang tìm kiếm ...</h3>
                        </div>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <div>
                            <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2 block">Từ khóa</label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                                <Input name="keyword" defaultValue={keyword} placeholder="Nhập tên căn, vị trí..." className="pl-12 h-14 bg-[#F5F5F5] border-none rounded-xl focus-visible:ring-[#E9C46A] text-[#2F2F2F]" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2 block">Tên Dự án</label>
                            <select name="project" defaultValue={projectId} className="w-full h-14 bg-[#F5F5F5] border-none rounded-xl px-4 text-[#2F2F2F] outline-none focus-visible:ring-2 focus-visible:ring-[#E9C46A] appearance-none font-medium cursor-pointer">
                                <option value="">Tất cả các dự án</option>
                                <option value="vinhomes-grand-park">Vinhomes Grand Park</option>
                                <option value="vinhomes-ocean-park">Vinhomes Ocean Park</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2 block">Cấu trúc</label>
                            <select name="type" defaultValue={unitType} className="w-full h-14 bg-[#F5F5F5] border-none rounded-xl px-4 text-[#2F2F2F] outline-none focus-visible:ring-2 focus-visible:ring-[#E9C46A] appearance-none font-medium cursor-pointer">
                                <option value="">Bất kỳ</option>
                                <option value="Studio">Studio</option>
                                <option value="1PN">1 Phòng Ngủ</option>
                                <option value="2PN">2 Phòng Ngủ</option>
                                <option value="3PN">3 Phòng Ngủ</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2 block">Trạng thái</label>
                            <select name="status" defaultValue={status} className="w-full h-14 bg-[#F5F5F5] border-none rounded-xl px-4 text-[#2F2F2F] outline-none focus-visible:ring-2 focus-visible:ring-[#E9C46A] appearance-none font-medium cursor-pointer">
                                <option value="">Tất cả</option>
                                <option value="Available">Đang mở bán</option>
                                <option value="Reserved">Đã đặt chỗ</option>
                                <option value="Sold">Đã bán</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2 block">Khoảng Mức giá</label>
                            <select name="price" defaultValue={priceRange} className="w-full h-14 bg-[#F5F5F5] border-none rounded-xl px-4 text-[#2F2F2F] outline-none focus-visible:ring-2 focus-visible:ring-[#E9C46A] appearance-none font-medium cursor-pointer mb-4">
                                <option value="">Mọi mức giá</option>
                                <option value="under-2">Dưới 2 tỷ</option>
                                <option value="2-5">2 - 5 tỷ</option>
                                <option value="above-5">Trên 5 tỷ</option>
                            </select>
                            <Button type="submit" className="w-full h-14 bg-[#E9C46A] hover:bg-[#DDBB57] text-white rounded-xl font-bold shadow-sm transition-all duration-200">
                                <Search className="w-4 h-4 mr-2" />
                                Tìm Nhanh
                            </Button>
                        </div>
                    </div>
                </form>

                <div className="flex justify-between items-center mb-8 px-2 tracking-wide font-medium text-[#6B7280]">
                    <div>Đang hiển thị <span className="text-[#2F2F2F] font-bold">{units.length}</span> căn hộ thỏa điều kiện</div>
                    <div className="hidden md:block">Sắp xếp: Mới nhất & Mức giá ưu đãi</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {units.map((unit: any) => (
                        <UnitCard key={unit.id} unit={unit} projectName={unit.project?.title} />
                    ))}
                    {units.length === 0 && (
                        <div className="col-span-full py-24 text-center text-[#6B7280] bg-white rounded-3xl border border-[#E7E7E7] shadow-sm">
                            <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-10 h-10 text-[#E9C46A]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2F2F2F] mb-3">Không có kết quả khớp</h3>
                            <p className="max-w-md mx-auto text-lg leading-relaxed mb-6">Bạn có thể thay đổi các bộ lọc hoặc xóa bộ lọc để xem toàn bộ rổ hàng mới nhất lúc này.</p>
                            <Link href="/san-pham" className="text-[#E9C46A] font-bold inline-flex px-8 py-3 rounded-full border border-[#E9C46A] hover:bg-[#E9C46A] hover:text-white transition-all">
                                Nhận khuyến nghị
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
