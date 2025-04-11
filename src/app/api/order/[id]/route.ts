// app/api/order/[id]/route.ts

import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { status, stripe_payment_intent_id } = body;

    const { error } = await supabase
      .from('orders')
      .update({
        status,
        stripe_payment_intent_id: stripe_payment_intent_id
      })
      .eq('id', id);

    if (error) {
      console.error('Supabase update error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error in PATCH:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
