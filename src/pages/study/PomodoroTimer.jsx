import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { getProgress, updateProgress, saveStudySession } from '@/utils/storage';
import { toast } from '@/hooks/use-toast';

const PomodoroTimer = () => {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('work');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [workDuration] = useState(25);
  const [shortBreakDuration] = useState(5);
  const [longBreakDuration] = useState(15);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDuration = () => {
    switch (sessionType) {
      case 'work': return workDuration * 60;
      case 'shortBreak': return shortBreakDuration * 60;
      case 'longBreak': return longBreakDuration * 60;
    }
  };

  const progress = ((getDuration() - timeLeft) / getDuration()) * 100;

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const completeSession = useCallback(() => {
    if (!user) return;

    if (sessionType === 'work') {
      const newSessionsCompleted = sessionsCompleted + 1;
      setSessionsCompleted(newSessionsCompleted);
      
      // Update progress in localStorage
      const currentProgress = getProgress(user.id);
      const updatedProgress = {
        ...currentProgress,
        pomodoro
          sessionsCompleted: currentProgress.pomodoro.sessionsCompleted + 1,
          totalMinutes: currentProgress.pomodoro.totalMinutes + workDuration,
          lastSession: new Date().toISOString(),
        }
      };
      updateProgress(updatedProgress);
      
      // Save study session
      saveStudySession({
        id: `session_${Date.now()}`,
        technique: 'Pomodoro',
        duration
        completedAt: new Date().toISOString(),
        userId);

      toast({
        title: "Pomodoro Completed! 🍅",
        description: `Great job! You've completed ${newSessionsCompleted} sessions today.`,
      });

      // Auto-start break
      if (newSessionsCompleted % 4 === 0) {
        setSessionType('longBreak');
        setTimeLeft(longBreakDuration * 60);
        toast({
          title: "Time for a Long Break!",
          description: "You've earned a 15-minute break. Relax and recharge!",
        });
      } else {
        setSessionType('shortBreak');
        setTimeLeft(shortBreakDuration * 60);
        toast({
          title: "Time for a Short Break!",
          description: "Take a 5-minute break before your next session.",
        });
      }
    } else {
      // Break completed
      setSessionType('work');
      setTimeLeft(workDuration * 60);
      toast({
        title: "Break Over!",
        description: "Ready for your next focused work session?",
      });
    }

    playNotificationSound();
    setIsActive(false);
  }, [user, sessionType, sessionsCompleted, workDuration, shortBreakDuration, longBreakDuration]);

  useEffect(() => {
    let interval= null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      completeSession();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, completeSession]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getDuration());
  };

  const startNewWorkSession = () => {
    setSessionType('work');
    setTimeLeft(workDuration * 60);
    setIsActive(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-primary/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">Pomodoro Timer</h1>
          <p className="text-muted-foreground text-lg">
            Focus for 25 minutes, then take a break. Boost your productivity with proven time management.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timer */}
          <div className="lg:col-span-2">
            <Card className="card-elevated text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Timer className="w-6 h-6 text-accent" />
                  <span>
                    {sessionType === 'work' && 'Focus Session'}
                    {sessionType === 'shortBreak' && 'Short Break'}
                    {sessionType === 'longBreak' && 'Long Break'}
                  </span>
                </CardTitle>
                <CardDescription>
                  Session {sessionsCompleted + 1} • Stay focused and productive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Timer Display */}
                <div className="relative">
                  <div className="text-6xl md:text-8xl font-bold text-gradient mb-4">
                    {formatTime(timeLeft)}
                  </div>
                  <Progress 
                    value={progress} 
                    className="h-3 w-full max-w-md mx-auto"
                  />
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={toggleTimer}
                    size="lg"
                    className={`btn-${sessionType === 'work' ? 'accent' : 'success'} px-8`}
                  >
                    {isActive ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        {timeLeft === getDuration() ? 'Start' : 'Resume'}
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={resetTimer}
                    variant="outline"
                    size="lg"
                    disabled={isActive}
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Session Type Selector */}
                <div className="flex justify-center space-x-2">
                  <Button
                    onClick={startNewWorkSession}
                    variant={sessionType === 'work' ? 'default' : 'outline'}
                    size="sm"
                    disabled={isActive}
                    className={sessionType === 'work' ? 'btn-accent' : ''}
                  >
                    Work (25m)
                  </Button>
                  <Button
                    onClick={() => {
                      setSessionType('shortBreak');
                      setTimeLeft(shortBreakDuration * 60);
                      setIsActive(false);
                    }}
                    variant={sessionType === 'shortBreak' ? 'default' : 'outline'}
                    size="sm"
                    disabled={isActive}
                    className={sessionType === 'shortBreak' ? 'btn-success' : ''}
                  >
                    Short Break (5m)
                  </Button>
                  <Button
                    onClick={() => {
                      setSessionType('longBreak');
                      setTimeLeft(longBreakDuration * 60);
                      setIsActive(false);
                    }}
                    variant={sessionType === 'longBreak' ? 'default' : 'outline'}
                    size="sm"
                    disabled={isActive}
                    className={sessionType === 'longBreak' ? 'btn-success' : ''}
                  >
                    Long Break (15m)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Tips */}
          <div className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Today's Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Sessions Completed</span>
                    <span className="font-semibold">{sessionsCompleted}</span>
                  </div>
                  <Progress value={Math.min((sessionsCompleted / 8) * 100, 100)} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Focus Time</span>
                    <span className="font-semibold">{sessionsCompleted * workDuration} min</span>
                  </div>
                  <Progress value={Math.min((sessionsCompleted * workDuration / 200) * 100, 100)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <span>Pomodoro Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Turn off notifications and distractions</p>
                <p>• Use breaks to stretch or walk around</p>
                <p>• Take a long break after 4 sessions</p>
                <p>• Focus on one task per session</p>
                <p>• Keep a water bottle nearby</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p><strong>1. Work:</strong> Focus for 25 minutes</p>
                <p><strong>2. Short Break:</strong> Relax for 5 minutes</p>
                <p><strong>3. Repeat:</strong> Complete 4 work sessions</p>
                <p><strong>4. Long Break:</strong> Take a 15-30 minute break</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;