import React, { useState } from 'react';
import { Layers, Clock, BookOpen, Check, ArrowRight, Shield, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { Language, LearningPath, UserState } from '../types';
import { getTranslation } from '../translations';
import { learningPathsData } from '../data/learningPaths';
import { roomsData } from '../data/rooms';

interface LearningPathsViewProps {
  lang: Language;
  onSelectRoom: (roomId: string) => void;
  userState: UserState;
  onToggleEnroll: (pathId: string) => void;
}

export const LearningPathsView: React.FC<LearningPathsViewProps> = ({
  lang,
  onSelectRoom,
  userState,
  onToggleEnroll,
}) => {
  const t = getTranslation(lang);
  const [expandedPathId, setExpandedPathId] = useState<string | null>('jr-pentester');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
          <Layers className="h-3.5 w-3.5" />
          <span>{t.nav.paths}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t.paths.headerTitle}
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
          {t.paths.headerSub}
        </p>
      </div>

      {/* Grid of paths */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {learningPathsData.map((path) => {
          const isEnrolled = userState.enrolledPaths.includes(path.id);
          const isExpanded = expandedPathId === path.id;
          const includedRooms = roomsData.filter((r) => path.roomIds.includes(r.id));

          return (
            <div
              key={path.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg hover:border-slate-700 transition"
            >
              {/* Path Card Banner */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${path.color} text-white shadow-md`}>
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {path.level[lang]}
                      </span>
                      <h3 className="text-lg font-bold text-white leading-snug">
                        {path.title[lang]}
                      </h3>
                    </div>
                  </div>

                  {isEnrolled && (
                    <span className="flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                      <Check className="h-3 w-3" />
                      <span>{t.paths.enrolled}</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {path.description[lang]}
                </p>

                {/* Metadata details */}
                <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
                      <Clock className="h-3 w-3 text-emerald-400" />
                      <span>Hours</span>
                    </div>
                    <span className="font-mono-code text-sm font-bold text-white">
                      {path.estimatedHours}h
                    </span>
                  </div>

                  <div className="border-x border-slate-800">
                    <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
                      <Layers className="h-3 w-3 text-sky-400" />
                      <span>Modules</span>
                    </div>
                    <span className="font-mono-code text-sm font-bold text-white">
                      {path.modulesCount}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
                      <BookOpen className="h-3 w-3 text-amber-400" />
                      <span>Rooms</span>
                    </div>
                    <span className="font-mono-code text-sm font-bold text-white">
                      {path.roomsCount}
                    </span>
                  </div>
                </div>

                {/* Collapsible syllabus preview */}
                {isExpanded && includedRooms.length > 0 && (
                  <div className="mt-5 space-y-2.5 border-t border-slate-800/80 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t.paths.curriculum} ({includedRooms.length} featured labs):
                    </h4>
                    <div className="space-y-1.5">
                      {includedRooms.map((room) => {
                        const solved = userState.completedRooms.includes(room.id);
                        return (
                          <div
                            key={room.id}
                            className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-950/40 px-3 py-2 text-xs hover:border-slate-700 transition"
                          >
                            <div className="flex items-center gap-2">
                              {solved ? (
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                                  <Check className="h-2.5 w-2.5" />
                                </span>
                              ) : (
                                <span className="h-2 w-2 rounded-full bg-slate-600" />
                              )}
                              <span className="font-medium text-slate-200">{room.title}</span>
                              <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-400">
                                {room.difficulty}
                              </span>
                            </div>

                            <button
                              onClick={() => onSelectRoom(room.id)}
                              className="font-semibold text-emerald-400 hover:text-emerald-300"
                            >
                              Launch →
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="border-t border-slate-800 bg-slate-950/70 p-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => setExpandedPathId(isExpanded ? null : path.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
                >
                  <span>{isExpanded ? 'Hide Syllabus' : 'View Syllabus'}</span>
                  {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleEnroll(path.id)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                      isEnrolled
                        ? 'border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-[#ff2e51] text-white hover:bg-[#e02447] shadow-md shadow-[#ff2e51]/20'
                    }`}
                  >
                    {isEnrolled ? t.paths.enrolled : t.paths.enroll}
                  </button>

                  {includedRooms.length > 0 && (
                    <button
                      onClick={() => onSelectRoom(includedRooms[0].id)}
                      className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3.5 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900/60 transition"
                    >
                      <span>{t.paths.startLearning}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
