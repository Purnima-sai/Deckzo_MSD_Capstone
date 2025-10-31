import { User, StudyProgress, CornellNote, Quiz, QuizResult, StudySession } from '@/types';

const STORAGE_KEYS = {
  USER: 'deckzo_user',
  PROGRESS: 'deckzo_progress',
  CORNELL_NOTES: 'deckzo_cornell_notes',
  QUIZZES: 'deckzo_quizzes',
  QUIZ_RESULTS: 'deckzo_quiz_results',
  STUDY_SESSIONS: 'deckzo_study_sessions',
  POMODORO_SETTINGS: 'deckzo_pomodoro_settings',
};

// User management
export const saveUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
};

export const removeUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Progress tracking
export const getProgress = (userId: string): StudyProgress => {
  const progressData = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  const allProgress: Record<string, StudyProgress> = progressData ? JSON.parse(progressData) : {};
  
  return allProgress[userId] || {
    userId,
    pomodoro: {
      sessionsCompleted: 0,
      totalMinutes: 0,
      lastSession: null,
    },
    cornellNotes: {
      notesCreated: 0,
      lastNote: null,
    },
    quizzes: {
      quizzesTaken: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      lastQuiz: null,
    },
    focusMode: {
      sessionsCompleted: 0,
      totalMinutes: 0,
      lastSession: null,
    },
  };
};

export const updateProgress = (progress: StudyProgress): void => {
  const progressData = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  const allProgress: Record<string, StudyProgress> = progressData ? JSON.parse(progressData) : {};
  allProgress[progress.userId] = progress;
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));
};

// Cornell Notes
export const saveCornellNote = (note: CornellNote): void => {
  const notesData = localStorage.getItem(STORAGE_KEYS.CORNELL_NOTES);
  const notes: CornellNote[] = notesData ? JSON.parse(notesData) : [];
  const existingIndex = notes.findIndex(n => n.id === note.id);
  
  if (existingIndex >= 0) {
    notes[existingIndex] = note;
  } else {
    notes.push(note);
  }
  
  localStorage.setItem(STORAGE_KEYS.CORNELL_NOTES, JSON.stringify(notes));
};

export const getCornellNotes = (userId: string): CornellNote[] => {
  const notesData = localStorage.getItem(STORAGE_KEYS.CORNELL_NOTES);
  const notes: CornellNote[] = notesData ? JSON.parse(notesData) : [];
  return notes.filter(note => note.userId === userId);
};

// Quizzes
export const saveQuiz = (quiz: Quiz): void => {
  const quizzesData = localStorage.getItem(STORAGE_KEYS.QUIZZES);
  const quizzes: Quiz[] = quizzesData ? JSON.parse(quizzesData) : [];
  const existingIndex = quizzes.findIndex(q => q.id === quiz.id);
  
  if (existingIndex >= 0) {
    quizzes[existingIndex] = quiz;
  } else {
    quizzes.push(quiz);
  }
  
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
};

export const getQuizzes = (userId: string): Quiz[] => {
  const quizzesData = localStorage.getItem(STORAGE_KEYS.QUIZZES);
  const quizzes: Quiz[] = quizzesData ? JSON.parse(quizzesData) : [];
  return quizzes.filter(quiz => quiz.userId === userId);
};

export const getQuiz = (quizId: string): Quiz | null => {
  const quizzesData = localStorage.getItem(STORAGE_KEYS.QUIZZES);
  const quizzes: Quiz[] = quizzesData ? JSON.parse(quizzesData) : [];
  return quizzes.find(quiz => quiz.id === quizId) || null;
};

// Quiz Results
export const saveQuizResult = (result: QuizResult): void => {
  const resultsData = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
  const results: QuizResult[] = resultsData ? JSON.parse(resultsData) : [];
  results.push(result);
  localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results));
};

export const getQuizResults = (userId: string): QuizResult[] => {
  const resultsData = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
  const results: QuizResult[] = resultsData ? JSON.parse(resultsData) : [];
  return results.filter(result => result.userId === userId);
};

// Study Sessions
export const saveStudySession = (session: StudySession): void => {
  const sessionsData = localStorage.getItem(STORAGE_KEYS.STUDY_SESSIONS);
  const sessions: StudySession[] = sessionsData ? JSON.parse(sessionsData) : [];
  sessions.push(session);
  localStorage.setItem(STORAGE_KEYS.STUDY_SESSIONS, JSON.stringify(sessions));
};