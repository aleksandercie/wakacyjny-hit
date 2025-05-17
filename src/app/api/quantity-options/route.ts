import { NextResponse } from 'next/server';
import { quantityOptions } from '@/lib/quantityOptions';

export async function GET() {
  return NextResponse.json(quantityOptions);
}
