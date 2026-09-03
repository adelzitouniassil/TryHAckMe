import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Layers, ArrowRight, CornerDownLeft } from 'lucide-react';
import { Language, NavTab } from '../types';
import { roomsData } from '../data/rooms';
import { learningPathsData } from '../data/learningPaths';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectRoom: (roomId: string) => void;
  onSelectPath: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectRoom,
  onSelectPath,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const matchedRooms = query.trim()
    ? roomsData.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description[lang].toLowerCase().includes(query.toLowerCase()) ||
          r.category.toLowerCase().includes(query.toLowerCase())
      )
    : roomsData.slice(0, 4);

  const matchedPaths = query.trim()
    ? learningPathsData.filter(
        (p) =>
          p.title[lang].toLowerCase().includes(query.toLowerCase()) ||
          p.description[lang].toLowerCase().includes(query.toLowerCase())
      )
    : learningPathsData.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="relative border-b border-slate-800 p-4 flex items-center">
          <Search className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search rooms, learning paths, or CVEs...' : 'Rechercher des salles, parcours ou CVEs...'}
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          
          {/* Paths */}
          {matchedPaths.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
                {lang === 'en' ? 'Learning Paths' : 'Parcours d\'apprentissage'}
              </span>
              <div className="space-y-1">
                {matchedPaths.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPath();
                      onClose();
                    }}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-slate-800/80 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="h-4 w-4 text-emerald-400" />
                      <div>
                        <span className="text-xs font-bold text-white block">{p.title[lang]}</span>
                        <span className="text-[11px] text-slate-400">{p.estimatedHours}h • {p.roomsCount} rooms</span>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rooms */}
          {matchedRooms.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
                {lang === 'en' ? 'Practice Rooms' : 'Salles de Pratique'}
              </span>
              <div className="space-y-1">
                {matchedRooms.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onSelectRoom(r.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-slate-800/80 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="h-4 w-4 text-sky-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{r.title}</span>
                          <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] text-slate-300 font-mono-code">
                            {r.difficulty}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 line-clamp-1">{r.description[lang]}</span>
                      </div>
                    </div>
                    <CornerDownLeft className="h-3.5 w-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedPaths.length === 0 && matchedRooms.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400">
              No results found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>Try searching "Linux", "SQL", "Blue", or "Eternal"</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
