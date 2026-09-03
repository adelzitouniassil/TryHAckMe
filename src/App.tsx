import React, { useState, useEffect } from 'react';
import { Language, NavTab, Room, UserState } from './types';
import { roomsData } from './data/rooms';
import { learningPathsData } from './data/learningPaths';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { LearningPathsView } from './components/LearningPathsView';
import { RoomsBrowserView } from './components/RoomsBrowserView';
import { RoomDetailView } from './components/RoomDetailView';
import { LeaderboardView } from './components/LeaderboardView';
import { BadgesView } from './components/BadgesView';
import { AttackBoxModal } from './components/AttackBoxModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

const STORAGE_KEY_USER = 'thm_user_state_v1';
const STORAGE_KEY_LANG = 'thm_language_v1';

const defaultUserState: UserState = {
  username: 'Operator_You',
  email: 'operator@tryhackme.local',
  points: 2840,
  level: 7,
  rank: 42,
  streakDays: 14,
  completedRooms: ['linux-fundamentals-1'],
  answeredQuestions: ['q1-1', 'q1-2', 'q2-1'],
  enrolledPaths: ['jr-pentester', 'complete-beginner'],
  attackBoxRunning: false,
  activeRoomId: null,
  targetMachineIp: null,
  targetMachineExpiry: null,
  recentActivity: [
    {
      id: 'act-1',
      roomId: 'linux-fundamentals-1',
      roomTitle: 'Linux Fundamentals Part 1',
      category: 'Linux',
      difficulty: 'Easy',
      completedAt: 'Today at 08:45',
      timestamp: Date.now() - 1000 * 60 * 75, // 75 mins ago
      pointsEarned: 180,
    },
    {
      id: 'act-2',
      roomId: 'network-services',
      roomTitle: 'Network Services (SMB & Telnet)',
      category: 'Network',
      difficulty: 'Easy',
      completedAt: 'Yesterday at 17:30',
      timestamp: Date.now() - 1000 * 60 * 60 * 22, // 22 hours ago
      pointsEarned: 240,
    },
    {
      id: 'act-3',
      roomId: 'owasp-top-10',
      roomTitle: 'OWASP Top 10 Web Security',
      category: 'Web',
      difficulty: 'Medium',
      completedAt: 'Aug 30, 2026 at 14:15',
      timestamp: Date.now() - 1000 * 60 * 60 * 72, // 3 days ago
      pointsEarned: 320,
    },
  ],
};

