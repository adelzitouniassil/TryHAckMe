import React, { useState } from 'react';
import { Trophy, Medal, Award, Flame, Globe2, ArrowUp, Shield } from 'lucide-react';
import { Language, UserState } from '../types';
import { getTranslation } from '../translations';
import { initialLeaderboard } from '../data/leaderboardAndBadges';

interface LeaderboardProps {
  lang: Language;
  userState: UserState;
}

export const LeaderboardView: React.FC<LeaderboardProps> = ({
  lang,
  userState,
}) => {
  const t = getTranslation(lang);
  const [activeTab, setActiveTab] = useState<'global' | 'monthly'>('global');

  // Insert user's dynamic points into the leaderboard
  const leaderboardData = initialLeaderboard.map((u) => {
    if (u.isCurrentUser) {
      return {
        ...u,
        points: userState.points,
        level: userState.level,
        rank: userState.rank,
      };
    }
    return u;
  });

  const topThree = leaderboardData.slice(0, 3);
  const restUsers = leaderboardData.slice(3);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-400">
          <Trophy className="h-3.5 w-3.5" />
          <span>{t.nav.compete}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t.leaderboard.title}
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
          {t.leaderboard.sub}
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('global')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            activeTab === 'global'
              ? 'bg-[#ff2e51] text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          {t.leaderboard.globalRanking}
        </button>
        <button
          onClick={() => setActiveTab('monthly')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            activeTab === 'monthly'
              ? 'bg-[#ff2e51] text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          {t.leaderboard.monthlyRanking}
        </button>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pt-4">
        {/* Rank 2 (Silver) */}
        {topThree[1] && (
          <div className="flex flex-col items-center rounded-2xl border border-slate-700 bg-slate-900/60 p-6 shadow-md order-2 md:order-1 relative">
            <span className="absolute -top-3.5 rounded-full bg-slate-300 text-slate-900 px-3 py-0.5 text-xs font-black shadow">
              #2 SILVER
            </span>
            <img
              src={topThree[1].avatar}
              alt={topThree[1].username}
              className="h-16 w-16 rounded-full border-2 border-slate-400 object-cover shadow-lg mb-3"
            />
            <h3 className="font-bold text-white text-base">{topThree[1].username}</h3>
            <span className="text-xs text-slate-400">{topThree[1].country} • {topThree[1].title}</span>
            <div className="mt-4 text-center">
              <span className="font-mono-code text-lg font-extrabold text-slate-200">
                {topThree[1].points.toLocaleString()} pts
              </span>
              <p className="text-[11px] text-emerald-400 font-semibold">Level {topThree[1].level}</p>
            </div>
          </div>
        )}

        {/* Rank 1 (Gold) */}
        {topThree[0] && (
          <div className="flex flex-col items-center rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-amber-950/40 to-slate-900/80 p-8 shadow-xl order-1 md:order-2 relative -translate-y-2">
            <span className="absolute -top-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-4 py-1 text-xs font-black shadow-lg">
              👑 #1 CHAMPION
            </span>
            <img
              src={topThree[0].avatar}
              alt={topThree[0].username}
              className="h-20 w-20 rounded-full border-4 border-amber-400 object-cover shadow-lg shadow-amber-500/20 mb-3"
            />
            <h3 className="font-extrabold text-white text-lg">{topThree[0].username}</h3>
            <span className="text-xs text-amber-300/80">{topThree[0].country} • {topThree[0].title}</span>
            <div className="mt-4 text-center">
              <span className="font-mono-code text-2xl font-black text-amber-400">
                {topThree[0].points.toLocaleString()} pts
              </span>
              <p className="text-xs text-emerald-400 font-bold">Level {topThree[0].level} Master</p>
            </div>
          </div>
        )}

        {/* Rank 3 (Bronze) */}
        {topThree[2] && (
          <div className="flex flex-col items-center rounded-2xl border border-amber-800/40 bg-slate-900/60 p-6 shadow-md order-3 relative">
            <span className="absolute -top-3.5 rounded-full bg-amber-700 text-amber-100 px-3 py-0.5 text-xs font-black shadow">
              #3 BRONZE
            </span>
            <img
              src={topThree[2].avatar}
              alt={topThree[2].username}
              className="h-16 w-16 rounded-full border-2 border-amber-700 object-cover shadow-lg mb-3"
            />
            <h3 className="font-bold text-white text-base">{topThree[2].username}</h3>
            <span className="text-xs text-slate-400">{topThree[2].country} • {topThree[2].title}</span>
            <div className="mt-4 text-center">
              <span className="font-mono-code text-lg font-extrabold text-slate-200">
                {topThree[2].points.toLocaleString()} pts
              </span>
              <p className="text-[11px] text-emerald-400 font-semibold">Level {topThree[2].level}</p>
            </div>
          </div>
        )}
      </div>

      {/* Full Leaderboard Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-md">
        <div className="border-b border-slate-800 bg-slate-950/60 px-6 py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
          <div className="flex items-center gap-6">
            <span className="w-8 text-center">{t.leaderboard.rank}</span>
            <span>{t.leaderboard.user}</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="hidden sm:inline">{t.leaderboard.tier}</span>
            <span className="w-20 text-right">{t.leaderboard.points}</span>
          </div>
        </div>

        <div className="divide-y divide-slate-800/60">
          {leaderboardData.map((user) => {
            return (
              <div
                key={user.username}
                className={`flex items-center justify-between px-6 py-4 text-xs transition ${
                  user.isCurrentUser
                    ? 'bg-[#ff2e51]/10 border-l-4 border-l-[#ff2e51]'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                {/* User info */}
                <div className="flex items-center gap-6">
                  <span className={`w-8 text-center font-mono-code font-bold ${
                    user.rank === 1 ? 'text-amber-400 font-extrabold' : user.rank <= 3 ? 'text-slate-200' : 'text-slate-400'
                  }`}>
                    #{user.rank}
                  </span>

                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="h-8 w-8 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {user.username}
                        </span>
                        {user.isCurrentUser && (
                          <span className="rounded bg-[#ff2e51] px-1.5 py-0.2 text-[9px] font-extrabold uppercase tracking-wider text-white">
                            YOU
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {user.country} • Level {user.level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score & Tier */}
                <div className="flex items-center gap-8">
                  <span className="hidden sm:inline rounded bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                    {user.title}
                  </span>
                  <span className="w-20 text-right font-mono-code text-sm font-bold text-emerald-400">
                    {user.points.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
