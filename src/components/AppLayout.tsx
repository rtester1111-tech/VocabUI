import React from 'react';
import Topbar from './Topbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      <Topbar />
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6">
        {children}
      </main>
    </div>
  );
}