import React from 'react';
import { Heart, Activity, User, School, Sparkles } from 'lucide-react';
import { ActiveTab } from '../App';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-orange-100/55 bg-white/80 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex cursor-pointer items-center space-x-2.5 transition-transform active:scale-95"
          id="logo-button"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-400 via-rose-300 to-amber-200 text-white shadow-md shadow-rose-100">
            <Heart className="h-5.5 w-5.5 fill-white text-white saturate-110" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-gray-800">
              AMI
            </span>
            <span className="ml-1 hidden rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 sm:inline-block border border-emerald-100">
              Neuro-Inclusive
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 md:space-x-4">
          <button
            id="nav-home"
            onClick={() => setActiveTab('home')}
            className={`flex items-center space-x-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
              activeTab === 'home'
                ? 'bg-orange-50/70 text-gray-800 shadow-xs'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-950/80'
            }`}
          >
            <span>Home</span>
          </button>

          <button
            id="nav-companion"
            onClick={() => setActiveTab('companion')}
            className={`flex items-center space-x-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all ${
              activeTab === 'companion'
                ? 'bg-gradient-to-r from-sky-100/70 to-teal-100/70 text-sky-900 border border-sky-100/55'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-950'
            }`}
          >
            <Sparkles className="h-4 w-4 text-sky-500 animate-pulse" />
            <span className="hidden sm:inline">Companion</span>
            <span className="sm:hidden">Child App</span>
          </button>

          <button
            id="nav-parent"
            onClick={() => setActiveTab('parent')}
            className={`flex items-center space-x-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
              activeTab === 'parent'
                ? 'bg-purple-50 text-purple-900 border border-purple-100/50'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-950'
            }`}
          >
            <User className="h-4 w-4 text-purple-500" />
            <span className="hidden sm:inline">Parent Portal</span>
            <span className="sm:hidden">Parent</span>
          </button>

          <button
            id="nav-teacher"
            onClick={() => setActiveTab('teacher')}
            className={`flex items-center space-x-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
              activeTab === 'teacher'
                ? 'bg-indigo-50 text-indigo-900 border border-indigo-100/50'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-950'
            }`}
          >
            <School className="h-4 w-4 text-indigo-500" />
            <span className="hidden sm:inline">Teacher Board</span>
            <span className="sm:hidden">Teacher</span>
          </button>
        </nav>

        {/* Demo User Badge */}
        <div className="hidden items-center space-x-3 md:flex">
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-700">Liam O.</p>
            <p className="text-[10px] text-gray-400">Class 2-B Active</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100/60 ring-2 ring-orange-50 font-semibold text-orange-700 text-sm">
            LO
          </div>
        </div>
      </div>
    </header>
  );
}
