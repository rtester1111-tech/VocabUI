'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from './ui/AppLogo';
import {
  BookOpen,
  LayoutGrid,
  LogIn,
  Menu,
  X,
  Bell,
  Flame,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: '學習', href: '/flashcard-study-screen', icon: BookOpen },
  { label: '我的單字集', href: '/my-card-collections', icon: LayoutGrid },
];

const MOCK_USER = {
  name: 'Mei-Ling Chen',
  email: 'meilingchen@gmail.com',
  avatar: 'ML',
  streak: 14,
};

export default function Topbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isAuthPage = pathname === '/sign-up-login-screen';

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-primary-100 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/my-card-collections" className="flex items-center gap-2 group">
              <AppLogo size={36} />
              <span className="font-sans font-700 text-xl text-primary-700 tracking-tight hidden sm:block group-hover:text-primary-600 transition-colors">
                VocabFlip
              </span>
            </Link>

            {/* Desktop Nav */}
            {!isAuthPage && (
              <nav className="hidden md:flex items-center gap-1">
                {NAV_ITEMS?.map((item) => {
                  const active = pathname === item?.href;
                  return (
                    <Link
                      key={`nav-${item?.href}`}
                      href={item?.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                        active
                          ? 'bg-primary-100 text-primary-700' :'text-gray-500 hover:bg-primary-50 hover:text-primary-600'
                      }`}
                    >
                      <item.icon size={16} />
                      {item?.label}
                    </Link>
                  );
                })}
              </nav>
            )}

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {!isAuthPage && (
                <>
                  {/* Streak badge */}
                  <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                    <Flame size={13} className="text-amber-500" />
                    <span className="tabular-nums">{MOCK_USER?.streak} 天連續</span>
                  </div>

                  {/* Notification */}
                  <button className="relative p-2 rounded-xl text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-all duration-150">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full"></span>
                  </button>

                  {/* User menu */}
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-primary-50 transition-all duration-150"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                        {MOCK_USER?.avatar}
                      </div>
                      <span className="hidden lg:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                        {MOCK_USER?.name}
                      </span>
                      <ChevronDown size={14} className="text-gray-400" />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-lg border border-primary-100 py-2 animate-fade-in z-50">
                        <div className="px-4 py-2 border-b border-primary-50 mb-1">
                          <p className="text-sm font-semibold text-gray-800 truncate">{MOCK_USER?.name}</p>
                          <p className="text-xs text-gray-400 truncate">{MOCK_USER?.email}</p>
                        </div>
                        {[
                          { label: '個人資料', icon: User, href: '#' },
                          { label: '設定', icon: Settings, href: '#' },
                        ]?.map((item) => (
                          <Link
                            key={`menu-${item?.label}`}
                            href={item?.href}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <item.icon size={15} />
                            {item?.label}
                          </Link>
                        ))}
                        <div className="border-t border-primary-50 mt-1 pt-1">
                          <Link
                            href="/sign-up-login-screen"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <LogOut size={15} />
                            登出
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {isAuthPage && (
                <Link
                  href="/my-card-collections"
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-all duration-150 active:scale-95"
                >
                  <LogIn size={15} />
                  進入應用
                </Link>
              )}

              {/* Mobile hamburger */}
              {!isAuthPage && (
                <button
                  className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-primary-50 transition-all"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="開啟選單"
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 w-72 h-full bg-white shadow-2xl animate-slide-up flex flex-col pt-20 pb-6 px-4">
            <div className="flex items-center gap-3 mb-6 p-3 bg-primary-50 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                {MOCK_USER?.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{MOCK_USER?.name}</p>
                <div className="flex items-center gap-1 text-xs text-amber-600">
                  <Flame size={11} />
                  <span>{MOCK_USER?.streak} 天連續</span>
                </div>
              </div>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
              {NAV_ITEMS?.map((item) => {
                const active = pathname === item?.href;
                return (
                  <Link
                    key={`mobile-nav-${item?.href}`}
                    href={item?.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'bg-primary-100 text-primary-700' :'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon size={18} />
                    {item?.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/sign-up-login-screen"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <LogOut size={18} />
              登出
            </Link>
          </div>
        </div>
      )}
    </>
  );
}