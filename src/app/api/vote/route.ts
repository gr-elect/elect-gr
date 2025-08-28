import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export function getSupabaseAdmin() {
  const supabaseUrl = 'https://fhiwstgtgtkcxhyqwqjq.supabase.co';
  const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoaXdzdGd0Z3RrY3hoeXF3cWpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjM4NDk2NSwiZXhwIjoyMDcxOTYwOTY1fQ.huslwihhaMcIg13hV7T2rFudBigsmfI0ly_7YTzi6y4';

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

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