import { LeaderboardUser, UserBadge } from '../types';

export const initialLeaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    username: '0xGhostInShell',
    country: '🇫🇷 FR',
    points: 42890,
    level: 21,
    title: 'Omniscient PwnGod',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  },
  {
    rank: 2,
    username: 'NullByte_Ninja',
    country: '🇬🇧 UK',
    points: 39420,
    level: 19,
    title: 'Binary Exploitation Guru',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
  },
  {
    rank: 3,
    username: 'CyberHexa',
    country: '🇨🇦 CA',
    points: 36150,
    level: 18,
    title: 'Red Team Operator',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
  },
  {
    rank: 4,
    username: 'KernelPanic99',
    country: '🇺🇸 US',
    points: 31200,
    level: 16,
    title: 'Kernel Cracker',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
  },
  {
    rank: 5,
    username: 'SudoSu_Marie',
    country: '🇫🇷 FR',
    points: 29840,
    level: 15,
    title: 'Threat Hunter Lead',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
  {
    rank: 42,
    username: 'Operator_You',
    country: '🇫🇷 FR',
    points: 2840,
    level: 7,
    title: 'Cyber Specialist',
    isCurrentUser: true,
    avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=120&q=80',
  },
];

export const initialBadges: UserBadge[] = [
  {
    id: 'badge-streak-7',
    name: {
      en: '7-Day Streak',
      fr: 'Série de 7 jours',
    },
    description: {
      en: 'Hacked consecutively for 7 straight days without breaking focus.',
      fr: 'Vous avez hacké pendant 7 jours consécutifs sans interruption.',
    },
    icon: 'flame',
    category: 'Commitment',
    unlocked: true,
    unlockedAt: '2026-08-28',
  },
  {
    id: 'badge-linux-master',
    name: {
      en: 'Linux Terminal Master',
      fr: 'Maître du Terminal Linux',
    },
    description: {
      en: 'Completed foundational Linux exploration rooms and mastered bash commands.',
      fr: 'Complété les salles fondamentales Linux et maîtrisé les commandes bash.',
    },
    icon: 'terminal',
    category: 'Systems',
    unlocked: true,
    unlockedAt: '2026-08-30',
  },
  {
    id: 'badge-web-warrior',
    name: {
      en: 'Web Exploiter',
      fr: 'Exploitant Web OWASP',
    },
    description: {
      en: 'Discovered and exploited OWASP Top 10 vulnerabilities in web applications.',
      fr: 'Découvert et exploité des vulnérabilités de l\'OWASP Top 10.',
    },
    icon: 'globe',
    category: 'Offensive',
    unlocked: true,
    unlockedAt: '2026-09-01',
  },
  {
    id: 'badge-eternal-blue',
    name: {
      en: 'EternalBlue Pwn',
      fr: 'Chasseur EternalBlue',
    },
    description: {
      en: 'Exploited Windows SMB vulnerability MS17-010 to obtain SYSTEM privileges.',
      fr: 'Exploité la vulnérabilité Windows SMB MS17-010 pour obtenir les privilèges SYSTEM.',
    },
    icon: 'shield-alert',
    category: 'Exploitation',
    unlocked: false,
  },
  {
    id: 'badge-pickle-survivor',
    name: {
      en: 'Pickle Rick Survivor',
      fr: 'Survivant Pickle Rick',
    },
    description: {
      en: 'Recovered all 3 secret ingredients in the Pickle Rick CTF challenge.',
      fr: 'Récupéré les 3 ingrédients secrets dans le défi CTF de Pickle Rick.',
    },
    icon: 'skull',
    category: 'CTF',
    unlocked: false,
  },
  {
    id: 'badge-privesc-god',
    name: {
      en: 'Root PrivEsc Overlord',
      fr: 'Seigneur de l\'Élévation Root',
    },
    description: {
      en: 'Bypassed SUID and sudoer security controls to achieve full root privileges.',
      fr: 'Contourné les contrôles de sécurité SUID pour obtenir un accès root complet.',
    },
    icon: 'key',
    category: 'PrivEsc',
    unlocked: false,
  },
  {
    id: 'badge-sql-master',
    name: {
      en: 'SQL Injection Operator',
      fr: 'Opérateur SQL Injection',
    },
    description: {
      en: 'Mastered SQL queries, UNION extraction, blind time-based injection, and prepared statement defenses.',
      fr: 'Maîtrisé les requêtes SQL, l\'extraction UNION, les injections aveugles et les requêtes préparées.',
    },
    icon: 'database',
    category: 'Offensive',
    unlocked: true,
    unlockedAt: '2026-09-02',
  },
];

export const platformNews = [
  {
    id: 'news-1',
    date: 'Sept 2026',
    title: {
      en: 'New Module: Active Directory Attacks & Kerberoasting',
      fr: 'Nouveau Module : Attaques Active Directory & Kerberoasting',
    },
    tag: 'Offensive',
  },
  {
    id: 'news-2',
    date: 'Aug 2026',
    title: {
      en: 'King of the Hill Weekend CTF Tournament Announced',
      fr: 'Tournoi CTF King of the Hill annoncé pour ce week-end',
    },
    tag: 'Community',
  },
  {
    id: 'news-3',
    date: 'Aug 2026',
    title: {
      en: 'Blue Team: Defending Against Ransomware in Healthcare Networks',
      fr: 'Blue Team : Défense contre les ransomwares dans les hôpitaux',
    },
    tag: 'Defense',
  },
];
