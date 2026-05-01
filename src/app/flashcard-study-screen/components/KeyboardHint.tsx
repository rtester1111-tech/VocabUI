import React from 'react';

const SHORTCUTS = [
  { keys: ['Space'], action: '翻轉卡片' },
  { keys: ['←'], action: '上一張' },
  { keys: ['→'], action: '下一張' },
  { keys: ['K'], action: '標記為認識（翻轉後）' },
  { keys: ['U'], action: '標記為不認識（翻轉後）' },
  { keys: ['Enter'], action: '翻轉卡片' },
];

export default function KeyboardHint() {
  return (
    <div className="bg-white rounded-2xl border border-primary-100 shadow-sm px-5 py-4">
      <p className="text-xs font-semibold text-primary-500 uppercase tracking-widest mb-3">鍵盤快捷鍵</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {SHORTCUTS?.map((s) => (
          <div key={`shortcut-${s?.action}`} className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {s?.keys?.map((k) => (
                <kbd
                  key={`key-${k}`}
                  className="inline-flex items-center justify-center px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs font-mono font-semibold text-gray-600 min-w-[28px]"
                >
                  {k}
                </kbd>
              ))}
            </div>
            <span className="text-xs text-gray-500">{s?.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}