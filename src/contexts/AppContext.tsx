import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, PaymentTier } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentTier: PaymentTier;
  isFeatureUnlocked: (feature: string) => boolean;
  unlockPro: (transactionId: string) => void;
  unlockPremium: (transactionId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PAYMENT_TIERS: Record<string, PaymentTier> = {
  free: {
    name: 'free',
    price: 0,
    features: ['1 Abstract', '3 Flashcards', '3 Resume Points', 'Sample Viva Qs'],
    limits: {
      abstracts: 1,
      flashcards: 3,
      resumePoints: 3,
      vivaQuestions: 5,
      reports: 0,
      pptSlides: 0,
    }
  },
  pro: {
    name: 'pro',
    price: 499,
    features: ['Unlimited Abstracts', 'Reports', 'PPT Slides', 'Resume Builder', 'Viva Qs', 'Assignments'],
    limits: {
      abstracts: -1, // unlimited
      flashcards: -1,
      resumePoints: -1,
      vivaQuestions: -1,
      reports: -1,
      pptSlides: -1,
    }
  },
  premium: {
    name: 'premium',
    price: 999,
    features: ['Everything in Pro', 'Unlimited Exports', 'Priority Support', 'Advanced Templates'],
    limits: {
      abstracts: -1,
      flashcards: -1,
      resumePoints: -1,
      vivaQuestions: -1,
      reports: -1,
      pptSlides: -1,
    }
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('projectpal_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Create default pro user for testing
      const defaultUser: User = {
        id: Date.now().toString(),
        subscription: 'pro',
        createdAt: new Date(),
      };
      setUser(defaultUser);
      localStorage.setItem('projectpal_user', JSON.stringify(defaultUser));
    }
  }, []);

  const currentTier = PAYMENT_TIERS[user?.subscription || 'free'];

  const isFeatureUnlocked = (feature: string): boolean => {
    if (!user) return false;
    
    switch (feature) {
      case 'reports':
      case 'ppt':
      case 'assignments':
        return user.subscription !== 'free';
      case 'unlimited_exports':
        return user.subscription === 'premium';
      default:
        return true;
    }
  };

  const unlockPro = (transactionId: string) => {
    if (user) {
      const updatedUser = { ...user, subscription: 'pro' as const, transactionId };
      setUser(updatedUser);
      localStorage.setItem('projectpal_user', JSON.stringify(updatedUser));
    }
  };

  const unlockPremium = (transactionId: string) => {
    if (user) {
      const updatedUser = { ...user, subscription: 'premium' as const, transactionId };
      setUser(updatedUser);
      localStorage.setItem('projectpal_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      currentTier,
      isFeatureUnlocked,
      unlockPro,
      unlockPremium,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
