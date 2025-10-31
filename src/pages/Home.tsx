import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Clock, Target, Users, Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Home = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Smart Study Techniques",
      description: "Evidence-based methods like Pomodoro, Cornell Notes, and Spaced Repetition"
    },
    {
      icon: <Clock className="w-8 h-8 text-success" />,
      title: "Time Management",
      description: "Built-in timers and progress tracking to optimize your study sessions"
    },
    {
      icon: <Target className="w-8 h-8 text-accent" />,
      title: "Goal Tracking",
      description: "Set and achieve your learning objectives with detailed analytics"
    },
    {
      icon: <Users className="w-8 h-8 text-focus" />,
      title: "Collaborative Learning",
      description: "Share notes and study with friends using our collaboration tools"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Medical Student",
      content: "Deckzo transformed my study routine. The Pomodoro timer with Cornell Notes helped me ace my finals!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Engineering Student", 
      content: "The spaced repetition feature is incredible. I'm retaining information so much better now.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Law Student",
      content: "Love the collaborative features. Study groups are so much more organized with Deckzo.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Master Your Studies with
            <span className="block text-yellow-300">Proven Techniques</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Unlock your learning potential with science-backed study methods, 
            progress tracking, and collaborative tools designed for modern students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="btn-accent text-lg px-8 py-4">
                Start Learning Free <ArrowRight className="ml-2 w-5 h-5" />
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

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combine multiple study techniques in one powerful platform designed for academic success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-study text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Study Techniques Preview */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-focus/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Proven Study Techniques
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access a complete toolkit of evidence-based learning methods
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Pomodoro Timer", desc: "25-minute focused sessions with breaks", icon: <Clock className="w-6 h-6" /> },
              { name: "Cornell Notes", desc: "Structured note-taking system", icon: <BookOpen className="w-6 h-6" /> },
              { name: "Quiz Creator", desc: "Test your knowledge retention", icon: <Target className="w-6 h-6" /> },
              { name: "Focus Mode", desc: "Distraction-free study environment", icon: <Brain className="w-6 h-6" /> },
              { name: "Mind Mapping", desc: "Visual knowledge organization", icon: <Users className="w-6 h-6" /> },
              { name: "Spaced Repetition", desc: "Optimize memory retention", icon: <Star className="w-6 h-6" /> }
            ].map((technique, index) => (
              <Card key={index} className="card-study hover:border-primary/30">
                <div className="flex items-center mb-3">
                  <div className="text-primary mr-3">{technique.icon}</div>
                  <h3 className="text-lg font-semibold">{technique.name}</h3>
                </div>
                <p className="text-muted-foreground">{technique.desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/study-modes">
              <Button size="lg" className="btn-primary">
                Try All Study Modes <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Loved by Students Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See how Deckzo is helping students achieve their academic goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-study">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
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
            Join thousands of students who've improved their academic performance with Deckzo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="btn-accent text-lg px-8 py-4">
                Get Started Free
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;