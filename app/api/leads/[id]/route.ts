import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: Params) {
    try {
        const { id } = await context.params;
        const lead = await prisma.lead.findUnique({
            where: { id }
        });
        if (!lead) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
        return NextResponse.json(lead);
    } catch (error) {
        console.error('Error fetching lead:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request, context: Params) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        const lead = await prisma.lead.update({
            where: { id },
            data,
        });
        return NextResponse.json(lead);
    } catch (error) {
        console.error('Error updating lead:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: Params) {
    try {
        const { id } = await context.params;
        await prisma.lead.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting lead:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
