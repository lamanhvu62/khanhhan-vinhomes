import React from 'react';
import { getDashboardStats, getProjects, getUnits, getPosts, getLeads } from '@/app/actions/admin';
import AdminClientDataWrapper from '@/components/admin/admin-client';

export const metadata = {
  title: 'Admin Dashboard | Vinhomes Pro',
  description: 'Hệ thống quản trị nội bộ dành cho Vinhomes Pro',
};

// Vô hiệu hóa caching để admin luôn hiển thị dữ liệu mới nhất
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPage() {
  // Lấy dữ liệu bằng Prisma Server Actions
  const [stats, projects, units, posts, leads] = await Promise.all([
    getDashboardStats(),
    getProjects(),
    getUnits(),
    getPosts(),
    getLeads()
  ]);

  return (
    <AdminClientDataWrapper 
       stats={stats}
       projects={projects}
       units={units}
       posts={posts}
       leads={leads}
    />
  );
}
