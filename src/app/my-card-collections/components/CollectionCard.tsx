'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  BookOpen,
  Share2,
  MoreVertical,
  Pencil,
  Trash2,
  Play,
  Users,
  Flame,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { Collection } from './CollectionsPageContent';

interface CollectionCardProps {
  collection: Collection;
  viewType: 'grid' | 'list';
  onDelete: (id: string) => void;
  onShare: (collection: Collection) => void;
}

export default function CollectionCard({
  collection,
  viewType,
  onDelete,
  onShare,
}: CollectionCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const masteryPercent = Math.round((collection.masteredCount / collection.cardCount) * 100);
  const masteryColor =
    masteryPercent >= 80
      ? 'bg-primary-500'
      : masteryPercent >= 50
      ? 'bg-amber-400' :'bg-red-400';

  const difficultyVariant: Record<string, 'difficulty-easy' | 'difficulty-medium' | 'difficulty-hard'> = {
    easy: 'difficulty-easy',
    medium: 'difficulty-medium',
    hard: 'difficulty-hard',
  };
  const difficultyLabel = { easy: '初級', medium: '中級', hard: '高級' };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date('2026-04-28');
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays} 天前`;
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  if (viewType === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-primary-100 shadow-sm hover:shadow-md transition-all duration-200 px-5 py-4 flex items-center gap-4 group">
        {/* Color strip */}
        <div className={`w-1.5 h-12 rounded-full bg-gradient-to-b ${collection.coverColor} flex-shrink-0`} />

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold text-gray-800 text-sm truncate">{collection.name}</h3>
            {collection.isShared && (
              <Badge variant="shared">
                <Share2 size={9} />
                已分享
              </Badge>
            )}
            <Badge variant={difficultyVariant[collection.difficulty]}>
              {difficultyLabel[collection.difficulty]}
            </Badge>
          </div>
          <p className="text-xs text-gray-400 truncate">{collection.description}</p>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
          <div className="text-center">
            <p className="text-base font-bold text-gray-700 tabular-nums">{collection.cardCount}</p>
            <p className="text-xs text-gray-400">卡片</p>
          </div>
          <div className="text-center">
            <p className={`text-base font-bold tabular-nums ${masteryPercent >= 80 ? 'text-primary-600' : masteryPercent >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
              {masteryPercent}%
            </p>
            <p className="text-xs text-gray-400">掌握率</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">{formatDate(collection.lastStudied)}</p>
            <p className="text-xs text-gray-400">上次學習</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <Link
            href="/flashcard-study-screen"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-600 rounded-xl text-xs font-semibold hover:bg-primary-100 transition-all active:scale-95"
          >
            <Play size={12} />
            學習
          </Link>
          <button
            onClick={() => onShare(collection)}
            className="p-1.5 rounded-xl text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-all active:scale-95"
            aria-label="分享單字集"
          >
            <Share2 size={15} />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-1.5 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all active:scale-95"
            aria-label="刪除單字集"
          >
            <Trash2 size={15} />
          </button>
        </div>

        {/* Delete confirm inline */}
        {showDeleteConfirm && (
          <div className="flex items-center gap-2 ml-2 animate-fade-in">
            <span className="text-xs text-red-500 font-medium">確定刪除？</span>
            <button
              onClick={() => { onDelete(collection.id); setShowDeleteConfirm(false); }}
              className="px-2 py-1 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 active:scale-95 transition-all"
            >
              刪除
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-200 active:scale-95 transition-all"
            >
              取消
            </button>
          </div>
        )}
      </div>
    );
  }

  // Grid view
  return (
    <div className="bg-white rounded-3xl border border-primary-100 shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden group flex flex-col">
      {/* Card header with gradient */}
      <div className={`relative bg-gradient-to-br ${collection.coverColor} p-5 pb-8`}>
        {/* Share badge */}
        {collection.isShared && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
            <Users size={10} />
            {collection.sharedCount > 0 ? collection.sharedCount : '已分享'}
          </div>
        )}

        {/* Streak */}
        {collection.studyStreak > 0 && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
            <Flame size={10} />
            {collection.studyStreak}天
          </div>
        )}

        <h3 className="text-white font-bold text-base leading-tight mt-4 mb-1 text-balance">
          {collection.name}
        </h3>
        <p className="text-white/70 text-xs leading-relaxed line-clamp-2">{collection.description}</p>
      </div>

      {/* Mastery progress bar (overlapping) */}
      <div className="px-5 -mt-2 relative z-10">
        <div className="bg-white rounded-2xl border border-primary-100 shadow-sm px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <CheckCircle2 size={12} className="text-primary-500" />
              掌握率
            </div>
            <span className={`text-sm font-bold tabular-nums ${masteryPercent >= 80 ? 'text-primary-600' : masteryPercent >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
              {masteryPercent}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${masteryColor} rounded-full transition-all duration-700`}
              style={{ width: `${masteryPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span className="tabular-nums">{collection.masteredCount} 已掌握</span>
            <span className="tabular-nums">{collection.cardCount} 張卡片</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex-1 flex flex-col gap-3">
        {/* Tags & badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant={difficultyVariant[collection.difficulty]}>
            {difficultyLabel[collection.difficulty]}
          </Badge>
          <Badge variant="language">{collection.languagePair}</Badge>
          {collection.tags.slice(0, 2).map((tag) => (
            <span
              key={`tag-${collection.id}-${tag}`}
              className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Status breakdown */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary-400 inline-block" />
            {collection.masteredCount} 掌握
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
            {collection.learningCount} 學習中
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
            {collection.newCount} 新
          </span>
        </div>

        {/* Last studied */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Clock size={11} />
          上次學習：{formatDate(collection.lastStudied)}
        </div>
      </div>

      {/* Action footer */}
      <div className="px-5 pb-4 flex items-center gap-2 border-t border-primary-50 pt-3">
        <Link
          href="/flashcard-study-screen"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 gradient-green text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all duration-150 active:scale-95"
        >
          <Play size={14} />
          開始學習
        </Link>

        <button
          onClick={() => onShare(collection)}
          className="p-2.5 rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-100 transition-all duration-150 active:scale-95"
          aria-label="分享單字集"
          title="分享單字集"
        >
          <Share2 size={16} />
        </button>

        {/* More menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all duration-150 active:scale-95"
            aria-label="更多選項"
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-36 bg-white rounded-2xl shadow-lg border border-primary-100 py-1.5 animate-fade-in z-20">
              <button
                onClick={() => { toast.success('編輯功能開發中！'); setMenuOpen(false); }}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <Pencil size={13} />
                編輯單字集
              </button>
              <button
                onClick={() => { toast.success('複製功能開發中！'); setMenuOpen(false); }}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <BookOpen size={13} />
                複製單字集
              </button>
              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={() => { setShowDeleteConfirm(true); setMenuOpen(false); }}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={13} />
                刪除
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Inline delete confirm */}
      {showDeleteConfirm && (
        <div className="mx-5 mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl animate-fade-in">
          <p className="text-xs text-red-600 font-medium mb-2.5">確定要刪除「{collection.name}」嗎？此動作無法復原。</p>
          <div className="flex gap-2">
            <button
              onClick={() => { onDelete(collection.id); setShowDeleteConfirm(false); }}
              className="flex-1 py-1.5 bg-red-500 text-white rounded-xl text-xs font-semibold hover:bg-red-600 active:scale-95 transition-all"
            >
              確定刪除
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 active:scale-95 transition-all"
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
}