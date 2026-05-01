import React from 'react';
import { BookOpen, Plus, Search } from 'lucide-react';

interface EmptyCollectionsStateProps {
  hasSearch: boolean;
  onCreateNew: () => void;
}

export default function EmptyCollectionsState({ hasSearch, onCreateNew }: EmptyCollectionsStateProps) {
  if (hasSearch) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mb-4">
          <Search size={28} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">找不到符合的單字集</h3>
        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
          試試不同的關鍵字，或清除搜尋條件查看所有單字集
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-primary-50 rounded-3xl flex items-center justify-center mb-5 border-2 border-dashed border-primary-200">
        <BookOpen size={32} className="text-primary-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">還沒有任何單字集</h3>
      <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
        建立你的第一個單字集，開始用 3D 翻卡學習新詞彙。你也可以探索其他學習者分享的公開單字集。
      </p>
      <button
        onClick={onCreateNew}
        className="flex items-center gap-2 px-6 py-3 gradient-green text-white rounded-2xl font-semibold text-sm hover:opacity-90 transition-all duration-150 active:scale-95 shadow-md"
      >
        <Plus size={18} />
        新增第一個單字集
      </button>
    </div>
  );
}