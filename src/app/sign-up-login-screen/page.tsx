import React from 'react';
import ToastProvider from '@/components/ui/Toast';
import LoginContent from './components/LoginContent';

export default function SignUpLoginPage() {
  return (
    <>
      <ToastProvider />
      <LoginContent />
    </>
  );
}