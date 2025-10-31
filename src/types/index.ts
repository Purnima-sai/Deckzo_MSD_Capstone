export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface StudySession {
  id: string;
  technique: string;
  duration: number;
  completedAt: string;
  userId: string;
}

export interface StudyProgress {
  userId: string;
  pomodoro: {
    sessionsCompleted: number;
    totalMinutes: number;
    lastSession: string | null;
  };
  cornellNotes: {
    notesCreated: number;
    lastNote: string | null;
  };
  quizzes: {
    quizzesTaken: number;
    correctAnswers: number;
    totalQuestions: number;
    lastQuiz: string | null;
  };
  focusMode: {
    sessionsCompleted: number;
    totalMinutes: number;
    lastSession: string | null;
  };
}

export interface PomodoroSettings {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
}

export interface CornellNote {
  id: string;
  title: string;
  notes: string;
  cues: string;
  summary: string;
  createdAt: string;
  userId: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  createdAt: string;
  userId: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  id: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  completedAt: string;
  userId: string;
}