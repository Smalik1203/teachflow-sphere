
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { User, UserRole } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  checkAccess: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session?.user) {
          // Fetch user profile data
          setTimeout(async () => {
            try {
              const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
              if (error) {
                console.error('Error fetching user profile:', error);
                return;
              }
              
              if (data) {
                setUser({
                  id: session.user.id,
                  email: session.user.email || '',
                  name: data.name || '',
                  role: data.role as UserRole,
                  schoolId: data.school_id
                });
              }
            } catch (error) {
              console.error('Error in profile fetch:', error);
            }
          }, 0);
        } else {
          setUser(null);
        }
      }
    );
    
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        
        if (session?.user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (error) {
            console.error('Error fetching user profile:', error);
            setIsLoading(false);
            return;
          }
          
          if (data) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: data.name || '',
              role: data.role as UserRole,
              schoolId: data.school_id
            });
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        // For development purposes, allow login with example credentials
        if (process.env.NODE_ENV !== 'production') {
          // Check if this is one of our example logins
          const isExampleEmail = email.includes('@example.com');
          
          if (isExampleEmail && password === 'password123') {
            // Extract role and school from email
            let role: UserRole = 'student';
            let schoolId = null;
            let name = email.split('@')[0].replace('.', ' ');
            
            if (email.includes('admin.')) {
              role = 'school_admin';
              name = `${email.split('.')[1].split('@')[0]} Admin`;
            } else if (email === 'admin@example.com') {
              role = 'super_admin';
              name = 'Super Admin';
            } else if (email.includes('teacher')) {
              role = 'teacher';
            }
            
            if (email.includes('riverside')) {
              schoolId = 'riverside-id';
            } else if (email.includes('highland')) {
              schoolId = 'highland-id';
            } else if (email.includes('oceanside')) {
              schoolId = 'oceanside-id';
            }
            
            // Mock successful login for example accounts
            setUser({
              id: `mock-${Date.now()}`,
              email,
              name,
              role,
              schoolId
            });
            
            toast({
              title: "Development login successful",
              description: `Logged in as ${role} (Example Account)`,
            });
            
            navigate('/dashboard');
            setIsLoading(false);
            return;
          }
        }
        
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
        setIsLoading(false);
        return;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome to the Education Management System",
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "An error occurred during logout.",
      });
    }
  };

  const checkAccess = (allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      isAuthenticated: !!user,
      checkAccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
