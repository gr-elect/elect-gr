import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseClient';
import { PARTY_CHOICES } from '@/lib/schema';

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    
    // Υπολογισμός ημερομηνίας 30 ημερών πριν
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabaseAdmin
      .from('votes')
      .select('choice')
      .eq('poll_type', 'party_preference')
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }

    // Μέτρηση ψήφων ανά επιλογή
    const voteCounts: Record<string, number> = {};
    let totalVotes = 0;

    // Αρχικοποίηση όλων των επιλογών με 0
    PARTY_CHOICES.forEach(choice => {
      voteCounts[choice] = 0;
    });

    // Μέτρηση πραγματικών ψήφων
    data.forEach(vote => {
      if (voteCounts.hasOwnProperty(vote.choice)) {
        voteCounts[vote.choice]++;
        totalVotes++;
      }
    });

    // Δημιουργία αποτελεσμάτων με ποσοστά
    const results = PARTY_CHOICES.map(choice => ({
      choice,
      count: voteCounts[choice],
      pct: totalVotes > 0 ? Math.round((voteCounts[choice] / totalVotes) * 100) : 0
    }));

    return NextResponse.json({
      total: totalVotes,
      data: results
    });
  } catch (error) {
    console.error('Results error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
