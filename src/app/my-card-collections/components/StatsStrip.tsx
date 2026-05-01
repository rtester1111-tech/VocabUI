import React from 'react';
import { BookOpen, Trophy, Flame } from 'lucide-react';

interface StatsStripProps {
  totalCollections: number;
  totalWords: number;
  masteredWords: number;
  overallMastery: number;
  studyStreak: number;
}

export default function StatsStrip({
  totalCollections,
  totalWords,
  masteredWords,
  overallMastery,
  studyStreak,
}: StatsStripProps) {
  const stats = [
    {
      id: 'stat-collections',
      icon: BookOpen,
      value: totalCollections.toString(),
      label: '單字集',
      sublabel: '個收藏',
      color: 'text-primary-600',
      bg: 'bg-primary-50',
      border: 'border-primary-100',
    },
    {
      id: 'stat-words',
      icon: BookOpen,
      value: totalWords.toLocaleString(),
      label: '總單字數',
      sublabel: `已掌握 ${masteredWords}`,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      id: 'stat-mastery',
      icon: Trophy,
      value: `${overallMastery}%`,
      label: '整體掌握率',
      sublabel: overallMastery >= 70 ? '表現優秀！' : '繼續加油！',
      color: overallMastery >= 70 ? 'text-primary-600' : 'text-amber-600',
      bg: overallMastery >= 70 ? 'bg-primary-50' : 'bg-amber-50',
      border: overallMastery >= 70 ? 'border-primary-100' : 'border-amber-100',
    },
    {
      id: 'stat-streak',
      icon: Flame,
      value: studyStreak.toString(),
      label: '最長連續天數',
      sublabel: studyStreak > 0 ? '🔥 保持下去！' : '今天開始學習',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`${stat.bg} border ${stat.border} rounded-2xl px-4 py-4 flex items-center gap-3`}
        >
          <div className={`w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center flex-shrink-0`}>
            <stat.icon size={20} className={stat.color} />
          </div>
          <div>
            <p className={`text-2xl font-bold tabular-nums ${stat.color}`}>{stat.value}</p>
            <p className="text-xs font-medium text-gray-600">{stat.label}</p>
            <p className="text-xs text-gray-400">{stat.sublabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}