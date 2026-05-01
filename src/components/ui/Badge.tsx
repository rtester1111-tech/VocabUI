import React from 'react';

type BadgeVariant = 'mastered' | 'learning' | 'new' | 'familiar' | 'shared' | 'difficulty-easy' | 'difficulty-medium' | 'difficulty-hard' | 'language' | 'neutral';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  mastered: 'bg-primary-100 text-primary-700 border-primary-200',
  learning: 'bg-blue-50 text-blue-700 border-blue-200',
  new: 'bg-gray-100 text-gray-600 border-gray-200',
  familiar: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  shared: 'bg-violet-50 text-violet-700 border-violet-200',
  'difficulty-easy': 'bg-green-50 text-green-700 border-green-200',
  'difficulty-medium': 'bg-amber-50 text-amber-700 border-amber-200',
  'difficulty-hard': 'bg-red-50 text-red-700 border-red-200',
  language: 'bg-primary-50 text-primary-700 border-primary-200',
  neutral: 'bg-gray-50 text-gray-600 border-gray-200',
};

export default function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${VARIANT_STYLES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}