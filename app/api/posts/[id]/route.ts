import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: Params) {
    try {
        const { id } = await context.params;
        const post = await prisma.post.findUnique({
            where: { id }
        });
        if (!post) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request, context: Params) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        const post = await prisma.post.update({
            where: { id },
            data,
        });
        return NextResponse.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: Params) {
    try {
        const { id } = await context.params;
        await prisma.post.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
