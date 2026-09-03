export type Language = 'en' | 'fr';

export type NavTab = 'dashboard' | 'paths' | 'rooms' | 'room-detail' | 'leaderboard' | 'badges';

export type Difficulty = 'Info' | 'Easy' | 'Medium' | 'Hard' | 'Insane';
export type RoomType = 'Walkthrough' | 'Challenge';
export type Category = 'Web' | 'Network' | 'Linux' | 'Windows' | 'PrivEsc' | 'Crypto' | 'Forensics' | 'SQL';

export interface LocalizedString {
  en: string;
  fr: string;
}

export interface Question {
  id: string;
  question: LocalizedString;
  hint?: LocalizedString;
  answer: string;
  points: number;
}

export interface Task {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  questions: Question[];
}

export interface Room {
  id: string;
  slug: string;
  title: string;
  description: LocalizedString;
  difficulty: Difficulty;
  category: Category;
  type: RoomType;
  targetIP?: string;
  free: boolean;
  usersEnrolled: number;
  rating: number;
  badgeIcon: string;
  tasks: Task[];
}

export interface LearningPath {
  id: string;
  title: LocalizedString;
  badgeName: string;
  description: LocalizedString;
  level: LocalizedString;
  estimatedHours: number;
  modulesCount: number;
  roomsCount: number;
  roomIds: string[];
  enrolled: number;
  color: string;
}

export interface UserBadge {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
  category: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  country: string;
  points: number;
  level: number;
  title: string;
  isCurrentUser?: boolean;
  avatar: string;
}

export interface TerminalEntry {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export interface CompletedActivity {
  id: string;
  roomId: string;
  roomTitle: string;
  category: Category;
  difficulty: Difficulty;
  completedAt: string;
  timestamp: number;
  pointsEarned: number;
}

export interface UserState {
  username: string;
  email: string;
  points: number;
  level: number;
  rank: number;
  streakDays: number;
  completedRooms: string[];
  answeredQuestions: string[];
  enrolledPaths: string[];
  attackBoxRunning: boolean;
  activeRoomId: string | null;
  targetMachineIp: string | null;
  targetMachineExpiry: number | null;
  recentActivity?: CompletedActivity[];
}
