import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrencyVND } from '@/lib/format';
import { Unit } from '@prisma/client';

export function UnitCard({ unit, projectName }: { unit: Unit, projectName?: string }) {
    return (
        <Link href={`/san-pham/${unit.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-[#E7E7E7] rounded-2xl bg-white group h-full flex flex-col">
                <div className="relative h-[220px] bg-[#F5F5F5] overflow-hidden">
                    {unit.images && unit.images.length > 0 ? (
                        <Image
                            src={unit.images[0]}
                            alt={unit.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#6B7280]">Không có ảnh</div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#2F2F2F] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                        {unit.unitType}
                    </div>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2 text-[#2F2F2F] group-hover:text-[#E9C46A] transition-colors line-clamp-1">
                            {unit.title}
                        </h3>
                        {projectName && (
                            <p className="text-sm text-[#6B7280] truncate font-medium">{projectName}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mb-6 bg-[#FAF3DD]/50 p-4 rounded-xl border border-[#FAF3DD]">
                        {unit.tower && (
                            <div className="col-span-2 text-[#6B7280] font-medium border-b border-[#E9C46A]/20 pb-2 mb-1">
                                Phân khu/Tháp: <span className="font-semibold text-[#E9C46A] ml-1">{unit.tower}</span>
                            </div>
                        )}
                        <div className="text-[#6B7280] font-medium">DT: <span className="font-semibold text-[#2F2F2F]">{unit.area}m²</span></div>
                        <div className="text-[#6B7280] font-medium text-right">Tòa: <span className="font-semibold text-[#2F2F2F]">{unit.building}</span></div>
                    </div>

                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-[#E7E7E7]">
                        <div className="w-full">
                            <div className="text-xs text-[#6B7280] font-bold mb-1 uppercase tracking-wider">Giá bán</div>
                            <div className="font-bold text-2xl text-[#E9C46A] tracking-tight">{formatCurrencyVND(unit.price)}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
