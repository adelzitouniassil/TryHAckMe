import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  ArrowRight, 
  Terminal, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Category, Difficulty, Language, Room, RoomType, UserState } from '../types';
import { getTranslation } from '../translations';
import { roomsData } from '../data/rooms';

interface RoomsBrowserProps {
  lang: Language;
  onSelectRoom: (roomId: string) => void;
  userState: UserState;
}

export const RoomsBrowserView: React.FC<RoomsBrowserProps> = ({
  lang,
  onSelectRoom,
  userState,
}) => {
  const t = getTranslation(lang);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const categories: Category[] = ['SQL', 'Web', 'Network', 'Linux', 'Windows', 'PrivEsc'];
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  const filteredRooms = useMemo(() => {
    return roomsData.filter((room) => {
      // Search query filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Difficulty filter
      const matchesDiff = selectedDifficulty === 'All' || room.difficulty === selectedDifficulty;

      // Category filter
      const matchesCat = selectedCategory === 'All' || room.category === selectedCategory;

      // Type filter
      const matchesType = selectedType === 'All' || room.type === selectedType;

      return matchesSearch && matchesDiff && matchesCat && matchesType;
    });
  }, [searchQuery, selectedDifficulty, selectedCategory, selectedType, lang]);

  const getDifficultyBadge = (diff: Difficulty) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
      case 'Medium':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      case 'Hard':
        return 'text-orange-400 bg-orange-950/60 border-orange-800/60';
      case 'Insane':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
      default:
        return 'text-sky-400 bg-sky-950/60 border-sky-800/60';
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('All');
    setSelectedCategory('All');
    setSelectedType('All');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/40 px-3 py-1 text-xs font-semibold text-sky-400">
          <Terminal className="h-3.5 w-3.5" />
          <span>{t.nav.rooms}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t.rooms.headerTitle}
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
          {t.rooms.headerSub}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 shadow-sm space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.rooms.searchRooms}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-[#ff2e51] focus:outline-none focus:ring-1 focus:ring-[#ff2e51]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3" />
              <span>{t.rooms.filterBy}:</span>
            </span>

            {/* Difficulty Pills */}
            <button
              onClick={() => setSelectedDifficulty('All')}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                selectedDifficulty === 'All'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.rooms.allDifficulties}
            </button>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  selectedDifficulty === diff
                    ? 'bg-[#ff2e51] text-white shadow'
                    : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.common.difficulty[diff]}
              </button>
            ))}
          </div>

          {/* Category Filter Dropdown / Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                selectedCategory === 'All'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.rooms.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.common.category[cat] || cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count & Clear */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing {filteredRooms.length} rooms</span>
        {(searchQuery || selectedDifficulty !== 'All' || selectedCategory !== 'All' || selectedType !== 'All') && (
          <button
            onClick={clearFilters}
            className="text-[#ff2e51] hover:underline font-semibold"
          >
            {t.rooms.clearFilters}
          </button>
        )}
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center">
          <p className="text-sm text-slate-400">{t.rooms.noRoomsFound}</p>
          <button
            onClick={clearFilters}
            className="mt-3 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            {t.rooms.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRooms.map((room) => {
            const isSolved = userState.completedRooms.includes(room.id);

            return (
              <div
                key={room.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm hover:border-slate-700 hover:bg-slate-900/90 transition duration-200"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${getDifficultyBadge(room.difficulty)}`}>
                        {room.difficulty}
                      </span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {room.category}
                      </span>
                    </div>

                    <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      {room.free ? t.rooms.freeRoom : t.rooms.vipRoom}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#ff2e51] transition">
                    {room.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {room.description[lang]}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1 font-semibold text-amber-400">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <span>{room.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-slate-500" />
                      <span>{room.usersEnrolled.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <span>{room.tasks.length} tasks</span>
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  {isSolved ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{t.rooms.solved}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">
                      {room.type === 'Walkthrough' ? t.rooms.walkthrough : t.rooms.challenge}
                    </span>
                  )}

                  <button
                    onClick={() => onSelectRoom(room.id)}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-bold text-white group-hover:bg-[#ff2e51] transition shadow-sm"
                  >
                    <span>{t.rooms.enterRoom}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
