import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseClient';
import { VOTE_CHOICES } from '@/lib/schema';

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    
    // Παίρνουμε τα counts με SQL aggregation αντί για όλες τις εγγραφές
    const results = [];
    let total = 0;

    // Παίρνουμε το count για κάθε επιλογή ξεχωριστά
    for (const choice of VOTE_CHOICES) {
      const { count, error } = await supabaseAdmin
        .from('votes')
        .select('*', { count: 'exact', head: true })
        .eq('choice', choice);

      if (error) {
        console.error(`Error counting ${choice}:`, error);
        return NextResponse.json(
          { error: `Database error for ${choice}` },
          { status: 500 }
        );
      }

      const voteCount = count || 0;
      results.push({ choice, count: voteCount, pct: 0 });
      total += voteCount;
      
      console.log(`${choice}: ${voteCount} votes`); // Για debugging
    }

    // Υπολογίζουμε τα ποσοστά
    results.forEach(result => {
      result.pct = total > 0 ? Math.round((result.count / total) * 100 * 10) / 10 : 0;
    });

    console.log(`Total votes: ${total}`); // Για debugging

    const response = NextResponse.json({
      total,
      data: results
    });

    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    console.error('Results error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}