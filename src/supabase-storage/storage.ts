import {createClient} from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

export async function uploadFile( file: File) {
    try {
        if (!file) throw new Error('No file provided');
        const fileExt = file.name.split('.').pop();
        const filePath = `${Date.now()}.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
            .from('mdw-products')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type,
            })
            if (uploadError) throw uploadError;
            if (!data || !data.path) throw new Error('File upload failed');
            const { data: publicURLData } = supabase.storage
                .from('mdw-products')
                .getPublicUrl(data.path);
            return publicURLData.publicUrl;

    }
    catch (err) {
        console.error('Error uploading file:', err);
    }
}