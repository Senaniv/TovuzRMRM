import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadImage(file: File, folder: string): Promise<string> {
  const folderPrefix = folder ? (folder.endsWith('/') ? folder : `${folder}/`) : '';
  const fileExt = file.name.split('.').pop() || 'png';
  const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `${folderPrefix}${uniqueName}`;

  const { data, error } = await supabase.storage
    .from('rehab-media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Şəkil yüklənə bilmədi: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from('rehab-media')
    .getPublicUrl(filePath);

  if (!urlData || !urlData.publicUrl) {
    throw new Error('Şəklin URL-i əldə edilə bilmədi.');
  }

  return urlData.publicUrl;
}

export async function deleteImageByUrl(url: string): Promise<void> {
  if (!url) return;
  try {
    const marker = '/storage/v1/object/public/rehab-media/';
    if (url.includes(marker)) {
      const filePath = url.split(marker)[1];
      if (filePath) {
        const { error } = await supabase.storage
          .from('rehab-media')
          .remove([filePath]);
        if (error) {
          console.error('Failed to delete old image from storage:', error.message);
        } else {
          console.log('Successfully deleted old image:', filePath);
        }
      }
    }
  } catch (err) {
    console.error('Error deleting image by URL:', err);
  }
}

