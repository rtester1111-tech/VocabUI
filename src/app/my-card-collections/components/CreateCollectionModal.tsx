'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import Modal from '@/components/ui/Modal';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (name: string) => void;
}

interface FormData {
  name: string;
  description: string;
  languagePair: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string;
}

const COLOR_OPTIONS = [
  { id: 'color-green', value: 'from-primary-400 to-primary-600', label: '翠綠' },
  { id: 'color-violet', value: 'from-violet-400 to-violet-600', label: '紫色' },
  { id: 'color-blue', value: 'from-blue-400 to-blue-600', label: '藍色' },
  { id: 'color-amber', value: 'from-amber-400 to-orange-500', label: '琥珀' },
  { id: 'color-pink', value: 'from-pink-400 to-pink-600', label: '粉紅' },
  { id: 'color-slate', value: 'from-slate-500 to-slate-700', label: '深灰' },
];

export default function CreateCollectionModal({
  isOpen,
  onClose,
  onCreated,
}: CreateCollectionModalProps) {
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].value);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      languagePair: 'EN → ZH',
      difficulty: 'medium',
    },
  });

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    // Backend integration point: POST /api/collections with data + selectedColor
    setTimeout(() => {
      setIsSubmitting(false);
      reset();
      onCreated(data.name);
    }, 1000);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="新增單字集" size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        {/* Collection name */}
        <div>
          <label htmlFor="col-name" className="block text-sm font-medium text-gray-700 mb-1.5">
            單字集名稱 <span className="text-red-400">*</span>
          </label>
          <input
            id="col-name"
            type="text"
            placeholder="例如：商業英語精選"
            className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all ${
              errors.name ? 'border-red-300 focus:ring-red-200' : 'border-primary-100 focus:border-primary-300'
            }`}
            {...register('name', {
              required: '請輸入單字集名稱',
              minLength: { value: 2, message: '名稱至少需要 2 個字元' },
              maxLength: { value: 50, message: '名稱不能超過 50 個字元' },
            })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="col-desc" className="block text-sm font-medium text-gray-700 mb-1.5">
            描述
          </label>
          <p className="text-xs text-gray-400 mb-1.5">讓其他學習者了解這個單字集的內容</p>
          <textarea
            id="col-desc"
            rows={2}
            placeholder="例如：職場必備商業詞彙，包含會議、簡報等情境"
            className="w-full px-4 py-2.5 bg-white border border-primary-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-all resize-none"
            {...register('description')}
          />
        </div>

        {/* Language pair + Difficulty row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="col-lang" className="block text-sm font-medium text-gray-700 mb-1.5">
              語言對
            </label>
            <select
              id="col-lang"
              className="w-full px-3 py-2.5 bg-white border border-primary-100 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-all"
              {...register('languagePair')}
            >
              <option value="EN → ZH">英文 → 中文</option>
              <option value="ZH → EN">中文 → 英文</option>
              <option value="JA → ZH">日文 → 中文</option>
              <option value="KO → ZH">韓文 → 中文</option>
            </select>
          </div>
          <div>
            <label htmlFor="col-difficulty" className="block text-sm font-medium text-gray-700 mb-1.5">
              難度
            </label>
            <select
              id="col-difficulty"
              className="w-full px-3 py-2.5 bg-white border border-primary-100 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-all"
              {...register('difficulty')}
            >
              <option value="easy">初級</option>
              <option value="medium">中級</option>
              <option value="hard">高級</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="col-tags" className="block text-sm font-medium text-gray-700 mb-1.5">
              標籤
            </label>
            <p className="text-xs text-gray-400 mb-1.5">用逗號分隔，例如：商業, 職場, 多益</p>
            <input
              id="col-tags"
              type="text"
              placeholder="商業, 職場, 多益"
              className="w-full px-4 py-2.5 bg-white border border-primary-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-all"
              {...register('tags')}
            />
          </div>

        {/* Cover color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            封面顏色
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color.value} transition-all duration-150 active:scale-95 ${
                  selectedColor === color.value
                    ? 'ring-2 ring-offset-2 ring-primary-500 scale-110' :'hover:scale-105'
                }`}
                aria-label={`選擇${color.label}封面`}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className={`rounded-2xl bg-gradient-to-br ${selectedColor} p-4 text-white`}>
          <p className="text-xs font-semibold text-white/70 mb-1">預覽</p>
          <p className="font-bold text-base">新單字集</p>
          <p className="text-white/60 text-xs mt-0.5">0 張卡片 · 0% 掌握</p>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-100 transition-all duration-150 active:scale-95"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl gradient-green text-white font-semibold text-sm hover:opacity-90 transition-all duration-150 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                建立中...
              </>
            ) : (
              <>
                <Plus size={16} />
                建立單字集
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}