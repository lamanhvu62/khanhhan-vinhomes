import prisma from '@/lib/prisma';
import { PropertySearch } from '@/components/property-search';
import { MapWrapper } from '@/components/map-wrapper';

export const metadata = {
    title: "Bản Đồ Bất Động Sản Điện Tử | VinhomesPro",
    description: "Tìm kiếm các căn hộ và bất động sản Vinhomes trực quan trên bản đồ điện tử đầy đủ thông tin nhất."
}

export default async function MapSearchPage() {
    const units = await prisma.unit.findMany({
        include: { project: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="min-h-screen bg-[#F5F5F5] pb-24">
            <div className="bg-[#2F2F2F] text-white py-12">
                <div className="container max-w-[1200px] px-4 mx-auto text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Tìm Kiếm Trên Bản Đồ</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto font-light leading-relaxed text-sm">Trải nghiệm trực quan định vị và giá cả của các block căn hộ Vinhomes.</p>
                </div>
            </div>

            <div className="container max-w-[1200px] px-4 mx-auto mt-8">
                <PropertySearch />
            </div>

            <div className="container max-w-[1200px] px-4 mx-auto mt-12 h-[calc(100vh-400px)] min-h-[500px] relative z-10">
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-[#E7E7E7] w-full h-full">
                    <MapWrapper units={units} />
                </div>
            </div>
        </div>
    );
}
