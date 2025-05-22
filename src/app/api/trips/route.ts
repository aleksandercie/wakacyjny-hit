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

export async function GET(req: Request) {
  const url = req.url;

  const urlValidation = schema.safeParse(url);
  if (!urlValidation.success) {
    return NextResponse.json(
      { error: urlValidation.error.message },
      { status: 400 }
    );
  }
  const { searchParams } = new URL(url);

  const search = searchParams.get('search');
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 10000;
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const departures = searchParams.getAll('departures');
  const food = searchParams.getAll('food');

  const limit = Number(searchParams.get('limit')) || 6;
  const offset = Number(searchParams.get('offset')) || 0;

  // Append .range() to paginate
  let query = supabase
    .from('trips_offers')
    .select('*')
    .gte('price', minPrice)
    .lte('price', maxPrice)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  // search for title and tags
  if (search) {
    query = query.or(`title.ilike.%${search}%,tags.cs.{${search}}`);
  }

  if (from) query = query.gte('startDate', from);
  if (to) query = query.lte('endDate', to);

  if (departures.length > 0) {
    query = query.overlaps('departures', departures);
  }

  if (food.length > 0) {
    query = query.overlaps('food', food);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
