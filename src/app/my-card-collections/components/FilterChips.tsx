'use client';

import React from 'react';
import { BookOpen, Trophy, Share2, LayoutGrid } from 'lucide-react';

type FilterType = 'all' | 'studying' | 'mastered' | 'shared';

interface FilterChipsProps {
  activeFilter: FilterType;
  onChange: (filter: FilterType) => void;
}

const FILTERS: { value: FilterType; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: '全部', icon: LayoutGrid },
  { value: 'studying', label: '學習中', icon: BookOpen },
  { value: 'mastered', label: '已掌握', icon: Trophy },
  { value: 'shared', label: '已分享', icon: Share2 },
];

export default function FilterChips({ activeFilter, onChange }: FilterChipsProps) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {FILTERS.map((f) => (
        <button
          key={`filter-${f.value}`}
          onClick={() => onChange(f.value)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95 ${
            activeFilter === f.value
              ? 'bg-primary-100 text-primary-700 border border-primary-200' :'bg-white text-gray-500 border border-gray-200 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200'
          }`}
        >
          <f.icon size={13} />
          {f.label}
        </button>
      ))}
    </div>
  );
}