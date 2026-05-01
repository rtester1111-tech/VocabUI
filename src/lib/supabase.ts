import { createClient } from '@supabase/supabase-js';
import type { Word } from '@/types/vocab';

type Database = {
  public: {
    Tables: {
      words: {
        Row: Word;
        Insert: Omit<Word, 'created_at'>;
        Update: Partial<Omit<Word, 'id' | 'created_at'>>;
      };
    };
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
