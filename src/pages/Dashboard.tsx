import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  BookOpen, 
  Target, 
  Brain, 
  TrendingUp, 
  Calendar,
  Award,
  Play
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { getProgress } from '@/utils/storage';
import { StudyProgress } from '@/types';

const Dashboard = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<StudyProgress | null>(null);

  useEffect(() => {
    if (user) {
      const userProgress = getProgress(user.id);
      setProgress(userProgress);
    }
  }, [user]);

  if (!user || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const studyTechniques = [
    {
      name: 'Pomodoro Timer',
      icon: <Clock className="w-6 h-6" />,
      path: '/study/pomodoro',
      sessions: progress.pomodoro.sessionsCompleted,
      totalTime: progress.pomodoro.totalMinutes,
      description: 'Focus sessions completed',
      color: 'text-accent'
    },
    {
      name: 'Cornell Notes',
      icon: <BookOpen className="w-6 h-6" />,
      path: '/study/cornell-notes',
      sessions: progress.cornellNotes.notesCreated,
      totalTime: 0,
      description: 'Notes created',
      color: 'text-primary'
    },
    {
      name: 'Quiz Maker',
      icon: <Target className="w-6 h-6" />,
      path: '/study/quiz',
      sessions: progress.quizzes.quizzesTaken,
      totalTime: progress.quizzes.totalQuestions > 0 ? Math.round((progress.quizzes.correctAnswers / progress.quizzes.totalQuestions) * 100) : 0,
      description: 'Quizzes completed',
      color: 'text-success'
    },
    {
      name: 'Focus Mode',
      icon: <Brain className="w-6 h-6" />,
      path: '/study/focus-mode',
      sessions: progress.focusMode.sessionsCompleted,
      totalTime: progress.focusMode.totalMinutes,
      description: 'Focus sessions',
      color: 'text-focus'
    }
  ];

  const totalSessions = studyTechniques.reduce((sum, technique) => sum + technique.sessions, 0);
  const totalStudyTime = progress.pomodoro.totalMinutes + progress.focusMode.totalMinutes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-focus/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-bold text-primary">{totalSessions}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Time</p>
                  <p className="text-2xl font-bold text-success">{Math.round(totalStudyTime / 60)}h</p>
                </div>
                <Clock className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Notes Created</p>
                  <p className="text-2xl font-bold text-accent">{progress.cornellNotes.notesCreated}</p>
                </div>
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quiz Average</p>
                  <p className="text-2xl font-bold text-focus">
                    {progress.quizzes.totalQuestions > 0 
                      ? Math.round((progress.quizzes.correctAnswers / progress.quizzes.totalQuestions) * 100)
                      : 0}%
                  </p>
                </div>
                <Award className="w-8 h-8 text-focus" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Study Techniques */}
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>Study Techniques</span>
                </CardTitle>
                <CardDescription>
                  Choose a study method to continue your learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {studyTechniques.map((technique, index) => (
                    <Card key={index} className="card-study hover:border-primary/30 group">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`${technique.color}`}>
                            {technique.icon}
                          </div>
                          <Link to={technique.path}>
                            <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                        <h3 className="font-semibold mb-2">{technique.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{technique.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Sessions: {technique.sessions}</span>
                            {technique.totalTime > 0 && (
                              <span>
                                {technique.name === 'Quiz Maker' 
                                  ? `${technique.totalTime}% avg` 
                                  : `${Math.round(technique.totalTime / 60)}h`
                                }
                              </span>
                            )}
                          </div>
                          <Progress 
                            value={Math.min((technique.sessions / 10) * 100, 100)} 
                            className="h-2"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-success" />
                  <span>Quick Start</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/study/pomodoro">
                  <Button className="w-full btn-primary">
                    Start Pomodoro Session
                  </Button>
                </Link>
                <Link to="/study/cornell-notes">
                  <Button variant="outline" className="w-full">
                    Create Cornell Notes
                  </Button>
                </Link>
                <Link to="/study/quiz">
                  <Button variant="outline" className="w-full">
                    Take a Quiz
                  </Button>
                </Link>
                <Link to="/study-modes">
                  <Button variant="ghost" className="w-full text-primary">
                    View All Study Modes
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span>Today's Goal</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Daily Study Time</span>
                      <span>{Math.min(totalStudyTime, 120)}/120 min</span>
                    </div>
                    <Progress value={(Math.min(totalStudyTime, 120) / 120) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Study Sessions</span>
                      <span>{Math.min(totalSessions, 5)}/5 sessions</span>
                    </div>
                    <Progress value={(Math.min(totalSessions, 5) / 5) * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;