import { NextResponse } from 'next/server';
import { quantityOptions } from '@/lib/quantityOptions';

export async function GET() {
  const res = NextResponse.json(quantityOptions);
  res.headers.set(
    'Cache-Control',
    'public, max-age=86400, stale-while-revalidate=59'
  );
  return res;
}
