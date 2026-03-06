import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const lead = await prisma.lead.create({ data });
        return NextResponse.json(lead, { status: 201 });
    } catch (error) {
        console.error('Error creating lead:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
