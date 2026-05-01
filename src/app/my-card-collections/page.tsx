import React from 'react';
import AppLayout from '@/components/AppLayout';
import ToastProvider from '@/components/ui/Toast';
import CollectionsPageContent from './components/CollectionsPageContent';

export default function MyCardCollectionsPage() {
  return (
    <AppLayout>
      <ToastProvider />
      <CollectionsPageContent />
    </AppLayout>
  );
}