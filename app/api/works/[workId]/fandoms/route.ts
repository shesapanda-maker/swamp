import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export async function POST(request: Request) {
  // 1. Проверяем авторизацию
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // 2. Достаём workId НАПРЯМУЮ из URL
  // URL вида: /api/works/{workId}/fandoms
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  const workId = segments[segments.indexOf('works') + 1];

  if (!workId) {
    return NextResponse.json(
      { error: 'workId not found in URL' },
      { status: 400 }
    );
  }

  // 3. Читаем тело запроса
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const fandomIds = body?.fandom_ids;

  if (!Array.isArray(fandomIds) || fandomIds.length === 0) {
    return NextResponse.json(
      { error: 'fandom_ids must be a non-empty array' },
      { status: 400 }
    );
  }

  // fandom_id = int8 → ждём положительные числа
  if (!fandomIds.every((x: any) => Number.isInteger(x) && x > 0)) {
    return NextResponse.json(
      { error: 'fandom_ids must be positive integers' },
      { status: 400 }
    );
  }

  // 4. Создаём Supabase-клиент как пользователь
  const supabase = createSupabaseServerClient(token);

  // (опционально) проверяем пользователя
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: 'Invalid user' },
      { status: 401 }
    );
  }

  // 5. Готовим строки для таблицы-связки
  const rows = fandomIds.map((fandom_id: number) => ({
    work_id: workId,
    fandom_id,
  }));

  // 6. ВСТАВЛЯЕМ 
const { error } = await supabase
  .from('work_fandoms')
  .insert(rows);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  // 7. Возвращаем результат
  return NextResponse.json(
    {
      work_id: workId,
      linked: fandomIds.length,
    },
    { status: 201 }
  );
}
