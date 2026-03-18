'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Map } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function PropertySearch() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [suggestions, setSuggestions] = useState<{ projects: any[], units: any[] }>({ projects: [], units: [] });
    const [projects, setProjects] = useState<{ id: string, title: string, slug: string }[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setProjects(data);
            })
            .catch(err => console.error(err));
    }, []);

    // Debounce autocomplete API call
    useEffect(() => {
        let isMounted = true;

        const timeout = setTimeout(() => {
            if (query.trim().length < 2) {
                setShowDropdown(false);
                setSuggestions({ projects: [], units: [] });
                return;
            }

            fetch(`/api/search/suggest?q=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {
                    if (isMounted) {
                        setSuggestions(data);
                        setShowDropdown(data.projects.length > 0 || data.units.length > 0);
                    }
                });
        }, 400);

        return () => {
            isMounted = false;
            clearTimeout(timeout);
        };
    }, [query]);

    // Click outside listener
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const keyword = formData.get('keyword');
        const project = formData.get('project');
        const type = formData.get('type');
        const price = formData.get('price');
        const status = formData.get('status');
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword.toString());
        if (project) params.append('project', project.toString());
        if (type) params.append('type', type.toString());
        if (price) params.append('price', price.toString());
        if (status) params.append('status', status.toString());
        router.push(`/san-pham?${params.toString()}`);
    }

    return (
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E7E7E7] w-full max-w-5xl mx-auto flex flex-col gap-4 relative z-50 -mt-12">
            <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full relative" ref={containerRef}>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="flex-1 relative">
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2 block">Từ khóa tìm kiếm</label>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                        <Input
                            name="keyword"
                            autoComplete="off"
                            placeholder="Tên căn, mã tòa, hoặc tên dự án..."
                            className="pl-11 border-none bg-[#F5F5F5] focus-visible:ring-[#E9C46A] h-14 rounded-xl text-[#2F2F2F] placeholder:text-[#6B7280] font-medium"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onFocus={() => { if (suggestions.projects.length > 0 || suggestions.units.length > 0) setShowDropdown(true); }}
                        />
                    </div>

                    {/* Autocomplete Dropdown */}
                    {showDropdown && (
                        <div className="absolute top-full left-0 w-full md:w-[200%] bg-white mt-3 rounded-2xl shadow-xl border border-[#E7E7E7] overflow-hidden z-50 py-2 animate-in fade-in slide-in-from-top-2">
                            {suggestions.projects.length > 0 && (
                                <div className="px-4 py-2">
                                    <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Dự Án</div>
                                    <ul>
                                        {suggestions.projects.map(p => (
                                            <li key={p.id}>
                                                <Link href={`/du-an/${p.slug}`} className="block px-3 py-2 hover:bg-[#F5F5F5] rounded-xl text-[#2F2F2F] font-bold text-sm transition-colors cursor-pointer">
                                                    {p.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {suggestions.units.length > 0 && (
                                <div className="px-4 py-2 border-t border-[#E7E7E7] mt-2 pt-3">
                                    <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Căn Hộ</div>
                                    <ul>
                                        {suggestions.units.map(u => (
                                            <li key={u.id}>
                                                <Link href={`/san-pham/${u.slug}`} className="block px-3 py-2 hover:bg-[#F5F5F5] rounded-xl cursor-pointer transition-colors">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-[#2F2F2F] text-sm">{u.title}</span>
                                                        <span className="text-xs text-[#6B7280] bg-[#E7E7E7] px-2 py-0.5 rounded ml-auto">{u.project?.title}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex-1 w-full md:w-auto min-w-[200px]">
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2 block">Dự án quan tâm</label>
                    <select name="project" className="w-full border-none bg-[#F5F5F5] focus-visible:ring-[#E9C46A] h-14 rounded-xl px-4 outline-none text-[#2F2F2F] appearance-none cursor-pointer font-medium">
                        <option value="">Tất cả khu vực</option>
                        {projects.map(p => (
                            <option key={p.id} value={p.slug}>{p.title}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1">
                    <select name="type" className="w-full border-none bg-[#F5F5F5] focus-visible:ring-[#E9C46A] h-14 rounded-xl px-4 outline-none text-[#2F2F2F] appearance-none cursor-pointer font-medium text-sm">
                        <option value="">Tất cả loại hình</option>
                        <option value="Studio">Studio</option>
                        <option value="1PN">1 Phòng Ngủ</option>
                        <option value="2PN">2 Phòng Ngủ</option>
                        <option value="3PN">3 Phòng Ngủ</option>
                    </select>
                </div>
                <div className="flex-1">
                    <select name="price" className="w-full border-none bg-[#F5F5F5] focus-visible:ring-[#E9C46A] h-14 rounded-xl px-4 outline-none text-[#2F2F2F] appearance-none cursor-pointer font-medium text-sm">
                        <option value="">Mọi mức giá</option>
                        <option value="under-2">Dưới 2 tỷ</option>
                        <option value="2-5">2 - 5 tỷ</option>
                        <option value="above-5">Trên 5 tỷ</option>
                    </select>
                </div>
                <div className="flex-1">
                    <select name="status" className="w-full border-none bg-[#F5F5F5] focus-visible:ring-[#E9C46A] h-14 rounded-xl px-4 outline-none text-[#2F2F2F] appearance-none cursor-pointer font-medium text-sm">
                        <option value="">Mọi trạng thái</option>
                        <option value="Available">Đang mở bán</option>
                        <option value="Reserved">Đã đặt chỗ</option>
                        <option value="Sold">Đã bán</option>
                    </select>
                </div>

                <div className="flex flex-col md:flex-row items-end gap-3 flex-none mt-2 md:mt-0">
                    <Button type="submit" className="h-14 px-8 bg-[#E9C46A] hover:bg-[#DDBB57] text-white font-bold rounded-xl w-full md:w-auto shadow-sm transition-all duration-200">
                        <Search className="w-5 h-5 mr-2" />Tìm kiếm
                    </Button>
                    <Link href="/map-search" className="h-14 w-full md:w-14 bg-[#2F2F2F] hover:bg-[#1A1A1A] text-white rounded-xl flex items-center justify-center transition-all shadow-sm">
                        <Map className="w-5 h-5" />
                        <span className="md:hidden ml-2 font-bold">Tìm trên bản đồ</span>
                    </Link>
                </div>
                </div>
            </form>
        </div>
    )
}
