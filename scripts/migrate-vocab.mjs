/**
 * migrate-vocab.mjs
 * Uploads vocab_clean_master.json (4,245 lemmas) from vocab-master-db to Supabase.
 *
 * Usage:
 *   node --env-file=.env scripts/migrate-vocab.mjs
 *   node --env-file=.env scripts/migrate-vocab.mjs --dry-run
 *   node --env-file=.env scripts/migrate-vocab.mjs --source ../vocab-master-db/data/vocab_clean_master.json
 *
 * Requires in .env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (NOT the anon key — needs to bypass RLS)
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Config ────────────────────────────────────────────────────────────────────
const BATCH_SIZE = 100;
const DEFAULT_SOURCE_PATH = resolve(__dirname, '../../vocab-master-db/data/vocab_clean_master.json');
const DRY_RUN = process.argv.includes('--dry-run');

const sourceArgIdx = process.argv.indexOf('--source');
const SOURCE_PATH = sourceArgIdx !== -1
  ? resolve(process.argv[sourceArgIdx + 1])
  : DEFAULT_SOURCE_PATH;

// ── Supabase client (service role bypasses RLS) ───────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

// ── Transform raw JSON entry → DB row ─────────────────────────────────────────
function transform(raw) {
  return {
    id:               raw.id,
    lemma:            raw.lemma,
    source:           raw.source ?? null,
    freq_rank:        raw.freq_rank ?? null,
    toeic_band:       raw.toeic_band ?? null,
    cefr:             raw.cefr ?? null,
    pos:              raw.pos ?? null,
    topic:            raw.topic ?? null,
    ipa:              raw.ipa ?? null,
    meaning_zh:       raw.meaning_zh ?? null,
    example:          raw.example ?? null,
    example2:         raw.example2 ?? null,
    keyword_mnemonic: raw.keyword_mnemonic ?? null,
    word_family:      Array.isArray(raw.word_family) ? raw.word_family : [],
    collocations:     Array.isArray(raw.collocations) ? raw.collocations : [],
    antonyms:         Array.isArray(raw.antonyms) ? raw.antonyms : [],
    synonyms_leveled: Array.isArray(raw.synonyms_leveled) ? raw.synonyms_leveled : [],
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Reading: ${SOURCE_PATH}`);
  const raw = JSON.parse(readFileSync(SOURCE_PATH, 'utf-8'));
  const rows = raw.map(transform);
  console.log(`Total records: ${rows.length}`);

  if (DRY_RUN) {
    console.log('DRY RUN — sample (first 2 rows):');
    console.log(JSON.stringify(rows.slice(0, 2), null, 2));
    return;
  }

  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from('words')
      .upsert(batch, { onConflict: 'id' });

    if (error) {
      console.error(`Batch ${i}–${i + batch.length - 1} FAILED:`, error.message);
      errors += batch.length;
    } else {
      inserted += batch.length;
      const pct = ((inserted / rows.length) * 100).toFixed(1);
      process.stdout.write(`\rProgress: ${inserted}/${rows.length} (${pct}%)`);
    }
  }

  console.log(`\nDone. Inserted: ${inserted}, Errors: ${errors}`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
