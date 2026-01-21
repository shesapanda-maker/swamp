import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export async function POST(request: Request) {
  // 1. JWT
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. characterId из URL
  // /api/characters/{characterId}/fandoms
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  const characterId = segments[segments.indexOf('characters') + 1];

  if (!characterId) {
    return NextResponse.json(
      { error: 'characterId not found in URL' },
      { status: 400 }
    );
  }

  // 3. body
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { fandom_id } = body;

  if (!Number.isInteger(fandom_id) || fandom_id <= 0) {
    return NextResponse.json(
      { error: 'fandom_id must be a positive integer' },
      { status: 400 }
    );
  }

  // 4. Supabase client
  const supabase = createSupabaseServerClient(token);

  // 5. INSERT (без select)
  const { error } = await supabase
    .from('fandom_characters')
    .insert({
      character_id: Number(characterId),
      fandom_id,
      // is_primary возьмётся из DEFAULT
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { status: 'linked', character_id: Number(characterId), fandom_id },
    { status: 201 }
  );
}
