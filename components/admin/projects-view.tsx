"use client";
import React, { useState } from 'react';
import { HiPlus as Plus, HiSearch as Search, HiFilter as Filter, HiPencil as Edit2, HiTrash as Trash2, HiLocationMarker as MapPin } from 'react-icons/hi';
import Dropzone from '@/components/admin/dropzone';
import { useToast } from '@/components/admin/toast-context';
import { createProject, updateProject, deleteProject } from '@/app/actions/admin';
import dynamic from 'next/dynamic';

import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false, loading: () => <p className="text-gray-500 font-medium p-4">Đang tải trình soạn thảo...</p> });
import 'react-quill-new/dist/quill.snow.css';

import DOMPurify from 'isomorphic-dompurify';

const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};

const DEFAULT_FORM = { title: '', location: '', priceMin: '', type: 'Căn hộ', summary: '', content: '' };

export default function ProjectsView({ projects = [] }: { projects?: any[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [images, setImages] = useState<string[]>([]);
  
  const router = useRouter();
  const { showToast } = useToast();

  const filtered = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) && 
    (typeFilter === 'All' || p.type === typeFilter)
  );

  const openAddForm = () => {
    setEditingId(null);
    setFormData(DEFAULT_FORM);
    setImages([]);
    setIsFormOpen(true);
  };

  const openEditForm = (p: any) => {
    setEditingId(p.id);
    setFormData({
       title: p.title || '',
       location: p.location || '',
       priceMin: p.priceMin ? p.priceMin.toString() : '',
       type: p.type || 'Căn hộ',
       summary: p.summary || '',
       content: p.content || ''
    });
    setImages(p.images || []);
    setIsFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let res;
    if (editingId) {
       res = await updateProject(editingId, { ...formData, images });
    } else {
       res = await createProject({ ...formData, images });
    }

    setLoading(false);
    
    if (res.success) {
      showToast(`Dự án đã được ${editingId ? 'cập nhật' : 'thêm mới'} thành công!`);
      setIsFormOpen(false);
      router.refresh(); // Ép cập nhật lại danh sách ngay lập tức
    } else {
      showToast("Lỗi khi lưu: " + res.error, "error");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa dự án "${title}"?`)) {
       await deleteProject(id);
       showToast("Đã xóa dự án thành công!");
       router.refresh();
    }
  }

  const removeImage = (index: number) => {
     setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (isFormOpen) {
    return (
      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto px-4 md:px-0 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{editingId ? 'Cập nhật Dự Án' : 'Thêm Dự Án Mới'}</h2>
          <button onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-bold shadow-sm transition-colors cursor-pointer">Thoát</button>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Tên dự án</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-1"><MapPin className="w-4 h-4"/> Vị trí</label>
              <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 font-medium" placeholder="VD: Quận 9, TP.HCM" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Giá dự kiến (Tỷ VNĐ / Triệu/m2 dạng số)</label>
              <input type="number" step="0.1" value={formData.priceMin} onChange={e => setFormData({...formData, priceMin: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 font-medium" placeholder="VD: 50.5" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Loại hình</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 font-bold bg-white focus:bg-white cursor-pointer hover:bg-gray-50">
                <option>Căn hộ</option>
                <option>Nhà phố</option>
                <option>Biệt thự</option>
                <option>Shophouse</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Hình ảnh phối cảnh dự án (Tự động tải lên Supabase)</label>
            <Dropzone multiple onUploadComplete={(urls) => setImages(prev => [...prev, ...urls])} />
            
            {images.length > 0 && (
              <div className="mt-4 p-4 border border-gray-100 rounded-2xl bg-gray-50 flex items-center gap-4 overflow-x-auto">
                 {images.map((src, i) => (
                   <div key={i} className="relative group w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                      <img src={src} className="w-full h-full object-cover" alt="Upload" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold text-sm transition-opacity">Xóa</button>
                   </div>
                 ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
             <label className="text-sm font-bold text-gray-700">Mô tả tóm tắt (Summary)</label>
             <textarea rows={3} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} placeholder="Đoạn mô tả ngắn hiển thị ở trang chủ hoặc thẻ dự án..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 font-medium" />
          </div>

          <div className="space-y-2 pb-16">
             <label className="text-sm font-bold text-gray-700">Nội dung chi tiết (Rich Text)</label>
             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden min-h-[300px]">
                <ReactQuill theme="snow" value={formData.content} onChange={val => setFormData({...formData, content: val})} className="h-[250px] bg-white text-gray-900 border-none" />
             </div>
          </div>

          <div className="flex justify-end pt-8 border-t border-gray-100">
            <button type="submit" disabled={loading} className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md shadow-indigo-200 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2">
               {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
               {loading ? "Đang xử lý..." : "Lưu dữ liệu Dự Án"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 md:px-0 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Quản lý Dự án</h2>
          <p className="text-gray-500 mt-1 font-medium">Danh sách các dự án đầy đủ thông tin.</p>
        </div>
        <button onClick={openAddForm} className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-md shadow-indigo-200/50 transition-all cursor-pointer">
          <Plus className="w-5 h-5" /> Thêm dự án mới
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 bg-gray-50/50">
           <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
             <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm tên dự án..." className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-medium text-gray-900 bg-white shadow-sm" />
           </div>
           <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl text-gray-900 font-bold bg-white outline-none focus:border-indigo-500 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
             <option value="All">Phân khúc: Tất cả</option>
             <option value="Căn hộ">Căn hộ</option>
             <option value="Nhà phố">Nhà phố</option>
             <option value="Biệt thự">Biệt thự</option>
             <option value="Shophouse">Shophouse</option>
           </select>
        </div>
        <div className="overflow-x-auto w-full">
          
          <table className="w-full text-left border-collapse hidden md:table">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-bold text-gray-600 uppercase tracking-widest">
                <th className="p-5">Tên & ID</th>
                <th className="p-5">Mô tả (Tóm tắt)</th>
                <th className="p-5">Phân khúc</th>
                <th className="p-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="p-5">
                     <p className="font-black text-gray-900">{p.title}</p>
                     <p className="text-[10px] text-gray-400 font-bold tracking-wider">{p.slug}</p>
                  </td>
                  <td className="p-5 max-w-xs">
                    <p className="text-gray-600 text-sm font-medium line-clamp-2">{stripHtml(p.summary || p.content || 'Đang cập nhật')}</p>
                  </td>
                  <td className="p-5">
                    <span className="px-3.5 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-black shadow-sm border border-indigo-100">{p.type}</span>
                  </td>
                  <td className="p-5 flex items-center justify-end gap-2">
                    <button onClick={() => openEditForm(p)} className="p-2 text-indigo-500 hover:text-indigo-700 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-indigo-100 cursor-pointer"><Edit2 className="w-5 h-5" /></button>
                    <button onClick={() => handleDelete(p.id, p.title)} className="p-2 text-red-500 hover:text-red-700 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-red-100 cursor-pointer"><Trash2 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                   <td colSpan={4} className="p-8 text-center text-gray-500 font-medium">Không tìm thấy dự án phù hợp.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Mobile responsive Cards */}
          <div className="md:hidden flex flex-col gap-4 p-4 bg-gray-50">
             {filtered.map(p => (
               <div key={p.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-lg text-gray-900">{p.title}</h3>
                    <span className="bg-indigo-100 text-indigo-700 font-bold text-[10px] px-2 py-1 rounded-md uppercase tracking-wider">{p.type}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{stripHtml(p.summary || p.content || 'Đang cập nhật')}</p>
                  <div className="flex justify-between border-t border-gray-50 pt-3">
                     <span className="text-sm font-bold text-gray-900">{p.priceMin ? `Từ ${p.priceMin} tỷ` : <span className="text-gray-400">Giá: Liên hệ</span>}</span>
                     <div className="flex gap-2">
                        <button onClick={() => openEditForm(p)} className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 p-2.5 rounded-xl cursor-pointer transition-colors"><Edit2 className="w-4 h-4"/></button>
                        <button onClick={() => handleDelete(p.id, p.title)} className="text-red-600 bg-red-50 hover:bg-red-100 p-2.5 rounded-xl cursor-pointer transition-colors"><Trash2 className="w-4 h-4"/></button>
                     </div>
                  </div>
               </div>
             ))}
             {filtered.length === 0 && (
                <p className="text-center text-gray-500 font-medium py-8">Không có dữ liệu.</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
