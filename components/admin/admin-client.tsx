"use client";
import React, { useState } from 'react';
import { MdDashboard as LayoutDashboard, MdBusiness as Building2, MdGridView as Grid, MdArticle as FileText, MdMenu as Menu, MdClose as X, MdNotifications as Bell, MdPeople as Users, MdVisibility as Eye } from 'react-icons/md';
import DashboardView from '@/components/admin/dashboard-view';
import ProjectsView from '@/components/admin/projects-view';
import UnitsView from '@/components/admin/units-view';
import ArticlesView from '@/components/admin/articles-view';
import LeadsView from '@/components/admin/leads-view';
import { ToastProvider, useToast } from '@/components/admin/toast-context';
import Link from 'next/link';

function AdminContent({ 
   stats, 
   projects, 
   units, 
   posts, 
   leads 
}: { 
   stats: any; projects: any[]; units: any[]; posts: any[]; leads: any[] 
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { showToast } = useToast();

  const menu = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'projects', label: 'Quản lý Dự án', icon: Building2 },
    { id: 'units', label: 'Bảng hàng (Unit)', icon: Grid },
    { id: 'leads', label: 'DS Khách hàng', icon: Users },
    { id: 'articles', label: 'Bài viết & Blog', icon: FileText },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAFAFA] flex overflow-hidden font-sans text-gray-900">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 bg-white border-r border-gray-100 w-[280px] z-50 transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static flex flex-col shadow-2xl lg:shadow-none ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-20 flex items-center px-6 border-b border-gray-50 flex-shrink-0">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-md mr-3 text-white">
             <span className="font-black text-xl">VP</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">Vinhomes<span className="text-black font-black">Pro</span></h1>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-200 p-2 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menu.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${
                activeTab === item.id 
                  ? 'bg-black text-white shadow-md shadow-gray-200' 
                  : 'text-gray-500 hover:bg-gray-100/80 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-[22px] h-[22px] ${activeTab === item.id ? 'text-white' : 'text-gray-400'}`} />
              <span className="tracking-wide text-[15px]">{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-50 bg-gray-50/50">
           <Link href="/" target="_blank" className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group">
              <Eye className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" /> Xem web thực tế
           </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full relative z-0 overflow-hidden bg-[#FAFAFA]">
        <header className="h-20 bg-white/70 backdrop-blur-2xl border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 z-10 flex-shrink-0 sticky top-0">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 mr-3 text-gray-600 lg:hidden bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 lg:hidden tracking-tight">Admin<span className="text-indigo-600">Pro</span></h2>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <button onClick={() => showToast("Hệ thống đồng bộ Data Supabase tốt!")} className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 relative shadow-sm transition-all focus:outline-none">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2.5 right-3 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="w-px h-8 bg-gray-200 hidden md:block"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-white p-1.5 md:pr-4 rounded-full md:rounded-2xl border border-transparent md:hover:border-gray-200 transition-all shadow-sm md:shadow-none">
               <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-black text-sm shadow-md ring-2 ring-white uppercase">
                 AD
               </div>
               <div className="hidden md:block text-left">
                 <p className="text-sm font-black text-gray-900 leading-tight">Admin Tổng</p>
                 <p className="text-xs text-gray-500 font-bold mt-0.5 tracking-wide">Quản trị viên</p>
               </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scroll-smooth p-4 lg:p-8">
          <div className="mx-auto w-full transition-all">
            {activeTab === 'dashboard' && <DashboardView stats={stats} />}
            {activeTab === 'projects' && <ProjectsView projects={projects} />}
            {activeTab === 'units' && <UnitsView units={units} projects={projects} />}
            {activeTab === 'leads' && <LeadsView leads={leads} />}
            {activeTab === 'articles' && <ArticlesView posts={posts} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminClientDataWrapper(props: any) {
   return (
      <ToastProvider>
         <AdminContent {...props} />
      </ToastProvider>
   );
}
