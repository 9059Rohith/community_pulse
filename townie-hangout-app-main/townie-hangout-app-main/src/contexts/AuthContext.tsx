
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

// Define user types
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
  }
];

// Mock passwords (in a real app, passwords would be hashed and stored securely)
const mockPasswords: Record<string, string> = {
  'admin@example.com': 'adminpass',
  'user@example.com': 'userpass',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would make an API call to verify credentials
      const mockUser = mockUsers.find(u => u.email === email);
      
      if (!mockUser || mockPasswords[email] !== password) {
        toast.error('Invalid email or password');
        return false;
      }

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success(`Welcome back, ${mockUser.name}!`);
      return true;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        toast.error('User with this email already exists');
        return false;
      }
      
      // Create a new user (in a real app, this would make an API call)
      const newUser: User = {
        id: String(mockUsers.length + 1),
        name,
        email,
        role: 'user',
      };
      
      mockUsers.push(newUser);
      mockPasswords[email] = password;
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
