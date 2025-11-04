import { useState } from 'react';
import { Send, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]));
  };

  const contactInfo = [
    {
      icon="w-6 h-6 text-primary" />,
      title: "Email Us",
      content: "support@deckzo.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon="w-6 h-6 text-success" />,
      title: "Live Chat",
      content: "Available 9 AM - 6 PM EST",
      description: "Monday through Friday"
    },
    {
      icon="w-6 h-6 text-accent" />,
      title: "Phone Support",
      content: "+1 (555) 123-4567",
      description: "For urgent issues only"
    },
    {
      icon="w-6 h-6 text-focus" />,
      title: "Office",
      content: "San Francisco, CA",
      description: "Remote-first company"
    }
  ];

  const supportCategories = [
    {
      title: "Technical Support",
      description: "Issues with features, bugs, or account access",
      icon: "🔧"
    },
    {
      title: "Billing Questions",
      description: "Pricing, subscriptions, and payment issues",
      icon: "💳"
    },
    {
      title: "Feature Requests",
      description: "Suggestions for new study techniques or improvements",
      icon: "💡"
    },
    {
      title: "Educational Partnerships",
      description: "School districts and institutional partnerships",
      icon: "🎓"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-focus/5">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Have questions about Deckzo? We're here to help you succeed in your learning journey.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you/CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your question or feedback..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full btn-primary">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="grid gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {info.icon}
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <p className="text-sm font-medium text-primary">{info.content}</p>
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Support Categories */}
            <div>
              <h2 className="text-2xl font-bold mb-6">What can we help with?</h2>
              <div className="space-y-4">
                {supportCategories.map((category, index) => (
                  <Card key={index} className="card-elevated hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h3 className="font-semibold mb-1">{category.title}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <Card className="card-elevated bg-gradient-to-br from-primary/10 to-focus/10">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Help</h3>
                <div className="space-y-2 text-sm">
                  <p>• Check our <a href="#" className="text-primary hover:underline">FAQ section</a> for common questions</p>
                  <p>• Browse our <a href="#" className="text-primary hover:underline">help documentation</a></p>
                  <p>• Join our <a href="#" className="text-primary hover:underline">community forum</a></p>
                  <p>• Follow us on <a href="#" className="text-primary hover:underline">Twitter</a> for updates</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;