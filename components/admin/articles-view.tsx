"use client";
import React, { useState } from 'react';
import { HiPlus as Plus, HiDocumentText as FileText, HiViewBoards as LayoutTemplate, HiTrash as Trash2, HiPencil as Edit2, HiCheckCircle as CheckCircle2 } from 'react-icons/hi';
import Dropzone from '@/components/admin/dropzone';
import { useToast } from '@/components/admin/toast-context';
import { createPost } from '@/app/actions/admin';
import dynamic from 'next/dynamic';

import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false, loading: () => <p>Đang tải trình soạn thảo...</p> });
import 'react-quill-new/dist/quill.snow.css';

export default function ArticlesView({ posts = [] }: { posts?: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const { showToast } = useToast();
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createPost({ title, content, coverImage });
    setLoading(false);
    
    if (res.success) {
       showToast("Bài viết đã được xuất bản thành công!");
       setIsAdding(false);
       router.refresh();
    } else {
       showToast("Có lỗi: " + res.error, "error");
    }
  };

  if (isAdding) {
    return (
      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto px-4 md:px-0 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Soạn bài viết mới</h2>
          <button onClick={() => setIsAdding(false)} className="px-5 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-bold transition-colors shadow-sm">Thoát soạn thảo</button>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
          <div className="space-y-2">
            <input required value={title} onChange={e => setTitle(e.target.value)} type="text" className="w-full px-6 py-5 text-xl font-black rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-gray-900 bg-white placeholder:text-gray-300" placeholder="Viết một tiêu đề thật hấp dẫn cho bài viết..." />
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-700 flex items-center gap-2 uppercase tracking-widest"><LayoutTemplate className="w-4 h-4 text-indigo-500"/> Ảnh đại diện (Cover Image)</label>
            <Dropzone onUploadComplete={(urls) => setCoverImage(urls[0] || '')} />
          </div>

          <div className="space-y-3 pb-16">
             <label className="text-sm font-black text-gray-700 flex items-center gap-2 uppercase tracking-widest"><FileText className="w-4 h-4 text-indigo-500"/> Nội dung chi tiết</label>
             <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm h-[400px]">
                <ReactQuill theme="snow" value={content} onChange={setContent} className="h-full border-none text-gray-900" />
             </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100 gap-4">
            <button type="submit" disabled={loading} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-lg shadow-indigo-200/50 transition-all flex items-center gap-2 disabled:opacity-50 text-lg">
              {loading ? "Đang xử lý..." : <><CheckCircle2 className="w-6 h-6" /> Xuất bản bài viết</>}
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
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Bài viết / Tin tức</h2>
          <p className="text-gray-500 mt-1 font-medium">Trình quản lý nội dung và bài viết blog.</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-md shadow-indigo-200/50 transition-all">
          <Plus className="w-5 h-5" /> Soạn bài viết
        </button>
      </div>

       {posts.length === 0 ? (
       <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center mt-8">
          <div className="w-24 h-24 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6">
             <FileText className="w-10 h-10 text-indigo-500" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Chưa có bài viết</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg leading-relaxed font-medium">Giúp khách hàng hiểu rõ hơn về thị trường và dự án với các thông tin cập nhật.</p>
          <button onClick={() => setIsAdding(true)} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-indigo-100 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 rounded-2xl font-black transition-all shadow-sm text-lg">
             Viết nội dung đầu tiên
          </button>
       </div>
       ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {posts.map(post => (
           <div key={post.id} className="bg-white border text-gray-900 border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all group flex flex-col overflow-hidden">
             {post.coverImage ? (
               <img src={post.coverImage} className="w-full h-48 object-cover" alt={post.title} />
             ) : (
               <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 font-bold tracking-widest uppercase">No Image</div>
             )}
             <div className="p-5 flex-1 flex flex-col">
               <h3 className="text-xl font-black text-gray-900 leading-tight mb-2 line-clamp-2">{post.title}</h3>
               <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest mb-4">Ngày đăng: {new Date(post.publishedAt).toLocaleDateString()}</p>
               <div className="mt-auto border-t border-gray-50 pt-4 flex items-center justify-between">
                 <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold transition-colors">
                   <Edit2 className="w-4 h-4" /> Chỉnh sửa
                 </button>
                 <button className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg">
                   <Trash2 className="w-4 h-4" />
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>
       )}
    </div>
  );
}