export default function App() {
  // Language state (persisted or defaults to 'fr' as requested by French prompt, with instant 'en' toggle)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return saved === 'en' || saved === 'fr' ? saved : 'fr';
  });

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('linux-fundamentals-1');

  // User state
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.recentActivity || parsed.recentActivity.length === 0) {
          parsed.recentActivity = defaultUserState.recentActivity;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return defaultUserState;
  });

  // Modals
  const [isAttackBoxOpen, setIsAttackBoxOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userState));
  }, [userState]);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleDeployMachine = (targetIp: string) => {
    setUserState((prev) => ({
      ...prev,
      targetMachineIp: targetIp,
      attackBoxRunning: true,
      targetMachineExpiry: Date.now() + 3600 * 1000,
    }));
    setIsAttackBoxOpen(true);
  };

  const handleTerminateMachine = () => {
    setUserState((prev) => ({
      ...prev,
      targetMachineIp: null,
      attackBoxRunning: false,
      targetMachineExpiry: null,
    }));
  };

  const handleToggleAttackBox = () => {
    setIsAttackBoxOpen((prev) => !prev);
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setCurrentTab('room-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleEnroll = (pathId: string) => {
    setUserState((prev) => {
      const isEnrolled = prev.enrolledPaths.includes(pathId);
      const newPaths = isEnrolled
        ? prev.enrolledPaths.filter((id) => id !== pathId)
        : [...prev.enrolledPaths, pathId];
      return { ...prev, enrolledPaths: newPaths };
    });
  };

  const handleSubmitAnswer = (questionId: string, answer: string, points: number): boolean => {
    // Find question across all rooms
    let foundQuestion: any = null;
    let parentRoom: Room | null = null;

    for (const room of roomsData) {
      for (const task of room.tasks) {
        for (const q of task.questions) {
          if (q.id === questionId) {
            foundQuestion = q;
            parentRoom = room;
            break;
          }
        }
      }
    }

    if (!foundQuestion) return false;

    // Compare answer
    const cleanedInput = answer.trim().toLowerCase();
    const cleanedExpected = foundQuestion.answer.trim().toLowerCase();

    const isMatch =
      cleanedInput === cleanedExpected ||
      cleanedInput.replace(/\s+/g, '') === cleanedExpected.replace(/\s+/g, '');

    if (isMatch && !userState.answeredQuestions.includes(questionId)) {
      setUserState((prev) => {
        const newAnswered = [...prev.answeredQuestions, questionId];
        const newPoints = prev.points + points;
        const newLevel = Math.floor(newPoints / 450) + 1;
        const newRank = Math.max(1, prev.rank - 1);

        // Check if all questions in parentRoom are now answered
        let newCompletedRooms = [...prev.completedRooms];
        let newRecentActivity = [...(prev.recentActivity || [])];
        if (parentRoom) {
          const roomQuestions = parentRoom.tasks.flatMap((t) => t.questions.map((q) => q.id));
          const allAnswered = roomQuestions.every((qId) => newAnswered.includes(qId));
          if (allAnswered && !newCompletedRooms.includes(parentRoom.id)) {
            newCompletedRooms.push(parentRoom.id);
            const totalRoomPoints = parentRoom.tasks
              .flatMap((t) => t.questions)
              .reduce((sum, q) => sum + q.points, 0);

            newRecentActivity = [
              {
                id: `act-${Date.now()}`,
                roomId: parentRoom.id,
                roomTitle: parentRoom.title,
                category: parentRoom.category,
                difficulty: parentRoom.difficulty,
                completedAt: 'Just now',
                timestamp: Date.now(),
                pointsEarned: totalRoomPoints,
              },
              ...newRecentActivity,
            ];
          }
        }

        return {
          ...prev,
          answeredQuestions: newAnswered,
          points: newPoints,
          level: newLevel,
          rank: newRank,
          completedRooms: newCompletedRooms,
          recentActivity: newRecentActivity,
        };
      });
      return true;
    }

    return isMatch;
  };

  // Selected room object
  const activeRoom = roomsData.find((r) => r.id === selectedRoomId) || roomsData[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1120] text-slate-100 selection:bg-[#ff2e51] selection:text-white">
      
      {/* Top TryHackMe Navbar */}
      <Navbar
        currentTab={currentTab}
        setTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        userState={userState}
        onToggleAttackBox={handleToggleAttackBox}
        onTerminateMachine={handleTerminateMachine}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'dashboard' && (
          <DashboardView
            lang={lang}
            setTab={setCurrentTab}
            onSelectRoom={handleSelectRoom}
            userState={userState}
            onLaunchAttackBox={handleToggleAttackBox}
          />
        )}

        {currentTab === 'paths' && (
          <LearningPathsView
            lang={lang}
            onSelectRoom={handleSelectRoom}
            userState={userState}
            onToggleEnroll={handleToggleEnroll}
          />
        )}

        {currentTab === 'rooms' && (
          <RoomsBrowserView
            lang={lang}
            onSelectRoom={handleSelectRoom}
            userState={userState}
          />
        )}

        {currentTab === 'room-detail' && (
          <RoomDetailView
            room={activeRoom}
            lang={lang}
            onBack={() => setCurrentTab('rooms')}
            userState={userState}
            onDeployMachine={handleDeployMachine}
            onTerminateMachine={handleTerminateMachine}
            onToggleAttackBox={handleToggleAttackBox}
            onSubmitAnswer={handleSubmitAnswer}
            onSelectRoom={handleSelectRoom}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardView
            lang={lang}
            userState={userState}
          />
        )}

        {currentTab === 'badges' && (
          <BadgesView
            lang={lang}
            userState={userState}
          />
        )}
      </main>

      {/* TryHackMe In-browser AttackBox Terminal */}
      <AttackBoxModal
        isOpen={isAttackBoxOpen}
        onClose={() => setIsAttackBoxOpen(false)}
        lang={lang}
        targetIP={userState.targetMachineIp}
      />

      {/* Quick Search Palette (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
        onSelectRoom={handleSelectRoom}
        onSelectPath={() => setCurrentTab('paths')}
      />

      {/* Footer */}
      <Footer lang={lang} setLang={setLang} />

    </div>
  );
}
