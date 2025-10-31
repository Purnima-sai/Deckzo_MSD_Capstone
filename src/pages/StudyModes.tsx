import { Link } from 'react-router-dom';
import { 
  Clock, 
  BookOpen, 
  Target, 
  Brain, 
  Users, 
  Code, 
  Lightbulb, 
  FileText,
  Timer,
  Zap,
  BookMarked,
  Repeat
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const StudyModes = () => {
  const studyTechniques = [
    {
      id: 'pomodoro',
      name: 'Pomodoro Timer',
      description: 'Break your study time into focused 25-minute intervals with short breaks.',
      icon: <Clock className="w-8 h-8" />,
      color: 'text-accent',
      bgColor: 'from-accent/10 to-accent/5',
      path: '/study/pomodoro',
      features: ['25-min focus sessions', '5-min breaks', 'Progress tracking', 'Sound notifications'],
      difficulty: 'Beginner',
      timeRequired: '25-50 min',
      available: true
    },
    {
      id: 'cornell-notes',
      name: 'Cornell Notes',
      description: 'Structured note-taking system that divides your page into cues, notes, and summary.',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'text-primary',
      bgColor: 'from-primary/10 to-primary/5',
      path: '/study/cornell-notes',
      features: ['Structured layout', 'Cues & keywords', 'Summary section', 'Easy review'],
      difficulty: 'Beginner',
      timeRequired: '30+ min',
      available: true
    },
    {
      id: 'quiz-maker',
      name: 'Quiz Creator',
      description: 'Create and take custom quizzes to test your knowledge and retention.',
      icon: <Target className="w-8 h-8" />,
      color: 'text-success',
      bgColor: 'from-success/10 to-success/5',
      path: '/study/quiz',
      features: ['Custom questions', 'Multiple choice', 'Instant feedback', 'Score tracking'],
      difficulty: 'Beginner',
      timeRequired: '15-30 min',
      available: true
    },
    {
      id: 'focus-mode',
      name: 'Focus Mode',
      description: 'Distraction-free environment with ambient sounds and focus tools.',
      icon: <Brain className="w-8 h-8" />,
      color: 'text-focus',
      bgColor: 'from-focus/10 to-focus/5',
      path: '/study/focus-mode',
      features: ['Distraction blocking', 'Ambient sounds', 'Focus timer', 'Goal setting'],
      difficulty: 'Beginner',
      timeRequired: 'Flexible',
      available: false
    },
    {
      id: 'collab-notes',
      name: 'CollabNotes',
      description: 'Collaborative note-taking with real-time sharing and team features.',
      icon: <Users className="w-8 h-8" />,
      color: 'text-primary',
      bgColor: 'from-primary/10 to-primary/5',
      path: '/study/collab-notes',
      features: ['Real-time editing', 'Team sharing', 'Version history', 'Comments'],
      difficulty: 'Intermediate',
      timeRequired: '30+ min',
      available: false
    },
    {
      id: 'mind-mapping',
      name: 'Mind Mapping',
      description: 'Visual learning tool to connect ideas and concepts in a structured diagram.',
      icon: <Lightbulb className="w-8 h-8" />,
      color: 'text-accent',
      bgColor: 'from-accent/10 to-accent/5',
      path: '/study/mind-mapping',
      features: ['Visual connections', 'Drag & drop', 'Color coding', 'Export options'],
      difficulty: 'Intermediate',
      timeRequired: '20-45 min',
      available: false
    },
    {
      id: 'codeshare',
      name: 'Codeshare Pad',
      description: 'Collaborative code editor for programming study sessions and practice.',
      icon: <Code className="w-8 h-8" />,
      color: 'text-success',
      bgColor: 'from-success/10 to-success/5',
      path: '/study/codeshare',
      features: ['Syntax highlighting', 'Real-time editing', 'Multiple languages', 'Share links'],
      difficulty: 'Advanced',
      timeRequired: '30+ min',
      available: false
    },
    {
      id: 'brain-dump',
      name: 'Brain Dump',
      description: 'Free-form writing space to quickly capture and organize your thoughts.',
      icon: <FileText className="w-8 h-8" />,
      color: 'text-focus',
      bgColor: 'from-focus/10 to-focus/5',
      path: '/study/brain-dump',
      features: ['Free-form writing', 'Quick capture', 'Tagging system', 'Search & organize'],
      difficulty: 'Beginner',
      timeRequired: '10-20 min',
      available: false
    },
    {
      id: 'spaced-repetition',
      name: 'Spaced Repetition',
      description: 'Optimize memory retention with scientifically-timed review sessions.',
      icon: <Repeat className="w-8 h-8" />,
      color: 'text-primary',
      bgColor: 'from-primary/10 to-primary/5',
      path: '/study/spaced-repetition',
      features: ['Automated scheduling', 'Flashcards', 'Progress tracking', 'Forgetting curve'],
      difficulty: 'Intermediate',
      timeRequired: '15-30 min',
      available: false
    },
    {
      id: 'study-journal',
      name: 'Study Journal',
      description: 'Reflect on your learning progress with guided journaling prompts.',
      icon: <BookMarked className="w-8 h-8" />,
      color: 'text-accent',
      bgColor: 'from-accent/10 to-accent/5',
      path: '/study/journal',
      features: ['Daily prompts', 'Progress reflection', 'Goal tracking', 'Insights'],
      difficulty: 'Beginner',
      timeRequired: '10-15 min',
      available: false
    },
    {
      id: 'sq3r-reader',
      name: 'SQ3R Reader',
      description: 'Structured reading method: Survey, Question, Read, Recite, Review.',
      icon: <Timer className="w-8 h-8" />,
      color: 'text-success',
      bgColor: 'from-success/10 to-success/5',
      path: '/study/sq3r',
      features: ['Guided steps', 'Reading timer', 'Note integration', 'Comprehension checks'],
      difficulty: 'Intermediate',
      timeRequired: '45+ min',
      available: false
    },
    {
      id: 'feynman-technique',
      name: 'Feynman Technique',
      description: 'Explain concepts in simple terms to test and deepen your understanding.',
      icon: <Zap className="w-8 h-8" />,
      color: 'text-focus',
      bgColor: 'from-focus/10 to-focus/5',
      path: '/study/feynman',
      features: ['Concept explanation', 'Simplification tools', 'Knowledge gaps', 'Teaching mode'],
      difficulty: 'Advanced',
      timeRequired: '20-40 min',
      available: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/20 text-success-foreground';
      case 'Intermediate': return 'bg-accent/20 text-accent-foreground';
      case 'Advanced': return 'bg-destructive/20 text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-focus/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Study Modes</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our collection of proven study techniques designed to enhance your learning experience and boost academic performance.
          </p>
        </div>

        {/* Available Now Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Zap className="w-6 h-6 text-success mr-2" />
            Available Now
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyTechniques.filter(technique => technique.available).map((technique) => (
              <Card key={technique.id} className={`card-study bg-gradient-to-br ${technique.bgColor} border-2 hover:border-primary/30`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={technique.color}>
                      {technique.icon}
                    </div>
                    <Badge className={getDifficultyColor(technique.difficulty)}>
                      {technique.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{technique.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {technique.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Features:</p>
                    <ul className="text-sm space-y-1">
                      {technique.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>⏱️ {technique.timeRequired}</span>
                  </div>

                  <Link to={technique.path}>
                    <Button className="w-full btn-primary">
                      Start Learning
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Timer className="w-6 h-6 text-accent mr-2" />
            Coming Soon
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyTechniques.filter(technique => !technique.available).map((technique) => (
              <Card key={technique.id} className={`card-study bg-gradient-to-br ${technique.bgColor} opacity-75 border-dashed`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={technique.color}>
                      {technique.icon}
                    </div>
                    <Badge className={getDifficultyColor(technique.difficulty)}>
                      {technique.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{technique.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {technique.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Features:</p>
                    <ul className="text-sm space-y-1">
                      {technique.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>⏱️ {technique.timeRequired}</span>
                  </div>

                  <Button className="w-full" variant="outline" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Study Tips */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Maximize Your Study Success</CardTitle>
            <CardDescription className="text-center">
              Tips to get the most out of each study technique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Set Clear Goals</h3>
                <p className="text-sm text-muted-foreground">Define what you want to achieve before starting each session.</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold">Stay Consistent</h3>
                <p className="text-sm text-muted-foreground">Regular practice is more effective than cramming.</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold">Mix Techniques</h3>
                <p className="text-sm text-muted-foreground">Combine different methods for optimal learning.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyModes;