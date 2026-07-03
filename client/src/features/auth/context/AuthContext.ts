import { createContext } from 'react';
import type { User } from 'firebase/auth';

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
