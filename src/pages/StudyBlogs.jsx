import { Calendar, Clock, User, ArrowRight, BookOpen, Brain, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const StudyBlogs = () => {
  const featuredPost = {
    title: "The Science Behind Spaced Repetition: Why It's the Most Effective Study Method",
    excerpt: "Discover how spaced repetition leverages cognitive science to help you retain information longer with less effort. Learn implementation strategies and common mistakes to avoid.",
    author: "Dr. Emily Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Study Science",
    image: "🧠",
    featured;

  const blogPosts = [
    {
      title: "Mastering the Pomodoro Technique: A Complete Guide for Students",
      excerpt: "Learn how to implement the Pomodoro Technique effectively, customize it for your learning style, and troubleshoot common issues.",
      author: "Sarah Chen",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "Time Management",
      image: "🍅"
    },
    {
      title: "Cornell Notes vs. Mind Maps: Which Note-Taking Method is Right for You?",
      excerpt: "Compare two popular note-taking systems and discover which one suits your learning style and subject matter best.",
      author: "Marcus Rodriguez",
      date: "2024-01-10",
      readTime: "5 min read",
      category: "Note Taking",
      image: "📝"
    },
    {
      title: "5 Study Mistakes That Are Killing Your GPA (And How to Fix Them)",
      excerpt: "Identify common study pitfalls that even good students fall into and learn evidence-based strategies to overcome them.",
      author: "Dr. Amanda Liu",
      date: "2024-01-08",
      readTime: "7 min read",
      category: "Study Tips",
      image: "⚠️"
    },
    {
      title: "How to Create Effective Flashcards That Actually Help You Remember",
      excerpt: "Master the art of flashcard creation with cognitive science principles to maximize retention and minimize study time.",
      author: "David Kim",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "Memory",
      image: "🗂️"
    },
    {
      title: "The Ultimate Guide to Active Recall: Stop Re-reading, Start Remembering",
      excerpt: "Transform your study sessions with active recall techniques that force your brain to retrieve information and strengthen memory.",
      author: "Prof. Lisa Wang",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "Study Science",
      image: "🎯"
    },
    {
      title: "Building the Perfect Study Environment: A Room-by-Room Guide",
      excerpt: "Design your ideal study space with psychology-backed tips for lighting, organization, and eliminating distractions.",
      author: "Alex Thompson",
      date: "2024-01-01",
      readTime: "6 min read",
      category: "Environment",
      image: "🏠"
    }
  ];

  const categories = [
    { name: "All Posts", count, icon="w-4 h-4" /> },
    { name: "Study Science", count, icon="w-4 h-4" /> },
    { name: "Time Management", count, icon="w-4 h-4" /> },
    { name: "Note Taking", count, icon="w-4 h-4" /> },
    { name: "Memory", count, icon="w-4 h-4" /> }
  ];

  const getCategoryColor = (category) => {
    const colors= {
      'Study Science': 'bg-primary/20 text-primary-foreground',
      'Time Management': 'bg-accent/20 text-accent-foreground',
      'Note Taking': 'bg-success/20 text-success-foreground',
      'Study Tips': 'bg-focus/20 text-focus-foreground',
      'Memory': 'bg-primary/20 text-primary-foreground',
      'Environment': 'bg-success/20 text-success-foreground'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-focus/5">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Study Smarter Blog
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Evidence-based study tips, techniques, and insights to help you excel academically.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-between hover:bg-primary/5"
                  >
                    <div className="flex items-center space-x-2">
                      {category.icon}
                      <span>{category.name}</span>
                    </div>
                    <Badge variant="secondary">{category.count}</Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="card-elevated bg-gradient-to-br from-primary/10 to-focus/10">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Study Tip of the Week</h3>
                <div className="text-4xl mb-3">💡</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Try the "2-minute rule", do it immediately instead of adding it to your to-do list.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  More Quick Tips
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Post */}
            <Card className="card-study bg-gradient-to-br from-primary/10 to-focus/10 border-2 border-primary/20">
              <CardContent className="p-8">
                <Badge className="mb-4 bg-primary/20 text-primary-foreground">Featured</Badge>
                <div className="text-6xl mb-4">{featuredPost.image}</div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <Button className="btn-primary">
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.map((post, index) => (
                <Card key={index} className="card-study group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{post.image}</div>
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <Button size="sm" variant="ghost" className="text-primary group-hover:bg-primary/10">
                          Read More <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center pt-8">
              <Button size="lg" variant="outline">
                Load More Posts
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Miss a Study Tip
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get our latest study strategies and academic insights delivered to your inbox weekly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-orange-400"
            />
            <Button className="btn-accent px-6 py-3 bg-orange-500 hover:bg-orange-600">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            Join 10,000+ students. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
};

export default StudyBlogs;