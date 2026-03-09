export const dynamic = "force-dynamic";
import { ProjectCard } from '@/components/project-card';
import prisma from '@/lib/prisma';

// Define the Project type locally to resolve the missing @prisma/client type export
interface Project {
    id: string;
    title: string;
    slug: string;
    location: string | null;
    summary: string | null;
    heroImage: string | null;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export const revalidate = 60;

export const metadata = {
    title: "Danh sách Dự án | VinhomesPro"
};

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="min-h-screen bg-[#F5F5F5] pb-24">
            {/* Header Banner */}
            <div className="bg-[#2F2F2F] text-white py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687931-cebf14cd041e?ixlib=rb-4.0.3')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F2F2F] to-transparent"></div>
                <div className="container max-w-[1200px] px-4 mx-auto relative z-10 text-center">
                    <div className="inline-block border border-[#E9C46A] text-[#E9C46A] font-bold tracking-widest uppercase mb-6 text-xs px-4 py-1.5 rounded-full backdrop-blur-sm bg-black/20">Tuyệt Tác Không Gian</div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Dự Án Vinhomes</h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Biểu tượng của cuộc sống thời thượng, tinh hoa kiến trúc và cộng đồng cư dân tinh hoa bậc nhất với chuỗi tiện ích &quot;All in one&quot;.
                    </p>
                </div>
            </div>

            <div className="container max-w-[1200px] px-4 mx-auto mt-16 md:mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project: Project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                    {projects.length === 0 && (
                        <div className="col-span-full py-20 text-center text-[#6B7280] bg-white rounded-3xl shadow-sm border border-[#E7E7E7]">
                            Chưa có dữ liệu dự án.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
