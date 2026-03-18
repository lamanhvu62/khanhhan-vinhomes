import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#E7E7E7] bg-white/90 backdrop-blur-md">
            <div className="container max-w-[1200px] mx-auto flex h-20 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-[#2F2F2F] tracking-tight">
                        <Image src="https://uomvaouwntiiyysoomhf.supabase.co/storage/v1/object/public/vinhomes/logo-vinhomes-2.png" alt="Logo" width={100} height={100} />
                    </span>
                </Link>

                <nav className="hidden md:flex gap-8">
                    <Link href="/" className="text-sm font-semibold text-[#2F2F2F] hover:text-[#E9C46A] transition-colors duration-200">Trang chủ</Link>
                    <Link href="/du-an" className="text-sm font-semibold text-[#2F2F2F] hover:text-[#E9C46A] transition-colors duration-200">Dự án</Link>
                    <Link href="/san-pham" className="text-sm font-semibold text-[#2F2F2F] hover:text-[#E9C46A] transition-colors duration-200">Sản phẩm</Link>
                    <Link href="/tin-tuc" className="text-sm font-semibold text-[#2F2F2F] hover:text-[#E9C46A] transition-colors duration-200">Tin tức</Link>
                    <Link href="/lien-he" className="text-sm font-semibold text-[#2F2F2F] hover:text-[#E9C46A] transition-colors duration-200">Liên hệ</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/lien-he">
                        <button className="hidden md:flex items-center justify-center bg-[#E9C46A] hover:bg-[#DDBB57] text-white font-semibold rounded-xl h-10 px-6 transition-all duration-200 shadow-sm hover:shadow-md">
                            Nhận tư vấn
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
