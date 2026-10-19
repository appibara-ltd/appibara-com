import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang');

  const fileName =
    lang === 'tr' ? 'terms-and-conditions-tr.md' : 'terms-and-conditions.md';
  const filePath = path.join(process.cwd(), 'markdown', 'kokono', fileName);
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
