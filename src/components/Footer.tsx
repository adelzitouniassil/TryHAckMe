import React from 'react';
import { ShieldCheck, Globe2, Heart, Github, Twitter, Disc as Discord } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../translations';

interface FooterProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, setLang }) => {
  const t = getTranslation(lang);

  return (
    <footer className="border-t border-slate-800 bg-[#090d16] text-slate-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff2e51] to-[#b91c1c] text-white shadow-md">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="font-extrabold tracking-tight text-white text-lg font-mono-code">
                TRY<span className="text-[#ff2e51]">HACK</span>ME
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {lang === 'en'
                ? 'TryHackMe is a free, hands-on online platform for learning cyber security, using hands-on exercises and virtual labs all through your browser.'
                : 'TryHackMe est une plateforme en ligne gratuite et immersive pour apprendre la cybersécurité grâce à des exercices pratiques et des laboratoires virtuels.'}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{lang === 'en' ? 'All Systems Operational' : 'Tous les systèmes opérationnels'}</span>
            </div>
          </div>

          {/* Links: Learn */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {lang === 'en' ? 'Learn & Paths' : 'Apprendre & Parcours'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-white cursor-pointer">Pre-Security</li>
              <li className="hover:text-white cursor-pointer">Complete Beginner</li>
              <li className="hover:text-white cursor-pointer">Web Fundamentals</li>
              <li className="hover:text-white cursor-pointer">Jr Penetration Tester</li>
              <li className="hover:text-white cursor-pointer">Cyber Defense SOC</li>
            </ul>
          </div>

          {/* Links: Practice */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {lang === 'en' ? 'Practice & Rooms' : 'Pratique & Salles'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-white cursor-pointer">Linux Fundamentals</li>
              <li className="hover:text-white cursor-pointer">OWASP Top 10</li>
              <li className="hover:text-white cursor-pointer">EternalBlue (MS17-010)</li>
              <li className="hover:text-white cursor-pointer">Pickle Rick CTF</li>
              <li className="hover:text-white cursor-pointer">Network Services</li>
            </ul>
          </div>

          {/* Links: Platform & Languages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {lang === 'en' ? 'Language / Langue' : 'Langue / Language'}
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setLang('en')}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-left transition ${
                  lang === 'en' ? 'bg-[#ff2e51] text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <span>🇬🇧</span>
                <span>English (US/UK)</span>
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-left transition ${
                  lang === 'fr' ? 'bg-[#ff2e51] text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <span>🇫🇷</span>
                <span>Français (France)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 TryHackMe Clone. Built with authentic hands-on cyber security labs in English & Français.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
