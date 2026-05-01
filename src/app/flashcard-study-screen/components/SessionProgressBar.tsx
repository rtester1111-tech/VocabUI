'use client';

import React from 'react';
import { WordCard } from './StudySessionWrapper';
import { CheckCircle2, XCircle, Circle } from 'lucide-react';

interface SessionProgressBarProps {
  currentIndex: number;
  totalCards: number;
  knownCount: number;
  unknownCount: number;
  results: Record<string, 'known' | 'unknown' | null>;
  cards: WordCard[];
}

export default function SessionProgressBar({
  currentIndex,
  totalCards,
  knownCount,
  unknownCount,
  results,
  cards,
}: SessionProgressBarProps) {
  const progressPercent = Math.round(((knownCount + unknownCount) / totalCards) * 100);
  const remaining = totalCards - knownCount - unknownCount;

  return (
    <div className="bg-white rounded-2xl border border-primary-100 shadow-sm px-5 py-4">
      {/* Stats row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm">
            <CheckCircle2 size={15} className="text-primary-500" />
            <span className="font-semibold text-primary-700 tabular-nums">{knownCount}</span>
            <span className="text-gray-400">認識</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <XCircle size={15} className="text-red-400" />
            <span className="font-semibold text-red-500 tabular-nums">{unknownCount}</span>
            <span className="text-gray-400">不認識</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Circle size={15} className="text-gray-300" />
            <span className="font-semibold text-gray-500 tabular-nums">{remaining}</span>
            <span className="text-gray-400">剩餘</span>
          </div>
        </div>
        <div className="text-sm font-semibold text-gray-500 tabular-nums">
          <span className="text-primary-700 text-base font-bold">{currentIndex + 1}</span>
          <span className="text-gray-300 mx-1">/</span>
          <span>{totalCards}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
        {/* Known segment */}
        <div
          className="absolute left-0 top-0 h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(knownCount / totalCards) * 100}%` }}
        />
        {/* Unknown segment */}
        <div
          className="absolute top-0 h-full bg-red-300 rounded-full transition-all duration-500 ease-out"
          style={{
            left: `${(knownCount / totalCards) * 100}%`,
            width: `${(unknownCount / totalCards) * 100}%`,
          }}
        />
        {/* Current position indicator */}
        <div
          className="absolute top-0 h-full w-1 bg-primary-700 rounded-full transition-all duration-300"
          style={{ left: `${((currentIndex) / totalCards) * 100}%` }}
        />
      </div>

      {/* Mini card dots */}
      <div className="flex items-center gap-1 mt-3 flex-wrap">
        {cards.map((card, i) => {
          const result = results[card.id];
          const isCurrent = i === currentIndex;
          return (
            <div
              key={`dot-${card.id}`}
              className={`rounded-full transition-all duration-200 ${
                isCurrent
                  ? 'w-4 h-3 bg-primary-600'
                  : result === 'known' ?'w-2.5 h-2.5 bg-primary-400'
                  : result === 'unknown' ?'w-2.5 h-2.5 bg-red-300' :'w-2.5 h-2.5 bg-gray-200'
              }`}
              title={`${i + 1}. ${card.word}`}
            />
          );
        })}
        {progressPercent > 0 && (
          <span className="ml-2 text-xs text-gray-400 tabular-nums">{progressPercent}% 完成</span>
        )}
      </div>
    </div>
  );
}