import React from 'react';
import { 
  Flame, 
  Terminal, 
  Globe2, 
  ShieldCheck, 
  Play, 
  Square, 
  ChevronDown, 
  Search,
  Bell,
  BookOpen,
  Award,
  Trophy,
  Cpu,
  Layers
} from 'lucide-react';
import { Language, NavTab, UserState } from '../types';
import { getTranslation } from '../translations';

interface NavbarProps {
  currentTab: NavTab;
  setTab: (tab: NavTab) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  userState: UserState;
  onToggleAttackBox: () => void;
  onTerminateMachine: () => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setTab,
  lang,
  setLang,
  userState,
  onToggleAttackBox,
  onTerminateMachine,
  onSearchClick,
}) => {
  const t = getTranslation(lang);

  return (
    <header id="thm-header" className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b1120]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-8">
          <button
            id="nav-logo"
            onClick={() => setTab('dashboard')}
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            {/* TryHackMe Cyber Red Logo Shield */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff2e51] to-[#b91c1c] text-white shadow-lg shadow-[#ff2e51]/20 transition group-hover:scale-105">
              <ShieldCheck className="h-5 w-5" />
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b1120] bg-emerald-500" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-extrabold tracking-tight text-white text-lg font-mono-code">
                TRY<span className="text-[#ff2e51]">HACK</span>ME
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Cyber Labs
              </span>
            </div>
          </button>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-dashboard"
              onClick={() => setTab('dashboard')}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
                currentTab === 'dashboard'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Cpu className="h-4 w-4 text-[#ff2e51]" />
              {t.nav.dashboard}
            </button>

            <button
              id="nav-paths"
              onClick={() => setTab('paths')}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
                currentTab === 'paths'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Layers className="h-4 w-4 text-emerald-400" />
              {t.nav.paths}
            </button>

            <button
              id="nav-rooms"
              onClick={() => setTab('rooms') || (currentTab === 'room-detail' && setTab('rooms'))}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
                currentTab === 'rooms' || currentTab === 'room-detail'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <BookOpen className="h-4 w-4 text-sky-400" />
              {t.nav.rooms}
            </button>

            <button
              id="nav-leaderboard"
              onClick={() => setTab('leaderboard')}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
                currentTab === 'leaderboard'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Trophy className="h-4 w-4 text-amber-400" />
              {t.nav.compete}
            </button>

            <button
              id="nav-badges"
              onClick={() => setTab('badges')}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
                currentTab === 'badges'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Award className="h-4 w-4 text-purple-400" />
              {t.nav.badges}
            </button>
          </nav>
        </div>

        {/* Right Controls: AttackBox status, Language Toggle, User Stats */}
        <div className="flex items-center gap-3">
          
          {/* Quick Search Button */}
          <button
            id="nav-search-button"
            onClick={onSearchClick}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 transition"
            title={t.nav.searchPlaceholder}
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline font-mono-code">Search...</span>
            <kbd className="hidden lg:inline rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">Ctrl+K</kbd>
          </button>

          {/* Machine Status Pill */}
          {userState.targetMachineIp ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1.5 text-xs text-emerald-300 shadow-sm shadow-emerald-900/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-mono-code font-semibold">{userState.targetMachineIp}</span>
              
              {/* Attackbox toggle button */}
              <button
                id="btn-attackbox-nav"
                onClick={onToggleAttackBox}
                className="ml-1.5 flex items-center gap-1 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[11px] font-medium text-emerald-200 hover:bg-emerald-500/30 transition"
              >
                <Terminal className="h-3 w-3" />
                <span>AttackBox</span>
              </button>

              <button
                id="btn-terminate-nav"
                onClick={onTerminateMachine}
                title={t.nav.terminate}
                className="rounded p-1 text-slate-400 hover:bg-rose-950/60 hover:text-rose-400 transition"
              >
                <Square className="h-3 w-3 fill-rose-500 text-rose-500" />
              </button>
            </div>
          ) : (
            <button
              id="btn-attackbox-toggle-idle"
              onClick={onToggleAttackBox}
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-600 hover:text-white transition"
            >
              <Terminal className="h-3.5 w-3.5 text-[#ff2e51]" />
              <span>AttackBox</span>
            </button>
          )}

          {/* Bilingual Language Switcher (EN / FR) */}
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/90 p-0.5">
            <button
              id="btn-lang-en"
              onClick={() => setLang('en')}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition ${
                lang === 'en'
                  ? 'bg-[#ff2e51] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English"
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
            <button
              id="btn-lang-fr"
              onClick={() => setLang('fr')}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition ${
                lang === 'fr'
                  ? 'bg-[#ff2e51] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Français"
            >
              <span>🇫🇷</span>
              <span>FR</span>
            </button>
          </div>

          {/* User Streak & Level Pill */}
          <div className="hidden sm:flex items-center gap-3 border-l border-slate-800 pl-3">
            {/* Streak */}
            <div 
              id="user-streak-pill"
              className="flex items-center gap-1 text-xs font-bold text-amber-400" 
              title={`${userState.streakDays} ${t.nav.streak}`}
            >
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span className="font-mono-code">{userState.streakDays}</span>
            </div>

            {/* Level & Points */}
            <div className="flex flex-col items-end text-xs">
              <span className="font-semibold text-slate-200">
                {t.nav.level} {userState.level}
              </span>
              <span className="font-mono-code text-[10px] text-emerald-400">
                {userState.points.toLocaleString()} pts
              </span>
            </div>
          </div>

          {/* User Profile Avatar */}
          <button 
            id="nav-user-avatar"
            onClick={() => setTab('badges')}
            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#ff2e51]/80 bg-slate-800 text-xs font-bold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#ff2e51]/50"
          >
            OP
          </button>
        </div>
      </div>
    </header>
  );
};
