-- VocabFlip Pro: Words table
-- Source: vocab-master-db/data/vocab_clean_master.json (4,245 lemmas)

CREATE TABLE IF NOT EXISTS words (
  id               TEXT PRIMARY KEY,
  lemma            TEXT NOT NULL,
  source           TEXT,
  freq_rank        INTEGER,
  toeic_band       SMALLINT CHECK (toeic_band BETWEEN 1 AND 5),
  cefr             TEXT CHECK (cefr IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  pos              TEXT,
  topic            TEXT,
  ipa              TEXT,
  meaning_zh       TEXT,
  example          TEXT,
  example2         TEXT,
  keyword_mnemonic TEXT,
  word_family      TEXT[]   NOT NULL DEFAULT '{}',
  collocations     TEXT[]   NOT NULL DEFAULT '{}',
  antonyms         TEXT[]   NOT NULL DEFAULT '{}',
  synonyms_leveled JSONB    NOT NULL DEFAULT '[]',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_words_lemma       ON words (lemma);
CREATE INDEX IF NOT EXISTS idx_words_toeic_band  ON words (toeic_band);
CREATE INDEX IF NOT EXISTS idx_words_cefr        ON words (cefr);
CREATE INDEX IF NOT EXISTS idx_words_source      ON words (source);
CREATE INDEX IF NOT EXISTS idx_words_pos         ON words (pos);
CREATE INDEX IF NOT EXISTS idx_words_topic       ON words (topic);

-- Full-text search index on lemma + meaning
CREATE INDEX IF NOT EXISTS idx_words_fts ON words
  USING gin(to_tsvector('english', lemma || ' ' || COALESCE(meaning_zh, '')));

-- RLS: public read, no client writes
ALTER TABLE words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "words_public_read" ON words
  FOR SELECT USING (true);


-- User progress table (for Phase 2 SM-2 spaced repetition)
CREATE TABLE IF NOT EXISTS user_progress (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word_id       TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
  -- SM-2 fields
  repetitions   SMALLINT NOT NULL DEFAULT 0,
  interval_days REAL     NOT NULL DEFAULT 1,
  ease_factor   REAL     NOT NULL DEFAULT 2.5,
  next_review   DATE     NOT NULL DEFAULT CURRENT_DATE,
  last_reviewed TIMESTAMPTZ,
  -- Status for UI
  status        TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'learning', 'mastered')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, word_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user_review
  ON user_progress (user_id, next_review);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "progress_own_rows" ON user_progress
  FOR ALL USING (auth.uid() = user_id);
