import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t py-12 text-slate-300">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-white">Vinhomes<span className="text-primary">Pro</span></span>
                    </Link>
                    <p className="text-sm text-slate-400">
                        Chuyên cung cấp các giải pháp bất động sản cao cấp, mang đến không gian sống hoàn hảo và cơ hội đầu tư sinh lời vượt trội.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">Dự án nổi bật</h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><Link href="/du-an/vinhomes-grand-park" className="hover:text-primary transition-colors">Vinhomes Grand Park</Link></li>
                        <li><Link href="/du-an/vinhomes-ocean-park" className="hover:text-primary transition-colors">Vinhomes Ocean Park</Link></li>
                        <li><Link href="/du-an/vinhomes-golden-river" className="hover:text-primary transition-colors">Vinhomes Golden River</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">Chính sách</h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><Link href="/chinh-sach" className="hover:text-primary transition-colors">Chính sách bảo mật</Link></li>
                        <li><Link href="/dieu-khoan" className="hover:text-primary transition-colors">Điều khoản dịch vụ</Link></li>
                        <li><Link href="/huong-dan-mua" className="hover:text-primary transition-colors">Hướng dẫn mua bán</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">Liên hệ</h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li>Phòng Kinh Doanh: 0909 123 456</li>
                        <li>Email: info@vinhomespro.vn</li>
                        <li>Địa chỉ: Tòa nhà Landmark 81, Vinhomes Central Park, Bình Thạnh, TP.HCM</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                &copy; {new Date().getFullYear()} VinhomesPro. All rights reserved. Design with ❤️
            </div>
        </footer>
    );
}
