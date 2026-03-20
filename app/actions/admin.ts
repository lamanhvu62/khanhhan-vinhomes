"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import DOMPurify from 'isomorphic-dompurify';

const sanitizeHtml = (html: string) => {
  if (!html) return html;
  const cleanHtml = html.replace(/&nbsp;/g, ' ');
  return DOMPurify.sanitize(cleanHtml);
};

export async function getDashboardStats() {
  const [totalProjects, totalPosts, totalUnits, totalLeads] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.unit.count({ where: { status: "Available" } }),
    prisma.lead.count()
  ]);
  
  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  return { totalProjects, totalPosts, totalUnits, totalLeads, recentLeads };
}

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function createProject(data: any) {
  try {
    const images = data.images || [];
    const heroImage = data.heroImage || (images.length > 0 ? images[0] : null);

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now(),
        type: data.type || "Apartment",
        location: data.location,
        summary: data.summary ? sanitizeHtml(data.summary) : '',
        heroImage: heroImage,
        priceMin: data.priceMin ? parseFloat(data.priceMin) : null,
        content: data.content ? sanitizeHtml(data.content) : '',
        images: images
      }
    });
    revalidatePath('/admin');
    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProject(id: string, data: any) {
  try {
    const images = data.images || [];
    const heroImage = data.heroImage || (images.length > 0 ? images[0] : null);

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        type: data.type || "Apartment",
        location: data.location,
        summary: data.summary ? sanitizeHtml(data.summary) : '',
        heroImage: heroImage,
        priceMin: data.priceMin ? parseFloat(data.priceMin) : null,
        content: data.content ? sanitizeHtml(data.content) : '',
        images: images
      }
    });
    revalidatePath('/admin');
    return { success: true, project };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath('/admin');
}

export async function getUnits(filters?: { projectId?: string; status?: string; search?: string }) {
  let where: any = {};
  if (filters?.projectId) where.projectId = filters.projectId;
  if (filters?.status && filters.status !== 'All') where.status = filters.status;
  if (filters?.search) where.title = { contains: filters.search, mode: 'insensitive' };

  return await prisma.unit.findMany({
    where,
    include: { project: { select: { title: true } } },
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateUnitStatus(id: string, status: string) {
  try {
    await prisma.unit.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getPosts() {
  return await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function createPost(data: any) {
  try {
    await prisma.post.create({
      data: {
        title: data.title,
        slug: data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now(),
        content: data.content ? sanitizeHtml(data.content) : '',
        coverImage: data.coverImage
      }
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getLeads() {
  return await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });
}
