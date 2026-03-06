import Image from 'next/image';
import { notFound } from 'next/navigation';
import { UnitCard } from '@/components/unit-card';
import { LeadForm } from '@/components/lead-form';
import prisma from '@/lib/prisma';
import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 60;

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await prisma.project.findUnique({ where: { slug } });

    if (!project) return {};

    return {
        title: `Dự án ${project.title} - Bảng giá, Chính sách & Giỏ hàng`,
        description: `Khám phá dự án ${project.title} tại ${project.location}. ${project.summary}. Nhận bảng giá gốc từ chủ đầu tư Vinhomes.`,
        openGraph: {
            images: project.heroImage ? [{ url: project.heroImage }] : [],
        }
    }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const project = await prisma.project.findUnique({
        where: { slug },
        include: {
            units: { orderBy: { createdAt: 'desc' }, take: 6 }
        }
    });

    if (!project) return notFound();

    // Structured Data (JSON-LD)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent', // More fitting for Project page
        name: project.title,
        description: project.summary,
        url: `https://vinhomespro.vn/du-an/${project.slug}`,
        image: project.heroImage ? [project.heroImage] : [],
        address: {
            '@type': 'PostalAddress',
            streetAddress: project.location,
            addressCountry: 'VN'
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] pb-24">
            {/* Inject JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Premium Breadcrumb */}
            <div className="absolute top-20 left-0 w-full z-40 bg-transparent py-4 text-white/80 font-medium">
                <div className="container max-w-[1200px] mx-auto px-4 flex items-center gap-2 text-sm drop-shadow-md">
                    <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
                    <span className="text-white/50">/</span>
                    <Link href="/du-an" className="hover:text-white transition-colors">Dự án Vinhomes</Link>
                    <span className="text-white/50">/</span>
                    <span className="text-white font-bold">{project.title}</span>
                </div>
            </div>

            <div className="relative h-[65vh] min-h-[500px]">
                {project.heroImage && (
                    <Image src={project.heroImage} alt={project.title} fill className="object-cover" priority sizes="100vw" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F2F2F] via-[#2F2F2F]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white container max-w-[1200px] mx-auto">
                    <div className="bg-[#E9C46A] text-[#2F2F2F] font-bold text-xs px-4 py-2 rounded-lg inline-block mb-6 uppercase tracking-wider shadow-sm">
                        Dự Án Nổi Bật
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-md">{project.title}</h1>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-200 text-lg md:text-xl font-light">
                        <div className="bg-black/30 px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-[#E9C46A]" /> {project.location}
                        </div>
                        <a href="#booking" className="bg-[#E9C46A] hover:bg-[#DDBB57] text-white px-8 py-3 rounded-2xl font-bold transition-colors shadow-lg text-base h-full flex items-center justify-center">
                            Đăng ký nhận bảng giá
                        </a>
                    </div>
                </div>
            </div>

            <div className="container max-w-[1200px] mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-16">

                    <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[#E7E7E7]">
                        <h2 className="text-3xl font-bold mb-8 text-[#2F2F2F] flex items-center gap-4">
                            <span className="w-1.5 h-8 bg-[#E9C46A] rounded-full inline-block"></span>
                            Tổng Quan Dự Án
                        </h2>
                        <div className="prose max-w-none text-[#6B7280] leading-loose whitespace-pre-wrap text-lg">
                            {project.content || project.summary}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                            <div className="bg-[#F5F5F5] p-5 rounded-2xl text-center">
                                <div className="text-3xl font-bold text-[#E9C46A] mb-1">Quy mô</div>
                                <div className="text-sm font-semibold text-[#6B7280] uppercase">Siêu đô thị</div>
                            </div>
                            <div className="bg-[#F5F5F5] p-5 rounded-2xl text-center">
                                <div className="text-3xl font-bold text-[#E9C46A] mb-1">Đô thị</div>
                                <div className="text-sm font-semibold text-[#6B7280] uppercase">Thông minh</div>
                            </div>
                            <div className="bg-[#F5F5F5] p-5 rounded-2xl text-center">
                                <div className="text-3xl font-bold text-[#E9C46A] mb-1">Công viên</div>
                                <div className="text-sm font-semibold text-[#6B7280] uppercase">Thế giới</div>
                            </div>
                            <div className="bg-[#F5F5F5] p-5 rounded-2xl text-center">
                                <div className="text-3xl font-bold text-[#E9C46A] mb-1">Pháp lý</div>
                                <div className="text-sm font-semibold text-[#6B7280] uppercase">Sổ hồng</div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 border-b border-[#E7E7E7] pb-4">
                            <h2 className="text-3xl font-bold text-[#2F2F2F] flex items-center gap-4">
                                <span className="w-1.5 h-8 bg-[#E9C46A] rounded-full inline-block"></span>
                                Giỏ Hàng Đang Mở Bán
                            </h2>
                            <div className="bg-[#FAF3DD] text-[#2F2F2F] px-4 py-1.5 rounded-full font-bold shadow-sm border border-[#E9C46A]/30">
                                Phân phối độc quyền
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {(project.units as any[]).map((unit) => (
                                <UnitCard key={unit.id} unit={unit} projectName={project.title} />
                            ))}
                            {project.units.length === 0 && (
                                <p className="text-[#6B7280] bg-white p-8 rounded-3xl border border-[#E7E7E7] text-center w-full col-span-full text-lg">Đang cập nhật rổ hàng mới nhất.</p>
                            )}
                        </div>
                        {project.units.length > 0 && (
                            <div className="mt-8 text-center pt-4">
                                <Link href={`/san-pham?project=${project.slug}`} className="inline-flex items-center justify-center bg-white border border-[#E7E7E7] shadow-sm hover:shadow-md text-[#2F2F2F] px-8 py-4 rounded-xl font-bold transition-all text-lg group">
                                    Khám phá thêm rổ hàng <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform text-[#E9C46A]" />
                                </Link>
                            </div>
                        )}
                    </section>
                </div>

                <div className="lg:col-span-1" id="booking">
                    <div className="sticky top-28">
                        <LeadForm title="Đăng Ký Tham Quan" defaultMessage={`Tôi muốn đăng ký nhận bảng giá phân khu và đi trải nghiệm thực tế dự án ${project.title}.`} />

                        <div className="mt-8 bg-[#2F2F2F] p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] border-2 border-[#E9C46A]/20">
                            <h3 className="text-[#E9C46A] font-bold text-xl mb-4">Cam kết dịch vụ</h3>
                            <ul className="text-gray-300 space-y-4 text-sm leading-relaxed">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#E9C46A] mt-2 shrink-0 shadow-[0_0_10px_#E9C46A]"></span>
                                    Cung cấp thông tin chuẩn xác 100% từ CĐT.
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#E9C46A] mt-2 shrink-0 shadow-[0_0_10px_#E9C46A]"></span>
                                    Hỗ trợ tham quan thực tế 24/7 (xe đón tận nơi).
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#E9C46A] mt-2 shrink-0 shadow-[0_0_10px_#E9C46A]"></span>
                                    Miễn phí 100% phí tư vấn và thủ tục giấy tờ.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
