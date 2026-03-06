import { PropertySearch } from '@/components/property-search';
import { ProjectCard } from '@/components/project-card';
import { UnitCard } from '@/components/unit-card';
import { PostCard } from '@/components/post-card';
import { LeadForm } from '@/components/lead-form';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Phone, CheckCircle2 } from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const [projects, units, posts] = await Promise.all([
    prisma.project.findMany({ take: 3, orderBy: { createdAt: 'desc' } }),
    prisma.unit.findMany({ take: 4, orderBy: { createdAt: 'desc' }, include: { project: true } }),
    prisma.post.findMany({ take: 3, orderBy: { publishedAt: 'desc' } }),
  ]);

  return (
    <>
      <section className="relative h-[85vh] min-h-[600px] flex items-center text-white">
        <div className="absolute inset-0 bg-[#2F2F2F] z-0 overflow-hidden">
          <div className="absolute inset-0 opacity-60 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F2F2F] via-transparent to-transparent" />
        </div>
        <div className="container max-w-[1200px] relative z-10 px-4 mx-auto text-center translate-y-[-2rem]">
          <div className="inline-block border border-[#E9C46A] text-[#E9C46A] font-bold tracking-widest uppercase mb-6 text-sm px-6 py-2 rounded-full backdrop-blur-sm bg-black/20">Bất động sản Vinhomes</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight text-white drop-shadow-lg">Tinh Hoa <br /><span className="text-[#E9C46A]">Kiến Tạo</span> Cuộc Sống</h1>
          <p className="text-lg md:text-xl font-light mb-12 text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Hệ sinh thái tiện ích đẳng cấp, nâng tầm giá trị sống và cơ hội đầu tư sinh lời bền vững.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto sm:max-w-none">
            <Link href="/du-an" className="bg-[#E9C46A] text-white hover:bg-[#DDBB57] px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto text-center border-2 border-[#E9C46A]">
              Xem dự án
            </Link>
            <Link href="/san-pham" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto text-center">
              Quỹ căn đang bán
            </Link>
          </div>
        </div>
      </section>

      <div className="container max-w-[1200px] px-4 mx-auto relative z-20">
        <PropertySearch />
      </div>

      <section className="py-24 container max-w-[1200px] mx-auto px-4 mt-8 md:mt-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 relative">
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E9C46A] rounded-full"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 text-[#2F2F2F] tracking-tight">Dự Án Nổi Bật</h2>
            <p className="text-[#6B7280] text-lg lg:text-xl">Khám phá các đại đô thị quy mô bậc nhất.</p>
          </div>
          <Link href="/du-an" className="text-[#E9C46A] font-bold hover:text-[#DDBB57] flex items-center gap-2 transition-colors uppercase tracking-widest text-sm">
            Xem toàn bộ dự án <span aria-hidden="true" className="text-xl">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      <section className="py-24 bg-[#FAF3DD] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px] opacity-70 translate-x-1/3 -translate-y-1/3"></div>
        <div className="container max-w-[1200px] px-4 mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#2F2F2F] tracking-tight">Tự Hào Cung Cấp</h2>
            <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">Chất lượng dịch vụ là ưu tiên hàng đầu trong mọi giao dịch.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center px-4 md:px-0">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#E9C46A]/20">
              <div className="text-5xl md:text-6xl font-bold text-[#E9C46A] mb-6">100<span className="text-3xl">+</span></div>
              <div className="text-[#2F2F2F] font-bold text-xl mb-3">Căn Hộ Đang Bán</div>
              <div className="text-[#6B7280] leading-relaxed">Giỏ hàng chuyển nhượng và thứ cấp được kiểm tra pháp lý minh bạch 100%.</div>
            </div>
            <div className="bg-[#2F2F2F] text-white p-10 rounded-3xl shadow-xl border border-[#2F2F2F] transform scale-100 lg:scale-105 z-10">
              <div className="text-5xl md:text-6xl font-bold text-[#E9C46A] mb-6">24/7</div>
              <div className="font-bold text-xl mb-3">Hỗ Trợ Xem Nhà</div>
              <div className="text-gray-400 leading-relaxed">Chúng tôi có nhân viên trực tiếp lái xe đưa đón quý khách hàng tham quan dự án mọi lúc.</div>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#E9C46A]/20">
              <div className="text-5xl md:text-6xl font-bold text-[#E9C46A] mb-6 inline-flex items-center gap-2"><CheckCircle2 className="w-12 h-12" /></div>
              <div className="text-[#2F2F2F] font-bold text-xl mb-3">Tư Vấn Miễn Phí</div>
              <div className="text-[#6B7280] leading-relaxed">Phân tích dòng tiền, ngân hàng và hỗ trợ thủ tục công chứng hoàn toàn miễn phí.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F5F5F5]">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 relative">
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E9C46A] rounded-full"></div>
              <h2 className="text-3xl md:text-5xl font-bold mb-3 text-[#2F2F2F] tracking-tight">Giỏ Hàng Đắc Địa</h2>
              <p className="text-[#6B7280] text-lg lg:text-xl">Những sản phẩm giới hạn với mức giá đầu tư tốt nhất.</p>
            </div>
            <Link href="/san-pham" className="text-[#E9C46A] font-bold hover:text-[#DDBB57] flex items-center gap-2 transition-colors uppercase tracking-widest text-sm">
              Xem toàn bộ quỹ căn <span aria-hidden="true" className="text-xl">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {units.map(u => <UnitCard key={u.id} unit={u} projectName={u.project?.title} />)}
          </div>
        </div>
      </section>

      <section className="py-24 container max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 relative">
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E9C46A] rounded-full"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 text-[#2F2F2F] tracking-tight">Kinh Nghiệm BĐS</h2>
            <p className="text-[#6B7280] text-lg lg:text-xl">Cẩm nang không thể bỏ qua trước khi giao dịch.</p>
          </div>
          <Link href="/tin-tuc" className="text-[#E9C46A] font-bold hover:text-[#DDBB57] flex items-center gap-2 transition-colors uppercase tracking-widest text-sm">
            Xem thêm bài viết <span aria-hidden="true" className="text-xl">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map(p => <PostCard key={p.id} post={p} />)}
        </div>
      </section>

      <section className="bg-white py-24 border-t border-[#E7E7E7]">
        <div className="container max-w-[1200px] mx-auto px-4">
          <div className="bg-[#2F2F2F] rounded-3xl p-8 md:p-20 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row gap-12 items-center">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E9C46A] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
            <div className="flex-1 relative z-10 w-full">
              <div className="inline-block bg-[#E9C46A]/20 text-[#E9C46A] font-bold tracking-wider uppercase mb-6 text-sm px-4 py-1.5 rounded-lg border border-[#E9C46A]/30">Vinhomes Pro Support</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Bạn Cần Hỗ Trợ <br />Tìm Kiếm Căn Hộ?</h2>
              <p className="text-lg text-gray-300 mb-10 leading-relaxed font-light">
                Hãy để lại thông tin hoặc gọi điện ngay. Đội ngũ tư vấn sẽ cung cấp bảng tính dòng tiền và thiết kế nội thất miễn phí cho bạn.
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-[#E9C46A] flex items-center justify-center shrink-0">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-gray-400 font-semibold mb-1">Gọi ngay (24/7)</div>
                  <div className="text-2xl font-bold tracking-wider text-[#E9C46A]">0909 123 456</div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full relative z-10">
              <LeadForm title="Nhận Báo Giá Độc Quyền" defaultMessage="Xin chào! Tôi muốn chuyên gia gọi lại để tư vấn dự án..." />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
