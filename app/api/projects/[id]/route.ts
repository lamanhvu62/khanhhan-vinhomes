import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: Params) {
    try {
        const { id } = await context.params;
        const project = await prisma.project.findUnique({
            where: { id },
            include: { units: true },
        });
        if (!project) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
        return NextResponse.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request, context: Params) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        const project = await prisma.project.update({
            where: { id },
            data,
        });
        return NextResponse.json(project);
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: Params) {
    try {
        const { id } = await context.params;
        await prisma.project.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
