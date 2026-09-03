import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Square, 
  Terminal, 
  Clock, 
  Copy, 
  Check, 
  Lightbulb, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trophy, 
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Language, Question, Room, Task, UserState } from '../types';
import { getTranslation } from '../translations';

interface RoomDetailProps {
  room: Room;
  lang: Language;
  onBack: () => void;
  userState: UserState;
  onDeployMachine: (targetIp: string) => void;
  onTerminateMachine: () => void;
  onToggleAttackBox: () => void;
  onSubmitAnswer: (questionId: string, answer: string, points: number) => boolean;
  onSelectRoom: (roomId: string) => void;
}

export const RoomDetailView: React.FC<RoomDetailProps> = ({
  room,
  lang,
  onBack,
  userState,
  onDeployMachine,
  onTerminateMachine,
  onToggleAttackBox,
  onSubmitAnswer,
  onSelectRoom,
}) => {
  const t = getTranslation(lang);
  const [copiedIp, setCopiedIp] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [isDeploying, setIsDeploying] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour in seconds
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({
    [room.tasks[0]?.id || '']: true,
  });

  // Calculate total questions & answered count
  const allQuestions = room.tasks.flatMap((t) => t.questions);
  const answeredCount = allQuestions.filter((q) => userState.answeredQuestions.includes(q.id)).length;
  const isRoomCompleted = answeredCount === allQuestions.length && allQuestions.length > 0;
  const progressPercent = allQuestions.length > 0 ? Math.round((answeredCount / allQuestions.length) * 100) : 0;

  // Countdown timer when machine is running
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (userState.targetMachineIp) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      setTimeLeft(3600);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [userState.targetMachineIp]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      onDeployMachine(room.targetIP || '10.10.112.45');
    }, 1200);
  };

  const copyTargetIp = () => {
    if (userState.targetMachineIp) {
      navigator.clipboard.writeText(userState.targetMachineIp);
      setCopiedIp(true);
      setTimeout(() => setCopiedIp(false), 2000);
    }
  };

  const handleAnswerChange = (qId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
    setFeedback((prev) => ({ ...prev, [qId]: null }));
  };

  const handleQuestionSubmit = (q: Question) => {
    const userAnswer = answers[q.id] || '';
    if (!userAnswer.trim()) return;

    const isCorrect = onSubmitAnswer(q.id, userAnswer.trim(), q.points);
    setFeedback((prev) => ({
      ...prev,
      [q.id]: isCorrect ? 'correct' : 'incorrect',
    }));
  };

  const toggleHint = (qId: string) => {
    setRevealedHints((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleTask = (taskId: string) => {
    setExpandedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Back Nav & Quick Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t.roomDetail.backToRooms}</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300 font-mono-code">
            {room.category}
          </span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">{room.difficulty}</span>
        </div>
      </div>

      {/* Main Room Header & Virtual Machine Deployment Control */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-6">
        
        {/* Title & Metadata row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-md border border-emerald-500/40 bg-emerald-950/60 px-2 py-0.5 text-[11px] font-bold text-emerald-400">
                {room.type}
              </span>
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300">
                {room.free ? t.rooms.freeRoom : t.rooms.vipRoom}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold ml-2">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <span>{room.rating}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {room.title}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {room.description[lang]}
            </p>
          </div>

          {/* Virtual Machine Deployment Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 shrink-0 min-w-[280px]">
            {userState.targetMachineIp ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      {t.roomDetail.targetRunning}
                    </span>
                  </div>

                  {/* Timer & Add Time */}
                  <div className="flex items-center gap-1 text-xs font-mono-code text-slate-300">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    <span>{formatTimer(timeLeft)}</span>
                  </div>
                </div>

                {/* Target IP Pill */}
                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      {t.roomDetail.targetIp}
                    </span>
                    <span className="font-mono-code text-sm font-bold text-white tracking-wide">
                      {userState.targetMachineIp}
                    </span>
                  </div>
                  <button
                    onClick={copyTargetIp}
                    className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
                    title="Copy Target IP"
                  >
                    {copiedIp ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {/* Machine Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={onToggleAttackBox}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#ff2e51] px-3 py-2 text-xs font-bold text-white shadow-md hover:bg-[#e02447] transition"
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    <span>AttackBox</span>
                  </button>
                  <button
                    onClick={onTerminateMachine}
                    className="flex items-center justify-center gap-1 rounded-lg border border-rose-900/60 bg-rose-950/40 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-900/50 transition"
                    title={t.roomDetail.terminateMachine}
                  >
                    <Square className="h-3.5 w-3.5 fill-rose-400" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Interactive Cyber Range Target</span>
                </div>
                <button
                  id="btn-deploy-target-room"
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-900/30 hover:brightness-110 active:scale-95 disabled:opacity-50 transition"
                >
                  {isDeploying ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>{t.roomDetail.targetDeploying}</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>{t.roomDetail.deployTarget}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={onToggleAttackBox}
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition"
                >
                  <Terminal className="h-3 w-3 text-[#ff2e51]" />
                  <span>Open Standalone AttackBox</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar & Completion Stats */}
        <div className="border-t border-slate-800/80 pt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">
              {t.roomDetail.overallProgress}: {answeredCount}/{allQuestions.length} ({progressPercent}%)
            </span>
            <span className="font-mono-code text-emerald-400 font-bold">
              {allQuestions.reduce((acc, q) => userState.answeredQuestions.includes(q.id) ? acc + q.points : acc, 0)} pts earned
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Congratulations Banner if completed */}
        {isRoomCompleted && (
          <div className="rounded-xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/60 to-slate-900 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-md">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-300">
                  {t.roomDetail.congratulations}
                </h3>
                <p className="text-xs text-slate-300">
                  {t.roomDetail.congratsSub}
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectRoom('owasp-top-10')}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition shadow-md shrink-0"
            >
              <span>{t.roomDetail.nextRoom}</span>
              <Sparkles className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Tasks Walkthrough & Questions Section */}
      <div className="space-y-5">
        {room.tasks.map((task, idx) => {
          const isExpanded = !!expandedTasks[task.id];
          const taskAnswered = task.questions.filter((q) => userState.answeredQuestions.includes(q.id)).length;
          const isTaskDone = taskAnswered === task.questions.length && task.questions.length > 0;

          return (
            <div
              key={task.id}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-sm"
            >
              {/* Task Header Toggle */}
              <button
                onClick={() => toggleTask(task.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/40 transition select-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold font-mono-code ${
                    isTaskDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {isTaskDone ? <Check className="h-4 w-4" /> : idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {task.title[lang]}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      {taskAnswered}/{task.questions.length} questions completed
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isTaskDone && (
                    <span className="hidden sm:inline-block rounded-full bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      {t.roomDetail.completed}
                    </span>
                  )}
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </div>
              </button>

              {/* Task Content Body & Questions */}
              {isExpanded && (
                <div className="border-t border-slate-800 p-5 space-y-6">
                  
                  {/* Walkthrough Instructions / Cyber Guides */}
                  <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 whitespace-pre-line bg-slate-950/40 rounded-xl p-4 border border-slate-800/60">
                    {task.content[lang]}
                  </div>

                  {/* Task Questions */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2">
                      Questions for {task.title[lang]}
                    </h4>

                    {task.questions.map((q, qIndex) => {
                      const isAnswered = userState.answeredQuestions.includes(q.id);
                      const currentFeedback = feedback[q.id];
                      const isHintRevealed = !!revealedHints[q.id];

                      return (
                        <div
                          key={q.id}
                          className={`rounded-xl border p-4 transition-all ${
                            isAnswered
                              ? 'border-emerald-500/30 bg-emerald-950/20'
                              : 'border-slate-800 bg-slate-950/60'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span className="text-[#ff2e51]">Q{qIndex + 1}.</span>
                              <span>{q.question[lang]}</span>
                            </span>
                            <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono-code font-bold text-emerald-400 shrink-0">
                              +{q.points} pts
                            </span>
                          </div>

                          {/* Answer Input & Submit */}
                          <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <input
                              type="text"
                              value={isAnswered ? q.answer : (answers[q.id] || '')}
                              disabled={isAnswered}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              placeholder={t.roomDetail.enterAnswerPlaceholder}
                              className={`flex-1 rounded-xl border px-3.5 py-2 font-mono-code text-xs transition focus:outline-none ${
                                isAnswered
                                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 cursor-not-allowed'
                                  : currentFeedback === 'incorrect'
                                  ? 'border-rose-500/80 bg-rose-950/20 text-white animate-shake'
                                  : 'border-slate-700 bg-slate-900 text-white focus:border-[#ff2e51]'
                              }`}
                            />

                            {!isAnswered ? (
                              <button
                                onClick={() => handleQuestionSubmit(q)}
                                className="rounded-xl bg-[#ff2e51] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#e02447] active:scale-95 transition shrink-0"
                              >
                                {t.roomDetail.submitAnswer}
                              </button>
                            ) : (
                              <div className="flex items-center gap-1 rounded-xl bg-emerald-950/80 border border-emerald-500/30 px-3 py-2 text-xs font-bold text-emerald-400 shrink-0">
                                <Check className="h-3.5 w-3.5" />
                                <span>{t.roomDetail.answered}</span>
                              </div>
                            )}

                            {/* Hint button */}
                            {q.hint && !isAnswered && (
                              <button
                                onClick={() => toggleHint(q.id)}
                                className="flex items-center justify-center gap-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:border-slate-600 hover:text-white transition shrink-0"
                                title="Toggle Hint"
                              >
                                <Lightbulb className={`h-3.5 w-3.5 ${isHintRevealed ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
                                <span className="hidden sm:inline">{t.roomDetail.hint}</span>
                              </button>
                            )}
                          </div>

                          {/* Feedback Messages */}
                          {currentFeedback === 'incorrect' && (
                            <p className="mt-2 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
                              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                              <span>{t.roomDetail.answerIncorrect}</span>
                            </p>
                          )}

                          {currentFeedback === 'correct' && (
                            <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                              <span>{t.roomDetail.answerCorrect}</span>
                            </p>
                          )}

                          {/* Revealed Hint Card */}
                          {isHintRevealed && q.hint && !isAnswered && (
                            <div className="mt-2.5 rounded-lg border border-amber-500/30 bg-amber-950/30 p-2.5 text-xs text-amber-200">
                              <div className="flex items-center gap-1.5 font-bold mb-1">
                                <Lightbulb className="h-3 w-3 text-amber-400" />
                                <span>{t.roomDetail.hint}:</span>
                              </div>
                              <span>{q.hint[lang]}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
