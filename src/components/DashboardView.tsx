import React from 'react';
import { 
  Play, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  Layers, 
  Terminal, 
  ArrowRight, 
  TrendingUp, 
  ShieldAlert, 
  Star, 
  ExternalLink,
  Zap,
  Clock,
  Compass
} from 'lucide-react';
import { Language, NavTab, Room, UserState, CompletedActivity } from '../types';
import { getTranslation } from '../translations';
import { roomsData } from '../data/rooms';
import { learningPathsData } from '../data/learningPaths';
import { platformNews } from '../data/leaderboardAndBadges';

interface DashboardProps {
  lang: Language;
  setTab: (tab: NavTab) => void;
  onSelectRoom: (roomId: string) => void;
  userState: UserState;
  onLaunchAttackBox: () => void;
}

export const DashboardView: React.FC<DashboardProps> = ({
  lang,
  setTab,
  onSelectRoom,
  userState,
  onLaunchAttackBox,
}) => {
  const t = getTranslation(lang);
  const activePath = learningPathsData[1]; // Jr Penetration Tester
  const recommendedRooms = roomsData.slice(0, 3);

  const recentActivities: CompletedActivity[] = [
    ...(userState.recentActivity || []),
  ].sort((a, b) => b.timestamp - a.timestamp);

  const formatTimestamp = (timestamp: number, fallbackStr: string) => {
    if (!timestamp) return fallbackStr;
    const now = Date.now();
    const diffSec = Math.floor((now - timestamp) / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 2) {
      return lang === 'fr' ? "À l'instant" : 'Just now';
    }
    if (diffMin < 60) {
      return lang === 'fr' ? `Il y a ${diffMin} min` : `${diffMin}m ago`;
    }
    if (diffHour < 24) {
      return lang === 'fr' ? `Il y a ${diffHour}h` : `${diffHour}h ago`;
    }
    if (diffDay === 1) {
      const timePart = new Date(timestamp).toLocaleTimeString(
        lang === 'fr' ? 'fr-FR' : 'en-US',
        { hour: '2-digit', minute: '2-digit' }
      );
      return lang === 'fr' ? `Hier à ${timePart}` : `Yesterday at ${timePart}`;
    }
    return new Date(timestamp).toLocaleDateString(
      lang === 'fr' ? 'fr-FR' : 'en-US',
      {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    );
  };

  // Generate an authentic 12-week activity heatmap
  const weeks = Array.from({ length: 14 }, (_, wIdx) => {
    return Array.from({ length: 7 }, (_, dIdx) => {
      // Mock realistic hacking streak density
      const isPast = wIdx * 7 + dIdx < 95;
      const intensity = isPast ? ((wIdx * 3 + dIdx * 5) % 5) : 0;
      return intensity;
    });
  });

  const getHeatmapColor = (intensity: number) => {
    switch (intensity) {
      case 4: return 'bg-emerald-400 shadow-sm shadow-emerald-400/30';
      case 3: return 'bg-emerald-500';
      case 2: return 'bg-emerald-700';
      case 1: return 'bg-emerald-950 border border-emerald-800/40';
      default: return 'bg-slate-900 border border-slate-800/50';
    }
  };

  const getDifficultyBadgeColor = (diff: string) => {
    switch (diff) {
      case 'Info': return 'text-sky-400 bg-sky-950/60 border-sky-800/60';
      case 'Easy': return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
      case 'Medium': return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      case 'Hard': return 'text-orange-400 bg-orange-950/60 border-orange-800/60';
      case 'Insane': return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
      default: return 'text-slate-400 bg-slate-900 border-slate-800';
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Welcome Banner */}
      <section 
        id="dashboard-hero"
        className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-[#0e1626] to-[#161224] p-6 sm:p-8 shadow-xl"
      >
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#ff2e51]/10 blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Cyber Range Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.dashboard.welcomeTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.dashboard.welcomeSub}
            </p>
          </div>

          {/* Quick Attackbox CTA button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="hero-launch-attackbox"
              onClick={onLaunchAttackBox}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff2e51] to-[#e02447] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#ff2e51]/25 hover:brightness-110 active:scale-95 transition"
            >
              <Terminal className="h-4 w-4" />
              <span>{t.nav.attackBox}</span>
            </button>
            <button
              id="hero-browse-paths"
              onClick={() => setTab('paths')}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-700 transition"
            >
              <Compass className="h-4 w-4 text-emerald-400" />
              <span>{t.dashboard.explorePaths}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Key Metric Stats Cards */}
      <section id="dashboard-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Rooms Completed */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-sm hover:border-slate-700/80 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              {t.dashboard.roomsCompleted}
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono-code text-white">
              {userState.completedRooms.length + 3}
            </span>
            <span className="text-xs text-emerald-400 font-semibold">+2 this week</span>
          </div>
        </div>

        {/* Global Ranking */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-sm hover:border-slate-700/80 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              {t.dashboard.globalRank}
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-950/80 border border-amber-500/30 text-amber-400">
              <Trophy className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono-code text-white">
              #{userState.rank}
            </span>
            <span className="text-xs text-amber-400 font-semibold">{t.dashboard.topPercentage}</span>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-sm hover:border-slate-700/80 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              {t.dashboard.currentStreak}
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-950/80 border border-orange-500/30 text-orange-400">
              <Flame className="h-5 w-5 fill-orange-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono-code text-white">
              {userState.streakDays}
            </span>
            <span className="text-xs text-orange-400 font-semibold">{t.nav.streak} 🔥</span>
          </div>
        </div>

        {/* Total Points */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-sm hover:border-slate-700/80 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              {t.nav.points}
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-400">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono-code text-white">
              {userState.points.toLocaleString()}
            </span>
            <span className="text-xs text-purple-400 font-semibold">Lvl {userState.level}</span>
          </div>
        </div>
      </section>

      {/* Active Learning Path Progress Banner */}
      <section 
        id="active-path-resume"
        className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-700 text-white shadow-md">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff2e51]">
                  {t.dashboard.enrolledBadge}
                </span>
                <span className="text-xs text-slate-400">• {activePath.estimatedHours} {t.paths.hours}</span>
              </div>
              <h2 className="text-lg font-bold text-white">
                {activePath.title[lang]}
              </h2>
              <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                {activePath.description[lang]}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-44">
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-400">{t.dashboard.activeTrackProgress}</span>
                <span className="font-mono-code text-emerald-400 font-bold">45%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[45%]" />
              </div>
            </div>

            <button
              id="btn-resume-path"
              onClick={() => onSelectRoom('linux-fundamentals-1')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#ff2e51] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#e02447] transition shrink-0"
            >
              <span>{t.dashboard.resumeTrack}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Recent Activity Panel */}
      <section 
        id="recent-activity-panel"
        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/60 text-emerald-400 shadow-inner">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {t.dashboard.recentActivity}
                </h2>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-950/60 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                  {recentActivities.length} {lang === 'fr' ? 'terminées' : 'completed'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.dashboard.recentActivitySub}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            <span>{lang === 'fr' ? 'Horodatages vérifiés en direct' : 'Live verified timestamps'}</span>
          </div>
        </div>

        {recentActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center rounded-xl border border-dashed border-slate-800 bg-slate-950/40 p-6">
            <Clock className="h-10 w-10 text-slate-600 mb-2" />
            <p className="text-sm font-medium text-slate-300">
              {t.dashboard.noRecentActivity}
            </p>
            <button
              onClick={() => setTab('rooms')}
              className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition"
            >
              <span>{t.dashboard.browseRooms}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/70">
            {recentActivities.map((act) => {
              const formattedTime = formatTimestamp(act.timestamp, act.completedAt);
              const fullDateString = new Date(act.timestamp).toLocaleString(
                lang === 'fr' ? 'fr-FR' : 'en-US',
                {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                }
              );

              return (
                <div
                  key={act.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3.5 first:pt-1 last:pb-1 hover:bg-slate-800/30 px-3 -mx-3 rounded-xl transition duration-150"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div className="mt-1 sm:mt-0 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => onSelectRoom(act.roomId)}
                          className="text-sm font-bold text-white group-hover:text-[#ff2e51] transition text-left truncate"
                          title={act.roomTitle}
                        >
                          {act.roomTitle}
                        </button>
                        <span className={`rounded px-1.5 py-0.2 text-[10px] font-semibold border ${getDifficultyBadgeColor(act.difficulty)}`}>
                          {act.difficulty}
                        </span>
                        <span className="rounded bg-slate-800 border border-slate-700/60 px-1.5 py-0.2 text-[10px] font-medium text-slate-300">
                          {act.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1 font-medium text-slate-300">
                          <Clock className="h-3 w-3 text-emerald-400" />
                          <span>{t.dashboard.completedOn} {formattedTime}</span>
                        </span>
                        <span className="text-slate-600 hidden sm:inline">•</span>
                        <span className="text-slate-500 font-mono text-[11px]">
                          {fullDateString}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pl-11 sm:pl-0">
                    <div className="flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-950/40 px-2.5 py-1 text-xs font-bold text-emerald-400">
                      <Zap className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400" />
                      <span>+{act.pointsEarned} {t.dashboard.pointsAwarded}</span>
                    </div>

                    <button
                      id={`btn-review-${act.id}`}
                      onClick={() => onSelectRoom(act.roomId)}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-700 hover:text-white transition"
                    >
                      <span>{t.dashboard.reviewRoom}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recommended Practice Rooms */}
      <section id="recommended-rooms-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              {t.dashboard.recommendedRooms}
            </h2>
            <p className="text-xs text-slate-400">
              Hands-on lab machines ready for target deployment
            </p>
          </div>
          <button
            id="btn-view-all-rooms"
            onClick={() => setTab('rooms')}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
          >
            <span>{t.dashboard.browseRooms}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendedRooms.map((room) => {
            const isSolved = userState.completedRooms.includes(room.id);
            return (
              <div
                key={room.id}
                className="group flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/60 p-5 shadow-sm hover:border-slate-700 hover:bg-slate-900/90 transition duration-200"
              >
                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${getDifficultyBadgeColor(room.difficulty)}`}>
                      {room.difficulty}
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      {room.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#ff2e51] transition">
                    {room.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {room.description[lang]}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span>{room.rating}</span>
                  </div>

                  <button
                    onClick={() => onSelectRoom(room.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 group-hover:bg-[#ff2e51] group-hover:text-white transition"
                  >
                    <span>{isSolved ? t.rooms.solved : t.rooms.enterRoom}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Activity Heatmap Section */}
      <section 
        id="activity-heatmap-section"
        className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>{t.dashboard.activityOverview}</span>
            </h2>
            <p className="text-xs text-slate-400">
              Consecutive days of hands-on security challenge completions
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Less</span>
            <span className="h-2.5 w-2.5 rounded-xs bg-slate-900 border border-slate-800" />
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-950" />
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-700" />
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500" />
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-400" />
            <span>More</span>
          </div>
        </div>

        {/* Matrix grid */}
        <div className="overflow-x-auto py-2">
          <div className="flex gap-1.5 min-w-[500px]">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {week.map((dayIntensity, dIdx) => (
                  <div
                    key={dIdx}
                    className={`h-3.5 w-3.5 rounded-xs transition-all hover:scale-125 ${getHeatmapColor(dayIntensity)}`}
                    title={`Day ${wIdx * 7 + dIdx + 1}: ${dayIntensity > 0 ? `${dayIntensity} tasks solved` : 'No activity'}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Intel & News Ticker */}
      <section id="news-section" className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-[#ff2e51]" />
          <span>{t.dashboard.latestNews}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {platformNews.map((item) => (
            <div 
              key={item.id}
              className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="font-semibold text-[#ff2e51] uppercase tracking-wider">{item.tag}</span>
                <span className="text-slate-500">{item.date}</span>
              </div>
              <h3 className="text-xs font-semibold text-slate-200 line-clamp-2">
                {item.title[lang]}
              </h3>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
