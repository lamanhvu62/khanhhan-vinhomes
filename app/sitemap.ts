import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://vinhomespro.vn'; // Example Domain

    const projects = await prisma.project.findMany({ select: { slug: true, updatedAt: true } });
    const units = await prisma.unit.findMany({ select: { slug: true, updatedAt: true } });
    const posts = await prisma.post.findMany({ select: { slug: true, updatedAt: true } });

    const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${baseUrl}/du-an/${project.slug}`,
        lastModified: project.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const unitUrls: MetadataRoute.Sitemap = units.map((unit) => ({
        url: `${baseUrl}/san-pham/${unit.slug}`,
        lastModified: unit.updatedAt,
        changeFrequency: 'daily',
        priority: 0.9,
    }));

    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/tin-tuc/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    const staticUrls: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/du-an`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/san-pham`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
        { url: `${baseUrl}/tin-tuc`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/lien-he`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ];

    return [...staticUrls, ...projectUrls, ...unitUrls, ...postUrls];
}
