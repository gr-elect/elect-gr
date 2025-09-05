import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseClient';
import { PARTY_CHOICES } from '@/lib/schema';

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    
    // Χρησιμοποιούμε ένα αποδοτικό SQL query για να πάρουμε όλα τα counts με ένα request
    const { data, error } = await supabaseAdmin.rpc('get_vote_results', {
      poll_type_param: 'party_preference',
      days_limit: 30
    });

    if (error) {
      console.error('Database error:', error);
      
      // Fallback: Αν το stored procedure δεν υπάρχει, χρησιμοποιούμε το παλιό τρόπο αλλά βελτιστοποιημένα
      const { data: fallbackData, error: fallbackError } = await supabaseAdmin
        .from('votes')
        .select('choice')
        .eq('poll_type', 'party_preference')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      if (fallbackError) {
        console.error('Fallback query error:', fallbackError);
        return NextResponse.json(
          { error: 'Database error' },
          { status: 500 }
        );
      }

      // Μετράμε τα αποτελέσματα client-side
      const counts: Record<string, number> = {};
      PARTY_CHOICES.forEach(choice => counts[choice] = 0);
      
      fallbackData?.forEach(vote => {
        if (counts[vote.choice] !== undefined) {
          counts[vote.choice]++;
        }
      });

      const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
      const results = PARTY_CHOICES.map(choice => ({
        choice,
        count: counts[choice],
        pct: total > 0 ? Math.round((counts[choice] / total) * 100 * 10) / 10 : 0
      }));

      const response = NextResponse.json({ total, data: results });
      response.headers.set('Cache-Control', 'public, max-age=60'); // Cache για 1 λεπτό
      return response;
    }

    // Αν το stored procedure λειτουργεί, χρησιμοποιούμε τα αποτελέσματά του
    const total = data?.reduce((sum: number, item: any) => sum + (item.vote_count || 0), 0) || 0;
    const results = PARTY_CHOICES.map(choice => {
      const found = data?.find((item: any) => item.choice === choice);
      const count = found?.vote_count || 0;
      return {
        choice,
        count,
        pct: total > 0 ? Math.round((count / total) * 100 * 10) / 10 : 0
      };
    });

    const response = NextResponse.json({ total, data: results });
    response.headers.set('Cache-Control', 'public, max-age=60'); // Cache για 1 λεπτό
    return response;
  } catch (error) {
    console.error('Results error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
