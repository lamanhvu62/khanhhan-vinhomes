import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, ShieldCheck, HeartHandshake, Eye, Target } from "lucide-react";

export const metadata = {
    title: "Về Vinhomes Pro | Chuyên gia Bất Động Sản",
    description: "Trang thông tin giới thiệu về đội ngũ chuyên gia tư vấn bất động sản Vinhomes uy tín.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white pb-24">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Office Team"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-slate-900/80 z-0"></div>
                <div className="container relative z-10 px-4 text-center max-w-4xl mx-auto">
                    <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Về Chúng Tôi</span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                        Đồng Hành Cùng Bạn <br />Xây Dựng Khởi Nguyên Mới
                    </h1>
                    <p className="text-xl text-slate-300 font-light mb-10 leading-relaxed">
                        Chúng tôi tự hào là đại lý phân phối chính thức các dự án bất động sản cao cấp của Vinhomes, mang đến không gian sống hoàn hảo và tiềm năng đầu tư vô hạn.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="relative z-20 -mt-16 container px-4 mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10+</div>
                        <div className="text-sm text-slate-500 font-medium">Năm Kinh Nghiệm</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
                        <div className="text-sm text-slate-500 font-medium">Dự Án Đã Bán</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10k+</div>
                        <div className="text-sm text-slate-500 font-medium">Khách Hàng Hài Lòng</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                        <div className="text-sm text-slate-500 font-medium">Chuyên Viên Tư Vấn</div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Vision Mission"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/10"></div>
                    </div>
                    <div className="space-y-12">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Eye className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900">Tầm Nhìn</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Trở thành nhà cung cấp giải pháp bất động sản hàng đầu và là đối tác phân phối số 1 của Vinhomes tại Việt Nam. Đồng thời tạo lập những chuẩn mực dịch vụ cao nhất trong lĩnh vực tư vấn bất động sản cao cấp.
                            </p>
                        </div>

                        <div className="h-px bg-slate-100 w-full"></div>

                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Target className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900">Sứ Mệnh</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Mang đến cho khách hàng sự an tâm tuyệt đối trên mỗi giao dịch. Chúng tôi kiến tạo giá trị thực thông qua sự tận tâm, liên tục cập nhật kiến thức và cá nhân hóa lộ trình mua bán phù hợp với dòng tiền của từng tổ ấm.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-slate-50">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Giá Trị Cốt Lõi</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-lg">Xây dựng và phát triển dựa trên 3 trụ cột mang tính định hướng cho toàn bộ hoạt động của công ty.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mx-auto mb-6">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Chính Trực</h3>
                            <p className="text-slate-600 leading-relaxed">Luôn cung cấp thông tin minh bạch, rõ ràng. Bảo vệ quyền lợi hợp pháp tối đa cho người mua và người bán.</p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Chuyên Nghiệp</h3>
                            <p className="text-slate-600 leading-relaxed">Đội ngũ được đào tạo bài bản, am hiểu sâu sắc về thị trường, pháp lý và phong thủy để tư vấn chuyên sâu nhất.</p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
                            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 mx-auto mb-6">
                                <HeartHandshake className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Tận Tâm</h3>
                            <p className="text-slate-600 leading-relaxed">Đồng hành cùng khách hàng từ khâu chọn căn, làm thủ tục ngân hàng cho tới khi nhận bàn giao và an cư.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Layer */}
            <section className="py-24 container px-4 mx-auto">
                <div className="bg-slate-900 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10 leading-tight">Bạn Đã Sẵn Sàng Trở Thành <br />Cư Dân Vinhomes?</h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 relative z-10">
                        Liên hệ ngay với chúng tôi để nhận bảng giá độc quyền và sự hỗ trợ ưu việt.
                    </p>
                    <Link href="/lien-he" className="relative z-10">
                        <Button size="lg" className="h-14 px-8 text-lg rounded-full">Đặt Lịch Tư Vấn Ngay</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
