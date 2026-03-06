import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get('q') || '';

        if (!q || q.length < 2) {
            return NextResponse.json({ projects: [], units: [] });
        }

        const [projects, units] = await Promise.all([
            prisma.project.findMany({
                where: { title: { contains: q, mode: 'insensitive' } },
                select: { id: true, title: true, slug: true },
                take: 5
            }),
            prisma.unit.findMany({
                where: {
                    OR: [
                        { title: { contains: q, mode: 'insensitive' } },
                        { building: { contains: q, mode: 'insensitive' } },
                    ]
                },
                select: { id: true, title: true, slug: true, project: { select: { title: true } } },
                take: 5
            })
        ]);

        return NextResponse.json({ projects, units });
    } catch (error) {
        console.error('Error suggesting search:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
