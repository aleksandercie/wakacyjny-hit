import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabaseClient';

const schema = z.object({
  token: z.string().min(10)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const { token } = parsed.data;

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ is_confirmed: true, confirmed_at: new Date().toISOString() })
      .eq('token', token)
      .eq('is_confirmed', false)
      .select();

    if (error || !data || data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter confirm error:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
