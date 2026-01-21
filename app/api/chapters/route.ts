import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { createSignedPutUrl } from "@/lib/r2";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    /* 1️⃣ Берём JWT */
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const accessToken = authHeader.replace("Bearer ", "");

    /* 2️⃣ Supabase client от имени пользователя */
    const supabase = createSupabaseServerClient(accessToken);

    /* 3️⃣ Читаем тело */
    const {
      work_id,
      chapter_number,
      title,
      content_type = "text/markdown",
      content_size,
    } = await req.json();

    if (!work_id || !chapter_number || !title || !content_size) {
      return NextResponse.json(
        { error: "invalid_payload" },
        { status: 400 }
      );
    }

    /* 4️⃣ Генерим путь в R2 */
    const objectKey = `works/${work_id}/chapters/${crypto.randomUUID()}.md`;

    /* 5️⃣ INSERT в chapters */
    const { data: chapter, error } = await supabase
      .from("chapters")
      .insert({
        work_id,
        chapter_number,
        title,
        content_url: objectKey,
        content_type,
        content_size,
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    /* 6️⃣ Signed PUT URL */
    const uploadUrl = await createSignedPutUrl(
      objectKey,
      content_type,
      600
    );

    /* 7️⃣ Ответ */
    return NextResponse.json({
      chapter_id: chapter.id,
      upload_url: uploadUrl,
      expires_in: 600,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "internal_error" },
      { status: 500 }
    );
  }
}
