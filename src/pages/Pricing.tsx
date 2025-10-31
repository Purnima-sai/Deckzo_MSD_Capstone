import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with basic study tools',
      features: [
        'Access to 3 study techniques',
        'Basic progress tracking',
        'Up to 10 notes',
        'Mobile app access',
        'Community support'
      ],
      popular: false,
      buttonText: 'Get Started Free',
      buttonVariant: 'outline' as const
    },
    {
      name: 'Student',
      price: '$9',
      period: 'month',
      description: 'Ideal for serious students who want to excel',
      features: [
        'All 12+ study techniques',
        'Advanced progress analytics',
        'Unlimited notes & quizzes',
        'Collaboration features',
        'Priority support',
        'Export capabilities',
        'Custom study plans'
      ],
      popular: true,
      buttonText: 'Start Free Trial',
      buttonVariant: 'default' as const
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'month',
      description: 'For educators and power users',
      features: [
        'Everything in Student plan',
        'Team collaboration tools',
        'Advanced integrations',
        'Custom branding',
        'API access',
        'Dedicated support',
        'Analytics dashboard',
        'Bulk user management'
      ],
      popular: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at your next billing cycle.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data is safely stored for 30 days after cancellation, giving you time to export or reactivate your account.'
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes! Students get 50% off all paid plans with a valid student email address.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-focus/5">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the perfect plan for your learning journey. Start free, upgrade when you're ready.
          </p>
          <Badge className="bg-success/20 text-success-foreground px-4 py-2">
            ✨ 14-day free trial on all paid plans
          </Badge>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`card-elevated relative ${
                  plan.popular ? 'border-2 border-primary shadow-[var(--shadow-glow)]' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-focus text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                  <CardDescription className="text-base mt-4">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/signup">
                    <Button 
                      className={`w-full ${plan.popular ? 'btn-primary' : ''}`}
                      variant={plan.buttonVariant}
                      size="lg"
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Discount */}
      <section className="py-16 bg-gradient-to-r from-success/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Special Student Pricing</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Students get 50% off all paid plans with a valid .edu email address
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="card-elevated text-center">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Student Plan</h3>
                <div className="text-3xl font-bold text-gradient mb-2">$4.50</div>
                <p className="text-sm text-muted-foreground">per month (50% off)</p>
              </CardContent>
            </Card>
            <Card className="card-elevated text-center">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Pro Plan</h3>
                <div className="text-3xl font-bold text-gradient mb-2">$9.50</div>
                <p className="text-sm text-muted-foreground">per month (50% off)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students improving their grades with Deckzo
          </p>
          <Link to="/signup">
            <Button size="lg" className="btn-accent text-lg px-8 py-4">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;