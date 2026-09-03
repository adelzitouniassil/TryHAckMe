import React from 'react';
import { 
  Award, 
  Flame, 
  Terminal, 
  Globe2, 
  ShieldAlert, 
  Skull, 
  Key, 
  Lock, 
  CheckCircle2, 
  Shield, 
  Calendar,
  Sparkles,
  Database
} from 'lucide-react';
import { Language, UserState } from '../types';
import { getTranslation } from '../translations';
import { initialBadges } from '../data/leaderboardAndBadges';

interface BadgesProps {
  lang: Language;
  userState: UserState;
}

export const BadgesView: React.FC<BadgesProps> = ({
  lang,
  userState,
}) => {
  const t = getTranslation(lang);

  const getBadgeIcon = (iconName: string, isUnlocked: boolean) => {
    const className = `h-7 w-7 ${isUnlocked ? 'text-white' : 'text-slate-500'}`;
    switch (iconName) {
      case 'flame': return <Flame className={className} />;
      case 'terminal': return <Terminal className={className} />;
      case 'globe': return <Globe2 className={className} />;
      case 'shield-alert': return <ShieldAlert className={className} />;
      case 'skull': return <Skull className={className} />;
      case 'key': return <Key className={className} />;
      case 'database': return <Database className={className} />;
      default: return <Award className={className} />;
    }
  };

  const unlockedCount = initialBadges.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3 py-1 text-xs font-semibold text-purple-400">
          <Award className="h-3.5 w-3.5" />
          <span>{t.nav.badges}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t.badges.title}
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
          {t.badges.sub}
        </p>
      </div>

      {/* User Hacker Dossier / Profile Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-[#1e1329] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#ff2e51] bg-slate-800 text-2xl font-black text-white shadow-lg shadow-[#ff2e51]/20">
              OP
            </div>
            <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow">
              <CheckCircle2 className="h-4 w-4" />
            </span>
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {userState.username}
              </h2>
              <span className="rounded-full bg-emerald-950 border border-emerald-500/40 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                Level {userState.level} Specialist
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono-code">
              ID: THM-714015 • Member since August 2026 • Certified Security Operator
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 pt-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Points</span>
                <span className="font-mono-code text-base font-extrabold text-white">{userState.points.toLocaleString()} pts</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Global Standing</span>
                <span className="font-mono-code text-base font-extrabold text-amber-400">Top 3% (#{userState.rank})</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Streak</span>
                <span className="font-mono-code text-base font-extrabold text-orange-400">{userState.streakDays} Days 🔥</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">{t.badges.unlockedCount}</span>
                <span className="font-mono-code text-base font-extrabold text-purple-400">{unlockedCount}/{initialBadges.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span>Achievement Showcase</span>
          </h2>
          <span className="text-xs text-slate-400">
            {unlockedCount} of {initialBadges.length} unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {initialBadges.map((badge) => {
            return (
              <div
                key={badge.id}
                className={`relative overflow-hidden rounded-2xl border p-5 transition ${
                  badge.unlocked
                    ? 'border-purple-500/30 bg-slate-900/80 shadow-md shadow-purple-950/20'
                    : 'border-slate-800/80 bg-slate-950/40 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${
                    badge.unlocked
                      ? 'bg-gradient-to-br from-purple-600 via-[#ff2e51] to-amber-500 shadow-purple-900/30'
                      : 'bg-slate-800 border border-slate-700'
                  }`}>
                    {getBadgeIcon(badge.icon, badge.unlocked)}
                  </div>

                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    badge.unlocked
                      ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}>
                    {badge.unlocked ? t.badges.unlocked : t.badges.locked}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {badge.name[lang]}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                  {badge.description[lang]}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="uppercase tracking-wider font-semibold">{badge.category}</span>
                  {badge.unlockedAt ? (
                    <span className="flex items-center gap-1 text-slate-400 font-mono-code">
                      <Calendar className="h-3 w-3" />
                      <span>{badge.unlockedAt}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-500">
                      <Lock className="h-3 w-3" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
