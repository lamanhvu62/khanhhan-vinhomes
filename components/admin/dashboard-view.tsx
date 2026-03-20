import React from 'react';
import { MdBusiness as Building2, MdArticle as FileText, MdGridView as Grid, MdPeople as Users, MdTrendingUp as TrendingUp } from "react-icons/md";

export default function DashboardView({ stats }: { stats: any }) {
  const { totalProjects = 0, totalPosts = 0, totalUnits = 0, totalLeads = 0, recentLeads = [] } = stats || {};

  const cards = [
    { title: "Tổng số dự án", value: totalProjects, icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Tổng số bài viết", value: totalPosts, icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Phòng/Căn đang trống", value: totalUnits, icon: Grid, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Khách ĐK tư vấn", value: totalLeads, icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 md:px-0 transition-opacity duration-300">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Tổng quan hệ thống</h2>
        <p className="text-gray-500 mt-1">Theo dõi hoạt động kinh doanh bất động sản của bạn.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-[400px]">
           <h3 className="font-semibold text-lg text-gray-900 mb-4">Biểu đồ (Tích hợp sau)</h3>
           <div className="flex-1 rounded-xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center">
             <p className="text-gray-400 font-medium flex items-center gap-2">
               <TrendingUp className="w-5 h-5"/> Biểu đồ tăng trưởng
             </p>
           </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-[400px]">
           <h3 className="font-semibold text-lg text-gray-900 mb-4">Khách đăng ký mới nhất</h3>
           <div className="flex-1 space-y-4 overflow-y-auto pr-2">
             {recentLeads.length === 0 ? <p className="text-gray-500 text-sm">Chưa có khách đăng ký.</p> : recentLeads.map((lead: any) => (
               <div key={lead.id} className="flex gap-4 items-start p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-default">
                 <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                 <div>
                   <p className="text-sm text-gray-900 font-bold">{lead.name || lead.phone}</p>
                   <p className="text-xs text-gray-500 mt-1 line-clamp-1">{lead.message || "Không để lại lời nhắn"}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
