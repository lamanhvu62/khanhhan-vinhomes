"use client";
import React, { useState } from 'react';
import { MdAdd as Plus, MdSearch as Search, MdMap as Map } from 'react-icons/md';
import { useToast } from '@/components/admin/toast-context';
import { updateUnitStatus } from '@/app/actions/admin';

export default function UnitsView({ units = [], projects = [] }: { units?: any[], projects?: any[] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [projectFilter, setProjectFilter] = useState('All');
  const [unitTypeFilter, setUnitTypeFilter] = useState('All');
  const { showToast } = useToast();

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Available": return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
      case "Booked": return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
      case "Sold": return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  }

  const handleStatusChange = async (unitId: string, newStatus: string) => {
    const res = await updateUnitStatus(unitId, newStatus);
    if (res.success) showToast(`Cập nhật thành công thành ${newStatus}`, "success");
    else showToast("Lỗi: " + res.error, "error");
  }

  const filtered = units.filter(u => 
    u.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'All' || u.status === statusFilter) &&
    (projectFilter === 'All' || u.projectId === projectFilter) &&
    (unitTypeFilter === 'All' || u.unitType === unitTypeFilter)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 md:px-0 py-4">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Quản lý Unit / Căn hộ</h2>
          <p className="text-gray-500 mt-1 font-medium">Bảng hàng trực tuyến, thao tác nhanh nhẹn.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-md shadow-indigo-200/50 transition-all">
          <Plus className="w-5 h-5" /> Import từ Excel
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 bg-gray-50/50">
           <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
             <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Mã căn/Tên..." className="bg-white text-gray-900 w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-bold shadow-sm" />
           </div>
           
           <div className="flex flex-wrap md:flex-nowrap gap-3">
             <select value={projectFilter} onChange={e => setProjectFilter(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl text-gray-900 font-bold bg-white outline-none focus:border-indigo-500 shadow-sm grow cursor-pointer">
               <option value="All">Dự án: Tất cả</option>
               {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
             </select>
             
             <select value={unitTypeFilter} onChange={e => setUnitTypeFilter(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl text-gray-900 font-bold bg-white outline-none focus:border-indigo-500 shadow-sm cursor-pointer">
               <option value="All">Loại: Tất cả</option>
               <option value="1PN">1 Phòng ngủ</option>
               <option value="2PN">2 Phòng ngủ</option>
               <option value="3PN">3 Phòng ngủ</option>
               <option value="Studio">Studio</option>
             </select>

             <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl text-gray-900 font-bold bg-white outline-none focus:border-indigo-500 shadow-sm cursor-pointer">
               <option value="All">Trạng thái (Tất cả)</option>
               <option value="Available">Đang mở bán</option>
               <option value="Booked">Đã giữ chỗ</option>
               <option value="Sold">Đã bán</option>
             </select>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          {filtered.length === 0 ? <p className="col-span-full text-center text-gray-500 p-8 font-medium">Không tìm thấy mã căn nào.</p> : filtered.map(unit => (
            <div key={unit.id} className="bg-white border hover:border-indigo-300 text-gray-900 border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all group relative overflow-hidden flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-2">{unit.title}</h3>
                    <div className="flex items-center text-indigo-700 font-bold text-xs bg-indigo-50 px-2 py-1 rounded w-max">
                      <Map className="w-3 h-3 mr-1" /> {unit.project?.title || "N/A"}
                    </div>
                  </div>
                  <select 
                     value={unit.status} 
                     onChange={(e) => handleStatusChange(unit.id, e.target.value)}
                     className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg border outline-none cursor-pointer transition-colors ${getStatusColor(unit.status)}`}>
                    <option value="Available">Available</option>
                    <option value="Booked">Booked (Booking)</option>
                    <option value="Sold">Sold (Đã bán)</option>
                  </select>
                </div>
                <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="text-center w-full">
                     <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1 mt-1">Diện tích</p>
                     <p className="font-black text-gray-900 text-lg">{unit.area ? `${unit.area}m2` : '-'}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200 shrink-0"></div>
                  <div className="text-center w-full">
                     <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1 mt-1">Loại PN</p>
                     <p className="font-black text-gray-900 text-lg">{unit.unitType}</p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-4 border-t border-gray-50/80 bg-gray-50 flex items-center justify-between text-sm">
                 <span className="font-black text-gray-900 text-lg">{unit.price ? unit.price.toLocaleString() + ' Tỷ' : 'Liên hệ'}</span>
                 <button className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Sửa chi tiết</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
