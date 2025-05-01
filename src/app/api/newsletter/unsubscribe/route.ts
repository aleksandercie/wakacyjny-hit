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

    const { data: existing, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('token', token)
      .eq('is_confirmed', true)
      .single();

    if (findError || !existing) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 }
      );
    }

    const { error: deleteError } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', existing.id);

    if (deleteError) {
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unsubscribe error:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
