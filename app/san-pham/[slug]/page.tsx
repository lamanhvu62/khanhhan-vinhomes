import Image from 'next/image';
import { notFound } from 'next/navigation';
import { LeadForm } from '@/components/lead-form';
import { RecommendUnits } from '@/components/recommend-units';
import { formatCurrencyVND } from '@/lib/format';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 60;

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const unit = await prisma.unit.findUnique({ where: { slug }, include: { project: true } });

    if (!unit) return {};

    return {
        title: `${unit.title} - ${unit.project?.title || 'Vinhomes'} | Bán & Cho Thuê`,
        description: `Bán căn hộ ${unit.unitType} diện tích ${unit.area}m2 tại ${unit.project?.title || ''}. Giá ${formatCurrencyVND(unit.price)}. Cập nhật mới nhất rẻ nhất thị trường.`,
        openGraph: {
            images: unit.images.length > 0 ? [{ url: unit.images[0] }] : [],
        }
    }
}

export default async function UnitDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const unit = await prisma.unit.findUnique({
        where: { slug },
        include: { project: true }
    });

    if (!unit) return notFound();

    // Structured Data (JSON-LD)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Apartment',
        name: unit.title,
        description: unit.content || unit.title,
        floorSize: {
            '@type': 'QuantitativeValue',
            value: unit.area,
            unitCode: 'MTK'
        },
        numberOfRooms: unit.unitType === '3PN' ? 3 : unit.unitType === '2PN' ? 2 : 1,
        offers: {
            '@type': 'Offer',
            price: unit.price,
            priceCurrency: 'VND',
        },
        image: unit.images,
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] pb-24">
            {/* Inject JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Premium Breadcrumb */}
            <div className="bg-white border-b border-[#E7E7E7] py-4">
                <div className="container max-w-[1200px] mx-auto px-4 text-sm text-[#6B7280] flex items-center gap-2 font-medium">
                    <Link href="/" className="hover:text-[#E9C46A] transition-colors">Trang chủ</Link>
                    <span className="text-gray-300">/</span>
                    <Link href="/san-pham" className="hover:text-[#E9C46A] transition-colors">Quỹ căn</Link>
                    <span className="text-gray-300">/</span>
                    {unit.project && (
                        <>
                            <Link href={`/du-an/${unit.project.slug}`} className="hover:text-[#E9C46A] transition-colors">{unit.project.title}</Link>
                            <span className="text-gray-300">/</span>
                        </>
                    )}
                    <span className="text-[#E9C46A] line-clamp-1">{unit.title}</span>
                </div>
            </div>

            <div className="container max-w-[1200px] mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <div className="lg:col-span-2 space-y-10">
                        <div className="bg-white p-3 rounded-3xl shadow-sm border border-[#E7E7E7]">
                            <div className="relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden bg-[#F5F5F5]">
                                {unit.images && unit.images.length > 0 ? (
                                    <Image src={unit.images[0]} alt={unit.title} fill className="object-cover" priority sizes="(max-width: 1200px) 100vw, 800px" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#6B7280]">Đang cập nhật hình</div>
                                )}
                            </div>
                            {unit.images && unit.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-3 mt-3">
                                    {unit.images.slice(1, 5).map((img, idx) => (
                                        <div key={idx} className="relative h-28 rounded-xl overflow-hidden bg-[#F5F5F5] cursor-pointer hover:opacity-80 transition-opacity">
                                            <Image src={img} alt={`${unit.title} - ${idx}`} fill className="object-cover" sizes="(max-width: 1200px) 25vw, 200px" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[#E7E7E7]">
                            <h3 className="font-bold text-2xl mb-8 text-[#2F2F2F] flex items-center gap-4 border-b border-[#E7E7E7] pb-4">
                                <span className="w-1.5 h-6 bg-[#E9C46A] rounded-full inline-block"></span>
                                Đặc Điểm Nổi Bật
                            </h3>
                            <div className="prose max-w-none text-[#6B7280] whitespace-pre-wrap leading-loose text-lg">
                                {unit.content || 'Đang chờ CĐT cập nhật chi tiết nội thất, thiết kế và chính sách.'}
                            </div>
                        </div>

                        {/* AI Recommend Section */}
                        <div className="pt-8 border-t border-[#E7E7E7]">
                            <h3 className="font-bold text-2xl text-[#2F2F2F] mb-2">Gợi ý dành cho bạn</h3>
                            <p className="text-[#6B7280] mb-8">Những căn hộ có mức giá và diện tích tương tự phù hợp nhu cầu.</p>
                            <RecommendUnits unitId={unit.id} />
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E7E7E7]">
                                <div className="flex gap-2 mb-6">
                                    <span className="bg-[#FAF3DD] border border-[#E9C46A] text-[#E9C46A] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{unit.unitType}</span>
                                    {unit.area && <span className="bg-[#F5F5F5] text-[#2F2F2F] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{unit.area}m²</span>}
                                </div>

                                <h1 className="text-3xl font-bold mb-3 text-[#2F2F2F] tracking-tight">{unit.title}</h1>

                                {unit.project && (
                                    <p className="text-[#6B7280] mb-8 flex space-x-2 items-center text-sm">
                                        <span>Dự án:</span>
                                        <Link href={`/du-an/${unit.project.slug}`} className="text-[#E9C46A] font-bold hover:underline bg-[#FAF3DD]/50 px-2 py-0.5 rounded-md">
                                            {unit.project.title}
                                        </Link>
                                    </p>
                                )}

                                <div className="bg-[#FAF3DD] p-6 rounded-2xl mb-8 text-center border border-[#E9C46A]/20">
                                    <span className="block text-xs font-bold text-[#E9C46A] uppercase tracking-widest mb-1">Giá chuyển nhượng</span>
                                    <div className="text-4xl font-bold text-[#E9C46A] tracking-tight drop-shadow-sm">
                                        {formatCurrencyVND(unit.price)}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-y-8 text-sm pt-2">
                                    <div>
                                        <div className="text-[#6B7280] font-bold mb-2 tracking-wider uppercase text-xs flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#E7E7E7] rounded-full"></span>Phân khu/Tòa</div>
                                        <div className="font-bold text-[#2F2F2F] text-base">{unit.building || 'Đang cập nhật'}</div>
                                    </div>
                                    <div>
                                        <div className="text-[#6B7280] font-bold mb-2 tracking-wider uppercase text-xs flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#E7E7E7] rounded-full"></span>Tầng</div>
                                        <div className="font-bold text-[#2F2F2F] text-base">{unit.floor || 'Đang cập nhật'}</div>
                                    </div>
                                    <div>
                                        <div className="text-[#6B7280] font-bold mb-2 tracking-wider uppercase text-xs flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#E7E7E7] rounded-full"></span>Hướng view</div>
                                        <div className="font-bold text-[#2F2F2F] text-base line-clamp-2 pr-2">{unit.view || 'Đang cập nhật'}</div>
                                    </div>
                                    <div>
                                        <div className="text-[#6B7280] font-bold mb-2 tracking-wider uppercase text-xs flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#E7E7E7] rounded-full"></span>Pháp lý</div>
                                        <div className="font-bold text-[#2F2F2F] text-base">{unit.legal || 'Sổ hồng lâu dài'}</div>
                                    </div>
                                </div>
                            </div>

                            <LeadForm title="Đăng Ký Khám Phá" defaultMessage={`Tôi quan tâm mã căn: ${unit.title}. Vui lòng gửi layout và ảnh thực tế qua Zalo.`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
