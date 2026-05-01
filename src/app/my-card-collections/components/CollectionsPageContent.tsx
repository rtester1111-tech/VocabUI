'use client';

import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import {
  Plus,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
} from 'lucide-react';
import StatsStrip from './StatsStrip';
import CollectionCard from './CollectionCard';
import FilterChips from './FilterChips';
import CreateCollectionModal from './CreateCollectionModal';
import EmptyCollectionsState from './EmptyCollectionsState';

// Backend integration point: fetch user's collections from API
export interface Collection {
  id: string;
  name: string;
  description: string;
  languagePair: string;
  cardCount: number;
  masteredCount: number;
  learningCount: number;
  newCount: number;
  lastStudied: string;
  createdAt: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isShared: boolean;
  sharedCount: number;
  tags: string[];
  coverColor: string;
  studyStreak: number;
}

const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'col-001',
    name: '商業英語精選',
    description: '職場必備商業詞彙，包含會議、簡報、談判等情境',
    languagePair: 'EN → ZH',
    cardCount: 48,
    masteredCount: 31,
    learningCount: 12,
    newCount: 5,
    lastStudied: '2026-04-28',
    createdAt: '2026-03-10',
    difficulty: 'medium',
    isShared: true,
    sharedCount: 234,
    tags: ['商業', '職場', '多益'],
    coverColor: 'from-primary-400 to-primary-600',
    studyStreak: 7,
  },
  {
    id: 'col-002',
    name: 'IELTS 學術詞彙',
    description: '雅思考試高頻學術詞彙，Band 7+ 必備',
    languagePair: 'EN → ZH',
    cardCount: 120,
    masteredCount: 45,
    learningCount: 38,
    newCount: 37,
    lastStudied: '2026-04-26',
    createdAt: '2026-02-15',
    difficulty: 'hard',
    isShared: true,
    sharedCount: 891,
    tags: ['雅思', '學術', '考試'],
    coverColor: 'from-violet-400 to-violet-600',
    studyStreak: 3,
  },
  {
    id: 'col-003',
    name: '日常生活用語',
    description: '實用日常對話詞彙，輕鬆學習生活英語',
    languagePair: 'EN → ZH',
    cardCount: 60,
    masteredCount: 58,
    learningCount: 2,
    newCount: 0,
    lastStudied: '2026-04-27',
    createdAt: '2026-01-20',
    difficulty: 'easy',
    isShared: false,
    sharedCount: 0,
    tags: ['日常', '口語', '初級'],
    coverColor: 'from-emerald-400 to-emerald-600',
    studyStreak: 14,
  },
  {
    id: 'col-004',
    name: '科技新創詞彙',
    description: 'AI、區塊鏈、SaaS 等科技業常見英文術語',
    languagePair: 'EN → ZH',
    cardCount: 75,
    masteredCount: 12,
    learningCount: 28,
    newCount: 35,
    lastStudied: '2026-04-25',
    createdAt: '2026-04-01',
    difficulty: 'hard',
    isShared: true,
    sharedCount: 156,
    tags: ['科技', '新創', 'AI'],
    coverColor: 'from-blue-400 to-blue-600',
    studyStreak: 0,
  },
  {
    id: 'col-005',
    name: '旅遊英語速成',
    description: '機場、飯店、餐廳、觀光必備實用句型',
    languagePair: 'EN → ZH',
    cardCount: 40,
    masteredCount: 36,
    learningCount: 4,
    newCount: 0,
    lastStudied: '2026-04-20',
    createdAt: '2026-03-25',
    difficulty: 'easy',
    isShared: true,
    sharedCount: 412,
    tags: ['旅遊', '口語', '實用'],
    coverColor: 'from-amber-400 to-orange-500',
    studyStreak: 2,
  },
  {
    id: 'col-006',
    name: '醫療健康詞彙',
    description: '看診、藥品說明、健康報告等醫療相關英文',
    languagePair: 'EN → ZH',
    cardCount: 55,
    masteredCount: 8,
    learningCount: 15,
    newCount: 32,
    lastStudied: '2026-04-22',
    createdAt: '2026-04-10',
    difficulty: 'hard',
    isShared: false,
    sharedCount: 0,
    tags: ['醫療', '健康', '專業'],
    coverColor: 'from-red-400 to-rose-500',
    studyStreak: 1,
  },
  {
    id: 'col-007',
    name: '英語慣用語 Idioms',
    description: '道地英語慣用語和片語，讓英文更自然流暢',
    languagePair: 'EN → ZH',
    cardCount: 80,
    masteredCount: 22,
    learningCount: 35,
    newCount: 23,
    lastStudied: '2026-04-24',
    createdAt: '2026-02-28',
    difficulty: 'medium',
    isShared: true,
    sharedCount: 328,
    tags: ['慣用語', '口語', '進階'],
    coverColor: 'from-pink-400 to-pink-600',
    studyStreak: 5,
  },
  {
    id: 'col-008',
    name: '法律英文基礎',
    description: '合約、法規、法律文件常見英文術語',
    languagePair: 'EN → ZH',
    cardCount: 65,
    masteredCount: 3,
    learningCount: 8,
    newCount: 54,
    lastStudied: '2026-04-18',
    createdAt: '2026-04-15',
    difficulty: 'hard',
    isShared: false,
    sharedCount: 0,
    tags: ['法律', '專業', '進階'],
    coverColor: 'from-slate-500 to-slate-700',
    studyStreak: 0,
  },
];

