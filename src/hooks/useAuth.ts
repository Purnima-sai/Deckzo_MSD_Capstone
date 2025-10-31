import { useState, useEffect } from 'react';
import { User } from '@/types';
import { getUser, saveUser, removeUser } from '@/utils/storage';
import { toast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate login validation - in real app, this would be API call
    if (email && password.length >= 6) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
      };
      
      saveUser(newUser);
      setUser(newUser);
      toast({
        title: "Welcome to Deckzo!",
        description: "You've successfully logged in.",
      });
      setIsLoading(false);
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Please check your credentials.",
      variant: "destructive",
    });
    setIsLoading(false);
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate signup validation
    if (email && password.length >= 6 && name.trim()) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: name.trim(),
        createdAt: new Date().toISOString(),
      };
      
      saveUser(newUser);
      setUser(newUser);
      toast({
        title: "Account Created!",
        description: "Welcome to Deckzo. Let's start studying!",
      });
      setIsLoading(false);
      return true;
    }
    
    toast({
      title: "Signup Failed",
      description: "Please fill in all fields correctly.",
      variant: "destructive",
    });
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    removeUser();
    setUser(null);
    toast({
      title: "Logged Out",
      description: "See you next time!",
    });
  };

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };
};