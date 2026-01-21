import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export async function POST(request: Request) {
  // 1. JWT
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. workId из URL
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  const workId = segments[segments.indexOf('works') + 1];

  if (!workId) {
    return NextResponse.json(
      { error: 'workId not found in URL' },
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

  const { character_id, is_primary } = body;

  if (!Number.isInteger(character_id) || character_id <= 0) {
    return NextResponse.json(
      { error: 'character_id must be a positive integer' },
      { status: 400 }
    );
  }

  // 4. Supabase client
  const supabase = createSupabaseServerClient(token);

  // 5. INSERT
  const { error } = await supabase
    .from('work_characters')
    .insert({
      work_id: workId,
      character_id,
      is_primary: Boolean(is_primary),
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { status: 'linked', work_id: workId, character_id },
    { status: 201 }
  );
}
