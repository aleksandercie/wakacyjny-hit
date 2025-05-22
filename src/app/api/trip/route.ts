import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z
  .string()
  .url()
  .refine(
    (url) => {
      return url.startsWith('http://') || url.startsWith('https://');
    },
    {
      message: 'URL must start with http:// or https://'
    }
  );

export async function GET(request: Request) {
  const url = request.url;

  const urlValidation = schema.safeParse(url);
  if (!urlValidation.success) {
    return NextResponse.json(
      { error: urlValidation.error.message },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing trip ID' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('trips_offers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
