import React from 'react';
import AppLayout from '@/components/AppLayout';
import ToastProvider from '@/components/ui/Toast';
import StudySessionWrapper from './components/StudySessionWrapper';

export default function FlashcardStudyPage() {
  return (
    <AppLayout>
      <ToastProvider />
      <StudySessionWrapper />
    </AppLayout>
  );
}