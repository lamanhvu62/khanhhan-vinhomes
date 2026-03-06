import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const keyword = searchParams.get('keyword') || '';
        const projectId = searchParams.get('projectId') || '';
        const priceRange = searchParams.get('price') || '';
        const unitType = searchParams.get('type') || '';

        // Construct where clause dynamically
        const where: Prisma.UnitWhereInput = {};

        if (keyword) {
            where.OR = [
                { title: { contains: keyword, mode: 'insensitive' } },
                { content: { contains: keyword, mode: 'insensitive' } },
                { building: { contains: keyword, mode: 'insensitive' } }
            ];
        }

        if (projectId) {
            where.project = {
                slug: projectId // assuming projectId is actually slug for easy frontend use
            };
        }

        if (unitType) {
            where.unitType = { contains: unitType, mode: 'insensitive' };
        }

        if (priceRange) {
            if (priceRange === 'under-2') {
                where.price = { lt: 2000000000 };
            } else if (priceRange === '2-5') {
                where.price = { gte: 2000000000, lte: 5000000000 };
            } else if (priceRange === 'above-5') {
                where.price = { gt: 5000000000 };
            }
        }

        const units = await prisma.unit.findMany({
            where,
            include: { project: true },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(units);
    } catch (error) {
        console.error('Error searching units:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
