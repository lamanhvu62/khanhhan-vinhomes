import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: Params) {
    try {
        const { id } = await context.params;
        const unit = await prisma.unit.findUnique({
            where: { id },
            include: { project: true }
        });
        if (!unit) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
        return NextResponse.json(unit);
    } catch (error) {
        console.error('Error fetching unit:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request, context: Params) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        const unit = await prisma.unit.update({
            where: { id },
            data,
        });
        return NextResponse.json(unit);
    } catch (error) {
        console.error('Error updating unit:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: Params) {
    try {
        const { id } = await context.params;
        await prisma.unit.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting unit:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
