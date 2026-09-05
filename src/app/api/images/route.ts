
import { NextResponse } from 'next/server';
import imagesData from '@/lib/imagenes.json';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours static revalidation

export async function GET() {
  return NextResponse.json(imagesData, {
    headers: {
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
