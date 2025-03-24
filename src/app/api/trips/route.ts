import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get('search');
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 10000;
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const departures = searchParams.getAll('departures');
  const food = searchParams.getAll('food');

  let query = supabase
    .from('trips_offers')
    .select('*')
    .gte('price', minPrice)
    .lte('price', maxPrice)
    .order('created_at', { ascending: false });

  if (search) {
    query = query.ilike('title', `%${search}%`);
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
