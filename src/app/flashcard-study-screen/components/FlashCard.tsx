'use client';

import React from 'react';
import { WordCard } from './StudySessionWrapper';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface FlashCardProps {
  card: WordCard;
  isFlipped: boolean;
  onFlip: () => void;
  currentResult: 'known' | 'unknown' | null;
}

const DIFFICULTY_BADGE: Record<string, { variant: 'difficulty-easy' | 'difficulty-medium' | 'difficulty-hard'; label: string }> = {
  easy: { variant: 'difficulty-easy', label: '初級' },
  medium: { variant: 'difficulty-medium', label: '中級' },
  hard: { variant: 'difficulty-hard', label: '高級' },
};

const MASTERY_BADGE: Record<string, { variant: 'new' | 'learning' | 'familiar' | 'mastered'; label: string }> = {
  new: { variant: 'new', label: '新單字' },
  learning: { variant: 'learning', label: '學習中' },
  familiar: { variant: 'familiar', label: '熟悉' },
  mastered: { variant: 'mastered', label: '已掌握' },
};

export default function FlashCard({ card, isFlipped, onFlip, currentResult }: FlashCardProps) {
  const diffBadge = DIFFICULTY_BADGE[card.difficulty];
  const masteryBadge = MASTERY_BADGE[card.masteryStatus];

  const resultBorderClass = currentResult === 'known' ?'ring-2 ring-primary-400'
    : currentResult === 'unknown' ?'ring-2 ring-red-300' :'';

  return (
    <div
      className="perspective-1000 w-full cursor-pointer select-none"
      style={{ height: '420px' }}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onFlip()}
      aria-label={isFlipped ? '點擊翻回正面' : '點擊翻轉查看定義'}
    >
      <div
        className={`relative w-full h-full preserve-3d card-flip-transition ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 backface-hidden gradient-card-front rounded-3xl shadow-card border border-primary-100 flex flex-col ${resultBorderClass}`}
          aria-hidden={isFlipped}
        >
          {/* Result indicator */}
          {currentResult && (
            <div className={`absolute top-4 right-4 z-10 ${currentResult === 'known' ? 'text-primary-500' : 'text-red-400'}`}>
              {currentResult === 'known'
                ? <CheckCircle2 size={22} className="animate-bounce-in" />
                : <XCircle size={22} className="animate-bounce-in" />
              }
            </div>
          )}

          {/* Decorative background orbs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary-100 rounded-full opacity-30 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-100 rounded-full opacity-25 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          <div className="flex flex-col items-center justify-center flex-1 px-8 py-10 relative">
            {/* Badges row */}
            <div className="flex items-center gap-2 mb-6 flex-wrap justify-center">
              <Badge variant={masteryBadge.variant}>{masteryBadge.label}</Badge>
              <Badge variant={diffBadge.variant}>{diffBadge.label}</Badge>
              <Badge variant="language">EN → ZH</Badge>
            </div>

            {/* Word */}
            <h1 className="font-mono text-5xl sm:text-6xl font-bold text-primary-700 tracking-tight text-center mb-4 leading-tight">
              {card.word}
            </h1>

            {/* Phonetic */}
            <p className="font-mono-ipa text-xl text-primary-400 mb-3 tracking-wide">
              {card.phonetic}
            </p>

            {/* Part of speech */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 italic">{card.partOfSpeech}</span>
              <span className="text-gray-200">·</span>
              <span className="text-sm text-gray-400">{card.partOfSpeechZh}</span>
            </div>
          </div>

          {/* Bottom hint */}
          <div className="flex items-center justify-center gap-2 pb-5 text-xs text-gray-300">
            <BookOpen size={12} />
            點擊卡片翻轉查看定義
          </div>
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 gradient-card-back rounded-3xl shadow-card border border-primary-200 flex flex-col overflow-hidden ${resultBorderClass}`}
          aria-hidden={!isFlipped}
        >
          <div className="flex flex-col h-full px-6 sm:px-8 py-6 overflow-y-auto scrollbar-hide">
            {/* Word header (compact) */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-bold text-primary-700">{card.word}</span>
                <span className="font-mono-ipa text-sm text-primary-400">{card.phonetic}</span>
              </div>
              <Badge variant={diffBadge.variant}>{diffBadge.label}</Badge>
            </div>

            {/* Definition */}
            <div className="mb-5 flex-shrink-0">
              <p className="text-xs font-semibold text-primary-500 uppercase tracking-widest mb-2">定義</p>
              <p className="text-base font-medium text-gray-800 leading-relaxed mb-1.5">{card.definitionZh}</p>
              <p className="text-sm text-gray-500 leading-relaxed italic">{card.definition}</p>
            </div>

            {/* Examples */}
            <div className="flex-1">
              <p className="text-xs font-semibold text-primary-500 uppercase tracking-widest mb-3">例句</p>
              <div className="flex flex-col gap-3">
                {card.examples.map((ex, i) => (
                  <div
                    key={`ex-${card.id}-${i}`}
                    className="bg-white/70 rounded-2xl px-4 py-3 border border-primary-100"
                  >
                    <p className="text-sm text-gray-700 leading-relaxed mb-1.5">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary-100 text-primary-600 text-xs font-bold mr-2 flex-shrink-0">
                        {i + 1}
                      </span>
                      {ex.en}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed pl-6">{ex.zh}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}