'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, RefreshCw, LayoutGrid, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

interface SessionCompleteBannerProps {
  knownCount: number;
  unknownCount: number;
  totalCards: number;
  collectionName: string;
  onRestart: () => void;
}

export default function SessionCompleteBanner({
  knownCount,
  unknownCount,
  totalCards,
  collectionName,
  onRestart,
}: SessionCompleteBannerProps) {
  const accuracyPercent = Math.round((knownCount / totalCards) * 100);

  const getMessage = () => {
    if (accuracyPercent >= 90) return { emoji: '🏆', text: '太厲害了！幾乎全部掌握！', color: 'text-amber-600' };
    if (accuracyPercent >= 70) return { emoji: '🌟', text: '表現很好！繼續保持！', color: 'text-primary-600' };
    if (accuracyPercent >= 50) return { emoji: '📚', text: '有進步！多複習幾次吧！', color: 'text-blue-600' };
    return { emoji: '💪', text: '別灰心！重複練習是關鍵！', color: 'text-orange-600' };
  };

  const message = getMessage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card border border-primary-100 overflow-hidden animate-bounce-in">
        {/* Header */}
        <div className="gradient-green px-8 py-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">學習完成！</h2>
          <p className="text-primary-100 text-sm">{collectionName}</p>
        </div>

        {/* Stats */}
        <div className="px-8 py-6">
          <div className="text-center mb-6">
            <p className="text-5xl font-bold text-primary-700 tabular-nums mb-1">{accuracyPercent}%</p>
            <p className="text-sm text-gray-400">本次正確率</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-primary-50 rounded-2xl p-4 text-center">
              <CheckCircle2 size={20} className="text-primary-500 mx-auto mb-1" />
              <p className="text-2xl font-bold text-primary-700 tabular-nums">{knownCount}</p>
              <p className="text-xs text-gray-400 mt-0.5">認識</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-4 text-center">
              <XCircle size={20} className="text-red-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-red-500 tabular-nums">{unknownCount}</p>
              <p className="text-xs text-gray-400 mt-0.5">不認識</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <TrendingUp size={20} className="text-gray-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-600 tabular-nums">{totalCards}</p>
              <p className="text-xs text-gray-400 mt-0.5">總計</p>
            </div>
          </div>

          <p className={`text-center text-base font-semibold ${message.color} mb-6`}>
            {message.emoji} {message.text}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {unknownCount > 0 && (
              <button
                onClick={onRestart}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all duration-150 active:scale-95"
              >
                <RefreshCw size={18} />
                只複習不認識的 ({unknownCount} 張)
              </button>
            )}
            <button
              onClick={onRestart}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-primary-50 border border-primary-200 text-primary-700 font-semibold hover:bg-primary-100 transition-all duration-150 active:scale-95"
            >
              <RefreshCw size={18} />
              重新學習全部 ({totalCards} 張)
            </button>
            <Link
              href="/my-card-collections"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-600 font-semibold hover:bg-gray-100 transition-all duration-150 active:scale-95"
            >
              <LayoutGrid size={18} />
              回到我的單字集
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}