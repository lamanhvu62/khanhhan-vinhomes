import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const unitId = searchParams.get('unitId');
        const take = parseInt(searchParams.get('limit') || '3', 10);

        if (!unitId) {
            return NextResponse.json({ error: 'Missing unitId' }, { status: 400 });
        }

        const currentUnit = await prisma.unit.findUnique({
            where: { id: unitId }
        });

        if (!currentUnit) {
            return NextResponse.json({ error: 'Unit not found' }, { status: 404 });
        }

        // basic AI recommendation algorithm (content-based filtering)
        // 1. same project
        // 2. similar price (±20%)
        // 3. limit results
        const currentPrice = currentUnit.price || 0;
        const margin = currentPrice * 0.2;
        const minPrice = currentPrice - margin;
        const maxPrice = currentPrice + margin;

        const recommendations = await prisma.unit.findMany({
            where: {
                id: { not: unitId },
                projectId: currentUnit.projectId,
                price: {
                    gte: minPrice,
                    lte: maxPrice
                }
            },
            include: { project: true },
            take,
            orderBy: {
                createdAt: 'desc'
            }
        });

        // fallback if no recommendations found from same criteria
        if (recommendations.length < take) {
            const fallbacks = await prisma.unit.findMany({
                where: {
                    id: { not: unitId, notIn: recommendations.map((r: { id: string }) => r.id) }
                },
                include: { project: true },
                take: take - recommendations.length,
                orderBy: { price: 'asc' } // random or nearest price could be better, sorting by ascending price here
            });
            return NextResponse.json([...recommendations, ...fallbacks]);
        }

        return NextResponse.json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
