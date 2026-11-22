import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export const dynamic = 'force-static';

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    'markdown',
    'case-closed',
    'privacy-policy.md',
  );
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    });
  } catch {
    return new NextResponse('File not found', { status: 404 });
  }
}
