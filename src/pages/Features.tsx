import { 
  Brain, 
  Clock, 
  Target, 
  Users, 
  BarChart, 
  Zap, 
  Shield, 
  Smartphone,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Features = () => {
  const mainFeatures = [
    {
      icon: <Brain className="w-12 h-12 text-primary" />,
      title: "12+ Study Techniques",
      description: "Access proven methods like Pomodoro, Cornell Notes, Spaced Repetition, and more.",
      features: ["Pomodoro Timer", "Cornell Notes", "Quiz Maker", "Mind Mapping", "Feynman Technique"]
    },
    {
      icon: <BarChart className="w-12 h-12 text-success" />,
      title: "Progress Tracking",
      description: "Monitor your learning with detailed analytics and real-time progress updates.",
      features: ["Study time tracking", "Session completion", "Performance analytics", "Goal progress", "Weekly reports"]
    },
    {
      icon: <Users className="w-12 h-12 text-accent" />,
      title: "Collaborative Learning",
      description: "Study with friends and share notes, quizzes, and progress.",
      features: ["Shared notebooks", "Group study sessions", "Real-time collaboration", "Study groups", "Peer reviews"]
    },
    {
      icon: <Target className="w-12 h-12 text-focus" />,
      title: "Personalized Goals",
      description: "Set and track custom learning objectives tailored to your needs.",
      features: ["Custom study goals", "Milestone tracking", "Achievement badges", "Streak counters", "Motivation tools"]
    }
  ];

  const additionalFeatures = [
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Smart Scheduling",
      description: "AI-powered study schedule optimization based on your habits and goals."
    },
    {
      icon: <Shield className="w-8 h-8 text-success" />,
      title: "Data Privacy",
      description: "Your study data is encrypted and stored securely with full privacy control."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-accent" />,
      title: "Mobile Responsive",
      description: "Study anywhere with our fully responsive design for all devices."
    },
    {
      icon: <Zap className="w-8 h-8 text-focus" />,
      title: "Offline Mode",
      description: "Continue studying even without internet connection with offline support."
    }
  ];

  const integrations = [
    "Google Calendar sync",
    "Notion integration",
    "Canvas LMS support",
    "Zoom study sessions",
    "Spotify ambient sounds",
    "Calendar reminders"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-focus/5">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Everything You Need to
            <span className="block text-yellow-300">Study Smarter</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover powerful features designed to enhance your learning experience and boost academic performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="btn-accent text-lg px-8 py-4">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/study-modes">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                Explore Study Modes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Core Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools to support every aspect of your learning journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="card-study">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {feature.icon}
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gradient-to-br from-secondary/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-muted-foreground">
              Cutting-edge features to give you the competitive edge
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="card-study text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Study Techniques Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Proven Study Methods
            </h2>
            <p className="text-xl text-muted-foreground">
              Access the most effective learning techniques backed by science
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-study bg-gradient-to-br from-accent/10 to-accent/5">
              <CardHeader>
                <Clock className="w-8 h-8 text-accent mb-2" />
                <CardTitle>Time Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Pomodoro Technique</li>
                  <li>• Time blocking</li>
                  <li>• Focus sessions</li>
                  <li>• Break reminders</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-study bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <Brain className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Active Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Cornell Notes</li>
                  <li>• Mind mapping</li>
                  <li>• Feynman Technique</li>
                  <li>• Quiz creation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-study bg-gradient-to-br from-success/10 to-success/5">
              <CardHeader>
                <Target className="w-8 h-8 text-success mb-2" />
                <CardTitle>Memory Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Spaced repetition</li>
                  <li>• Active recall</li>
                  <li>• Flashcards</li>
                  <li>• Review scheduling</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/study-modes">
              <Button size="lg" className="btn-primary">
                Explore All Study Modes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-gradient-to-br from-focus/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            Seamless Integrations
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Connect with your favorite tools and platforms
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-card rounded-lg shadow-[var(--shadow-soft)]">
                <CheckCircle className="w-5 h-5 text-success mr-2" />
                <span className="font-medium">{integration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students who've improved their grades with Deckzo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="btn-accent text-lg px-8 py-4">
                Get Started Free
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                View Dashboard Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;