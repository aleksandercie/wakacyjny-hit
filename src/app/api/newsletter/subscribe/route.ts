import { NextResponse } from 'next/server';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { supabase } from '@/lib/supabaseClient';

const schema = z.object({
  email: z.string().email()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const { email } = parsed.data;
    const token = randomUUID();

    // Check if email exists
    const { data: existing, error: fetchError } = await supabase
      .from('newsletter_subscribers')
      .select('is_confirmed')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 = No rows found — acceptable
      console.error('Error checking existing email:', fetchError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (existing?.is_confirmed) {
      // Email already confirmed — silently succeed
      return NextResponse.json({ success: true });
    }

    // Insert new or update unconfirmed
    const { error: upsertError } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, token, is_confirmed: false });

    if (upsertError) {
      console.error('Upsert error:', upsertError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter-confirm?token=${token}`;

    // Replace this with real email-sending logic
    console.log(`Send confirmation email to ${email}: ${confirmUrl}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error in POST:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
