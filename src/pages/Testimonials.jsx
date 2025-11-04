import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Medical Student",
      school: "Stanford University",
      content: "Deckzo completely transformed my study routine. The Pomodoro timer with Cornell Notes helped me manage my overwhelming course load. I went from struggling to keep up to finishing top of my class. The progress tracking keeps me motivated every day.",
      rating
      initials: "SC",
      featured
      name: "Marcus Johnson",
      role: "Engineering Student",
      school: "MIT",
      content: "The spaced repetition feature is incredible. I'm retaining complex algorithms and formulas so much better now. What used to take me hours of cramming now sticks after just a few review sessions.",
      rating
      initials: "MJ",
      featured
      name: "Emma Rodriguez",
      role: "Law Student",
      school: "Harvard Law School",
      content: "Love the collaborative features. Study groups are so much more organized with Deckzo. We can share notes, create group quizzes, and track our collective progress. It's made law school bearable!",
      rating
      initials: "ER",
      featured
      name: "David Kim",
      role: "High School Student",
      school: "Tesla STEM High School",
      content: "As someone with ADHD, the focus mode and break reminders are lifesavers. I can actually concentrate for extended periods now. My grades improved from C's to A's in just one semester.",
      rating
      initials: "DK",
      featured
      name: "Prof. Lisa Wang",
      role: "Educator",
      school: "UC Berkeley",
      content: "I recommend Deckzo to all my students. The evidence-based study techniques really work, and the analytics help me understand how my students are learning outside of class.",
      rating
      initials: "LW",
      featured
      name: "Alex Thompson",
      role: "Graduate Student",
      school: "Oxford University",
      content: "The Cornell Notes system changed how I approach research. I can organize complex information efficiently and the summary sections help me prepare for presentations.",
      rating
      initials: "AT",
      featured
      name: "Maya Patel",
      role: "MBA Student",
      school: "Wharton School",
      content: "Between case studies and group projects, Deckzo keeps me organized. The quiz maker helps me prepare for exams, and the collaboration tools make team projects seamless.",
      rating
      initials: "MP",
      featured
      name: "James Wilson",
      role: "Ph.D. Candidate",
      school: "Cambridge University",
      content: "The Feynman Technique feature helped me breakthrough complex theoretical concepts. If you can't explain it simply through Deckzo's prompts, you don't understand it well enough.",
      rating
      initials: "JW",
      featured
      name: "Sophie Martin",
      role: "Nursing Student",
      school: "Johns Hopkins",
      content: "Medical terminology and procedures are so much easier to memorize with the spaced repetition system. The progress tracking motivates me to stay consistent with my studies.",
      rating
      initials: "SM",
      featured;

  const stats = [
    { number: "50,000+", label: "Active Students" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "95%", label: "Recommend to Friends" },
    { number: "89%", label: "Improved Grades" }
  ];

  const RatingStars = ({ rating }: { rating) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-focus/5">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Loved by Students Worldwide
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            See how Deckzo is transforming learning experiences and helping students achieve their academic goals.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="card-elevated text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            Featured Success Stories
          </h2>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {testimonials.filter(t => t.featured).map((testimonial, index) => (
              <Card key={index} className="card-study bg-gradient-to-br from-card to-card-hover border-2 hover:border-primary/30">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-lg mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12 bg-gradient-to-br from-primary to-focus">
                      <AvatarFallback className="text-white font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <RatingStars rating={testimonial.rating} />
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-primary font-medium">{testimonial.school}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/30 to-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            What Our Community Says
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.filter(t => !t.featured).map((testimonial, index) => (
              <Card key={index} className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <RatingStars rating={testimonial.rating} />
                  </div>
                  <p className="text-sm mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10 bg-gradient-to-br from-success to-accent">
                      <AvatarFallback className="text-white text-sm font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-primary">{testimonial.school}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gradient">
            See Deckzo in Action
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-elevated overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-focus/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <div className="w-0 h-0 border-l-[12px] border-l-primary border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                  <p className="text-sm font-medium">Sarah's Study Transformation</p>
                  <p className="text-xs text-muted-foreground">3:24 mins</p>
                </div>
              </div>
            </Card>
            <Card className="card-elevated overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-success/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <div className="w-0 h-0 border-l-[12px] border-l-success border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                  <p className="text-sm font-medium">From C's to A's with Marcus</p>
                  <p className="text-xs text-muted-foreground">2:47 mins</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Thousands of Successful Students
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Start your learning transformation today with Deckzo's proven study techniques
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-accent text-lg px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200">
              Start Free Trial
            </button>
            <button className="text-lg px-8 py-4 bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-lg font-medium transition-all duration-200">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;