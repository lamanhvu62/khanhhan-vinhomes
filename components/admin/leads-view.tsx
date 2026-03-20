"use client";
import React, { useState } from 'react';
import { MdMail as Mail, MdPhone as Phone, MdOpenInNew as ExternalLink, MdCalendarToday as Calendar, MdSearch as Search } from 'react-icons/md';
import { useToast } from '@/components/admin/toast-context';

export default function LeadsView({ leads = [] }: { leads?: any[] }) {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');

  const filtered = leads.filter(l => 
    l.phone.includes(search) || 
    (l.name && l.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 md:px-0 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Leads (Khách Hàng)</h2>
          <p className="text-gray-500 mt-1">Danh sách khách hàng để lại thông tin mới nhất.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
           <div className="relative flex-1 max-w-md">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
             <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm SĐT hoặc tên..." className="bg-white text-gray-900 w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" />
           </div>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
             <p className="text-gray-500 p-4 w-full text-center font-medium">Chưa có dữ liệu khách hàng.</p>
          ) : filtered.map(lead => (
            <div key={lead.id} className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
               <div className="flex justify-between items-start mb-3">
                 <h3 className="text-lg font-black text-gray-900">{lead.name || "Khách Hàng Vô Danh"}</h3>
                 <span className="text-xs text-gray-500 font-bold bg-gray-100 px-2 py-1 rounded-lg flex items-center gap-1">
                   <Calendar className="w-3 h-3"/> {new Date(lead.createdAt).toLocaleDateString()}
                 </span>
               </div>
               
               <div className="space-y-2 mb-4">
                  <p className="flex items-center text-sm font-bold text-indigo-700 gap-2"><Phone className="w-4 h-4"/> {lead.phone}</p>
                  {lead.email && <p className="flex items-center text-sm font-medium text-gray-600 gap-2"><Mail className="w-4 h-4"/> {lead.email}</p>}
               </div>
               
               {lead.message && (
                  <div className="bg-amber-50 rounded-xl p-3 mb-4">
                    <p className="text-sm font-medium text-amber-900 line-clamp-2">"{lead.message}"</p>
                  </div>
               )}

               <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-sm">
                 <div className="text-gray-500 font-medium">Nguồn: <span className="font-bold text-indigo-500">{lead.page || "Trang chủ"}</span></div>
                 <button onClick={() => showToast("Đã duyệt/Gọi xong")} className="text-xs px-3 py-1.5 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 font-bold text-gray-600 rounded-full transition-colors">Đánh dấu xử lý</button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
