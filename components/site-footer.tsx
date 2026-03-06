import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export function SiteFooter() {
    return (
        <footer className="bg-[#F5F5F5] border-t border-[#E7E7E7] pt-16 pb-8 text-[#2F2F2F]">
            <div className="container max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-[#2F2F2F] tracking-tight">
                            Vinhomes<span className="text-[#E9C46A] px-1">Pro</span>
                        </span>
                    </Link>
                    <p className="text-sm text-[#6B7280] leading-relaxed mt-4">
                        Đại lý độc quyền phân phối bất động sản cao cấp, mang đến không gian sống đẳng cấp và cơ hội đầu tư sinh lời vượt trội từ Vinhomes.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-[#2F2F2F] mb-6 uppercase tracking-wider text-sm">Khám Phá</h3>
                    <ul className="space-y-4 text-sm text-[#6B7280] font-medium">
                        <li><Link href="/du-an" className="hover:text-[#E9C46A] transition-colors">Danh sách dự án</Link></li>
                        <li><Link href="/san-pham" className="hover:text-[#E9C46A] transition-colors">Giỏ hàng sản phẩm</Link></li>
                        <li><Link href="/tin-tuc" className="hover:text-[#E9C46A] transition-colors">Tin tức thị trường</Link></li>
                        <li><Link href="/lien-he" className="hover:text-[#E9C46A] transition-colors">Đăng ký tư vấn</Link></li>
                    </ul>
                </div>

                <div className="md:col-span-2">
                    <h3 className="font-bold text-[#2F2F2F] mb-6 uppercase tracking-wider text-sm">Thông tin liên hệ</h3>
                    <ul className="space-y-4 text-sm text-[#6B7280]">
                        <li className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-[#E9C46A] shrink-0 mt-0.5" />
                            <div>
                                <a href="tel:0909123456" className="text-[#E9C46A] font-bold block mb-1">0909 123 456</a>
                                <span>Hỗ trợ khách hàng 24/7 (Zalo, Viber)</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-[#E9C46A] shrink-0" />
                            <a href="mailto:info@vinhomespro.vn" className="hover:text-[#E9C46A] transition-colors">info@vinhomespro.vn</a>
                        </li>
                        <li className="flex items-start gap-3 leading-relaxed">
                            <MapPin className="w-5 h-5 text-[#E9C46A] shrink-0 mt-0.5" />
                            <span>Tòa nhà Landmark 81, Vinhomes Central Park, Phường 22, Quận Bình Thạnh, TP.HCM</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-sm text-[#6B7280] font-medium mt-16 pt-8 border-t border-[#E7E7E7]">
                &copy; {new Date().getFullYear()} VinhomesPro. All rights reserved. Crafted for Real Estate.
            </div>
        </footer>
    );
}
