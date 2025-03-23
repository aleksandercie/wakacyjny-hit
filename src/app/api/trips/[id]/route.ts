import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { Trip } from '@/types/trip';

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<Trip | { error: string }>
) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid trip ID' });
  }

  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  return res.status(200).json(data);
}
