import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const units = await prisma.unit.findMany({
            orderBy: { createdAt: 'desc' },
            include: { project: { select: { title: true } } }
        });
        return NextResponse.json(units);
    } catch (error) {
        console.error('Error fetching units:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const unit = await prisma.unit.create({ data });
        return NextResponse.json(unit, { status: 201 });
    } catch (error) {
        console.error('Error creating unit:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
