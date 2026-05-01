'use client';

import { Toaster } from 'sonner';

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          fontFamily: 'DM Sans, sans-serif',
          borderRadius: '14px',
          fontSize: '14px',
          border: '1px solid #bbf7d0',
        },
        classNames: {
          success: 'bg-primary-50 text-primary-800 border-primary-200',
          error: 'bg-red-50 text-red-800 border-red-200',
        },
      }}
      richColors
    />
  );
}