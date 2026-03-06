import { LeadForm } from '@/components/lead-form';
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
    title: "Liên Hệ Khảo Sát & Tư Vấn | VinhomesPro"
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] pb-24">
            <div className="bg-[#2F2F2F] text-white py-24 md:py-32 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E9C46A] rounded-full blur-[150px] opacity-15 translate-y-1/2 translate-x-1/2"></div>
                <div className="container max-w-[1200px] px-4 mx-auto text-center relative z-10">
                    <div className="inline-block border border-[#E9C46A] text-[#E9C46A] font-bold tracking-widest uppercase mb-6 text-xs px-4 py-1.5 rounded-full backdrop-blur-sm bg-black/20">Kết nối ngay</div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Chúng Tôi Có Thể <br /><span className="text-[#E9C46A]">Giúp Gì</span> Cho Bạn?</h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Dịch vụ chăm sóc và tư vấn chuẩn phong cách 5 sao của hệ thống cư dân cao cấp.
                    </p>
                </div>
            </div>

            <div className="container max-w-[1200px] px-4 mx-auto mt-16 md:mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
                    <div className="lg:col-span-5 space-y-10">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-[#2F2F2F] tracking-tight">Kênh Hỗ Trợ Tại Vinhomes</h2>
                            <p className="text-[#6B7280] leading-relaxed text-lg">
                                Chúng tôi cam kết bảo mật 100% mọi thông tin khách hàng. Thông tin sẽ chỉ dùng để hỗ trợ trực tiếp.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-3xl border border-[#E7E7E7] shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FAF3DD] rounded-xl flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-[#E9C46A]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-[#2F2F2F] group-hover:text-[#E9C46A] transition-colors">Trụ sở Giao dịch</h3>
                                    <p className="text-[#6B7280] leading-relaxed text-sm">Tầng 3, Tòa nhà Landmark 81<br />Vinhomes Central Park, Q.Bình Thạnh<br />TP. Hồ Chí Minh</p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-[#E7E7E7] shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FAF3DD] rounded-xl flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-[#E9C46A]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-[#2F2F2F] group-hover:text-[#E9C46A] transition-colors">Đường dây nóng</h3>
                                    <p className="text-[#6B7280] leading-relaxed text-sm mb-1">Hotline CSKH: <strong className="text-[#E9C46A]">0909 123 456</strong></p>
                                    <p className="text-[#6B7280] leading-relaxed text-sm">Giờ hoạt động: 24/7 (Phản hồi tức thì)</p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-[#E7E7E7] shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FAF3DD] rounded-xl flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-[#E9C46A]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-[#2F2F2F] group-hover:text-[#E9C46A] transition-colors">Hòm thư điện tử</h3>
                                    <p className="text-[#6B7280] leading-relaxed text-sm mb-1">info@vinhomespro.vn</p>
                                    <p className="text-[#6B7280] leading-relaxed text-sm">support@vinhomespro.vn</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E7E7E7] sticky top-28">
                        <h3 className="text-3xl font-bold mb-8 text-[#2F2F2F] text-center">Gửi Lời Nhắn</h3>
                        <LeadForm title="" defaultMessage="Tôi đang tìm một sản phẩm đầu tư..." />
                    </div>
                </div>
            </div>
        </div>
    );
}
