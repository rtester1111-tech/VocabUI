export interface SynonymEntry {
  lemma: string;
  cefr: string;
}

export interface Word {
  id: string;
  lemma: string;
  source: string | null;
  freq_rank: number | null;
  toeic_band: number | null;
  cefr: string | null;
  pos: string | null;
  topic: string | null;
  ipa: string | null;
  meaning_zh: string | null;
  example: string | null;
  example2: string | null;
  keyword_mnemonic: string | null;
  word_family: string[];
  collocations: string[];
  antonyms: string[];
  synonyms_leveled: SynonymEntry[];
  created_at?: string;
}

export type WordInsert = Omit<Word, 'created_at'>;

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type TOEICBand = 1 | 2 | 3 | 4 | 5;
export type POS = 'n' | 'v' | 'adj' | 'adv' | 'prep' | 'conj' | 'det' | 'pron' | 'phrase';
