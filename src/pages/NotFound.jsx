import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-focus/10 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="card-elevated">
          <CardContent className="p-12">
            {/* Large 404 */}
            <div className="text-8xl md:text-9xl font-bold text-gradient mb-4">
              404{/* Error message */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Oops! The page you're looking for seems to have wandered off. 
              Let's get you back to your learning journey.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/">
                <Button size="lg" className="btn-primary">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/study-modes">
                <Button size="lg" variant="outline">
                  <Search className="w-5 h-5 mr-2" />
                  Explore Study Modes
                </Button>
              </Link>
            </div>

            {/* Alternative navigation */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Or try these popular sections:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <Link to="/features">
                  <Button variant="ghost" size="sm">Features</Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="ghost" size="sm">Pricing</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="ghost" size="sm">Contact</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;