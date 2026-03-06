import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Project } from '@prisma/client';

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link href={`/du-an/${project.slug}`}>
            <Card className="overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-[#E7E7E7] bg-white rounded-2xl cursor-pointer h-full flex flex-col">
                <div className="relative h-[240px] overflow-hidden bg-[#F5F5F5]">
                    {project.heroImage ? (
                        <Image
                            src={project.heroImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#6B7280]">Không có ảnh</div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#2F2F2F] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                        Đang mở bán
                    </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 text-[#2F2F2F] group-hover:text-[#E9C46A] transition-colors line-clamp-1">
                        {project.title}
                    </h3>
                    {project.location && (
                        <div className="flex items-start gap-1.5 text-sm text-[#6B7280] mb-4">
                            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{project.location}</span>
                        </div>
                    )}
                    <p className="text-sm text-[#6B7280] mb-6 line-clamp-2 leading-relaxed flex-1">{project.summary}</p>
                    <div className="border-t border-[#E7E7E7] pt-4 flex justify-between items-center mt-auto">
                        <span className="text-sm font-semibold text-[#E9C46A]">Khám phá ngay</span>
                        <span className="text-[#E9C46A] transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
