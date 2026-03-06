import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Vinhomes<span className="text-foreground">Pro</span></span>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          <Link href="/du-an" className="text-sm font-medium transition-colors hover:text-primary">Dự án</Link>
          <Link href="/san-pham" className="text-sm font-medium transition-colors hover:text-primary">Sản phẩm</Link>
          <Link href="/tin-tuc" className="text-sm font-medium transition-colors hover:text-primary">Tin tức</Link>
          <Link href="/lien-he" className="text-sm font-medium transition-colors hover:text-primary">Liên hệ</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button className="hidden md:flex">Nhận Tư Vấn</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
