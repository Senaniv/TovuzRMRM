import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('logo') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Fayl tapılmadı' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Yalnız PNG, JPG, SVG və WebP formatları qəbul edilir' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Fayl ölçüsü 5MB-dan çox olmamalıdır' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Always save as logo.png in /public
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    await writeFile(logoPath, buffer);

    return NextResponse.json({ success: true, message: 'Loqo uğurla yükləndi' });
  } catch (error) {
    console.error('Logo upload error:', error);
    return NextResponse.json(
      { error: 'Loqo yüklənərkən xəta baş verdi' },
      { status: 500 }
    );
  }
}
