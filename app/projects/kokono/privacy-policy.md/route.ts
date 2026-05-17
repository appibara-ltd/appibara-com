import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    const filePath = path.join(process.cwd(), 'markdown', 'kokono', 'privacy-policy.md');
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        return new NextResponse(fileContent, {
            headers: {
                'Content-Type': 'text/markdown; charset=utf-8',
            },
        });
    } catch (e) {
        return new NextResponse('File not found', { status: 404 });
    }
}
