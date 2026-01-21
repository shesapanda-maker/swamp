import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export async function POST(request: Request) {
  // 1. Проверяем JWT
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // 2. Читаем body
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const { name, normalized_name } = body;

  if (!name || !normalized_name) {
    return NextResponse.json(
      { error: 'name and normalized_name are required' },
      { status: 400 }
    );
  }

  // 3. Supabase client с JWT
  const supabase = createSupabaseServerClient(token);

  // 4. INSERT без created_by (берётся из DEFAULT auth.uid())
  const { error } = await supabase
    .from('characters')
    .insert({
      name,
      normalized_name,
      is_approved: false,
      is_blocked: false,
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { status: 'created' },
    { status: 201 }
  );
}