type FilterType = 'all' | 'studying' | 'mastered' | 'shared';
type SortType = 'lastStudied' | 'name' | 'mastery' | 'cardCount';
type ViewType = 'grid' | 'list';

export default function CollectionsPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('lastStudied');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [collections, setCollections] = useState<Collection[]>(MOCK_COLLECTIONS);

  const handleDelete = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
    toast.success('單字集已刪除');
  };

  const handleShare = (collection: Collection) => {
    toast.success(`分享連結已複製：vocabflip.app/deck/${collection.id}`);
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...collections];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter
    if (activeFilter === 'studying') {
      result = result.filter((c) => c.learningCount > 0 || c.newCount > 0);
    } else if (activeFilter === 'mastered') {
      result = result.filter(
        (c) => c.masteredCount / c.cardCount >= 0.9
      );
    } else if (activeFilter === 'shared') {
      result = result.filter((c) => c.isShared);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'lastStudied') return b.lastStudied.localeCompare(a.lastStudied);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'mastery') return (b.masteredCount / b.cardCount) - (a.masteredCount / a.cardCount);
      if (sortBy === 'cardCount') return b.cardCount - a.cardCount;
      return 0;
    });

    return result;
  }, [collections, searchQuery, activeFilter, sortBy]);

  const totalWords = collections.reduce((s, c) => s + c.cardCount, 0);
  const totalMastered = collections.reduce((s, c) => s + c.masteredCount, 0);
  const overallMastery = totalWords > 0 ? Math.round((totalMastered / totalWords) * 100) : 0;
  const maxStreak = Math.max(...collections.map((c) => c.studyStreak));

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">我的單字集</h1>
          <p className="text-sm text-gray-400">管理、學習並分享你的詞彙收藏</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 gradient-green text-white rounded-2xl font-semibold text-sm hover:opacity-90 transition-all duration-150 active:scale-95 shadow-md hover:shadow-lg"
        >
          <Plus size={18} />
          新增單字集
        </button>
      </div>

      {/* Stats strip */}
      <StatsStrip
        totalCollections={collections.length}
        totalWords={totalWords}
        masteredWords={totalMastered}
        overallMastery={overallMastery}
        studyStreak={maxStreak}
      />

      {/* Search + Filter + Sort + View controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-0 w-full sm:w-auto">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="搜尋單字集名稱、標籤..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-primary-100 rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Filter chips */}
          <FilterChips activeFilter={activeFilter} onChange={setActiveFilter} />

          {/* Sort */}
          <div className="flex items-center gap-1.5 bg-white border border-primary-100 rounded-2xl px-3 py-2 text-sm">
            <SlidersHorizontal size={14} className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="bg-transparent text-gray-600 text-sm focus:outline-none cursor-pointer"
              aria-label="排序方式"
            >
              <option value="lastStudied">最近學習</option>
              <option value="name">名稱 A-Z</option>
              <option value="mastery">掌握度</option>
              <option value="cardCount">卡片數量</option>
            </select>
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-white border border-primary-100 rounded-2xl p-1">
            <button
              onClick={() => setViewType('grid')}
              className={`p-1.5 rounded-xl transition-all duration-150 ${viewType === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
              aria-label="格狀檢視"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewType('list')}
              className={`p-1.5 rounded-xl transition-all duration-150 ${viewType === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
              aria-label="清單檢視"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          顯示 <span className="font-semibold text-gray-600 tabular-nums">{filteredAndSorted.length}</span> 個單字集
          {searchQuery && <span className="ml-1">（搜尋：「{searchQuery}」）</span>}
        </p>
      </div>

      {/* Collections grid/list */}
      {filteredAndSorted.length === 0 ? (
        <EmptyCollectionsState
          hasSearch={!!searchQuery}
          onCreateNew={() => setShowCreateModal(true)}
        />
      ) : (
        <div
          className={
            viewType === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4' :'flex flex-col gap-3'
          }
        >
          {filteredAndSorted.map((collection) => (
            <CollectionCard
              key={`collection-${collection.id}`}
              collection={collection}
              viewType={viewType}
              onDelete={handleDelete}
              onShare={handleShare}
            />
          ))}
        </div>
      )}

      {/* Create modal */}
      <CreateCollectionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={(name) => {
          toast.success(`「${name}」單字集已建立！`);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
}