'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import AppLogo from '@/components/ui/AppLogo';
import {
  BookOpen,
  Share2,
  Zap,
  CheckCircle2,
  Users,
  Globe,
  ArrowRight,
  Sparkles,
  Star,
} from 'lucide-react';

const FEATURES = [
  {
    icon: BookOpen,
    title: '3D 翻轉學習',
    description: '沉浸式翻卡體驗，搭配例句強化記憶',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: Zap,
    title: '間隔重複系統',
    description: '智慧安排複習時間，讓記憶更持久',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Share2,
    title: '分享單字集',
    description: '一鍵分享給朋友，一起學習更有趣',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: Users,
    title: '學習社群',
    description: '探索其他學習者分享的精選單字集',
    color: 'bg-blue-100 text-blue-600',
  },
];

const STATS = [
  { value: '50K+', label: '活躍學習者' },
  { value: '2M+', label: '單字卡片' },
  { value: '98%', label: '用戶滿意度' },
];

const TESTIMONIALS = [
  { name: 'Ting-Wei Liu', text: '用了一個月，TOEIC 多益進步了 150 分！', rating: 5 },
  { name: 'Shu-Fen Chang', text: '3D 翻轉的感覺超棒，學英文變得很有趣。', rating: 5 },
];

export default function LoginContent() {
  const [isLoading, setIsLoading] = useState(false);

  // Backend integration point: replace with actual Google OAuth flow
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('登入成功！歡迎回到 VocabFlip 🎉');
      window.location.href = '/my-card-collections';
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col lg:flex-row">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 gradient-green flex-col justify-between p-10 xl:p-14 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white/3 rounded-full -translate-x-1/2 -translate-y-1/2" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <AppLogo size={44} />
            <span className="text-2xl font-bold text-white tracking-tight">VocabFlip</span>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6 w-fit">
            <Sparkles size={12} />
            全新 3D 閃卡學習體驗
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-5 text-balance">
            讓每個單字<br />
            <span className="text-primary-200">深植記憶</span>
          </h1>
          <p className="text-primary-100 text-lg leading-relaxed max-w-md mb-10">
            透過 3D 翻轉閃卡、間隔重複系統，以及豐富例句，讓語言學習變得有趣、有效率。
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-10">
            {FEATURES.map((feature) => (
              <div
                key={`feature-${feature.title}`}
                className="flex items-start gap-3 bg-white/10 rounded-2xl p-4 backdrop-blur-sm"
              >
                <div className={`w-9 h-9 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0`}>
                  <feature.icon size={18} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-0.5">{feature.title}</p>
                  <p className="text-primary-200 text-xs leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            {STATS.map((stat) => (
              <div key={`stat-${stat.label}`}>
                <p className="text-white text-2xl font-bold tabular-nums">{stat.value}</p>
                <p className="text-primary-200 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="relative z-10 flex flex-col gap-3">
          {TESTIMONIALS.map((t) => (
            <div key={`testimonial-${t.name}`} className="flex items-start gap-3 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {t.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={`star-${t.name}-${i}`} size={11} className="text-amber-300 fill-amber-300" />
                  ))}
                </div>
                <p className="text-primary-100 text-xs leading-relaxed">{t.text}</p>
                <p className="text-primary-300 text-xs mt-1 font-medium">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right auth panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:py-0 lg:px-12 xl:px-16 min-h-screen lg:min-h-0">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <AppLogo size={36} />
          <span className="text-xl font-bold text-primary-700">VocabFlip</span>
        </div>

        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">歡迎加入學習！</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              登入後即可儲存、管理並分享<br />你的專屬單字集
            </p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white border-2 border-gray-200 rounded-2xl text-gray-700 font-semibold text-base hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed group mb-4"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
                <span>登入中...</span>
              </>
            ) : (
              <>
                {/* Google icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                使用 Google 帳號登入
                <ArrowRight size={16} className="ml-auto text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>

          {/* Demo credentials */}
          <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4 mb-6">
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 size={12} />
              示範帳號（點擊使用）
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-primary-100 hover:border-primary-300 hover:bg-primary-50 transition-all duration-150 active:scale-95 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                  ML
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">Mei-Ling Chen</p>
                  <p className="text-xs text-gray-400">meilingchen.vocabflip@gmail.com</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">或是</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Preview CTA */}
          <Link
            href="/my-card-collections"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary-50 border border-primary-200 text-primary-700 font-semibold text-sm hover:bg-primary-100 transition-all duration-150 active:scale-95"
          >
            <Globe size={16} />
            先瀏覽公開單字集
          </Link>

          {/* Trust signals */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 leading-relaxed">
              繼續即表示您同意我們的{' '}
              <Link href="#" className="text-primary-600 hover:underline">服務條款</Link>
              {' '}與{' '}
              <Link href="#" className="text-primary-600 hover:underline">隱私政策</Link>
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={11} className="text-primary-400" />
                免費使用
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={11} className="text-primary-400" />
                無廣告干擾
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={11} className="text-primary-400" />
                資料安全加密
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}