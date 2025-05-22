import { rateLimit } from '@/redis';
import { NextResponse } from 'next/server';

export async function checkRateLimit(
  request: Request,
  keyPrefix: string
): Promise<true | NextResponse> {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous';

  const key = `${keyPrefix}-${ip}`;
  const result = await rateLimit.limit(key, {});
  console.log('Rate limit result:', result);

  if (!result.success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  return true;
}
