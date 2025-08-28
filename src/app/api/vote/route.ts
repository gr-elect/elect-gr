import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseClient';
import { ipToHash } from '@/lib/hash';
import { getClientIpFromRequest } from '@/lib/ip';
import { voteSchema } from '@/lib/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { choice } = voteSchema.parse(body);
    
    const clientIp = getClientIpFromRequest(request);
    const ipHash = ipToHash(clientIp);
    const userAgent = request.headers.get('user-agent') || '';

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin
      .from('votes')
      .upsert({
        ip_hash: ipHash,
        choice,
        user_agent: userAgent
      }, {
        onConflict: 'ip_hash'
      });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  return POST(request);
}

export async function GET(request: NextRequest) {
  try {
    const clientIp = getClientIpFromRequest(request);
    const ipHash = ipToHash(clientIp);

    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('votes')
      .select('choice')
      .eq('ip_hash', ipHash)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }

    return NextResponse.json({ choice: data?.choice || null });
  } catch (error) {
    console.error('Get vote error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}