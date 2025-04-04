
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Book } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Form incomplete",
        description: "Please enter both email and password.",
      });
      return;
    }
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login submission error:', error);
    }
  };

  // Mock user credentials for development
  const loginExamples = [
    { role: 'Super Admin', email: 'admin@example.com', password: 'password' },
    { role: 'School Admin', email: 'school@example.com', password: 'password' },
    { role: 'Teacher', email: 'teacher@example.com', password: 'password' },
    { role: 'Student', email: 'student@example.com', password: 'password' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Book className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">TeachFlow</h1>
          <p className="text-muted-foreground mt-2">Education Management System</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Don't have an account? <a href="#" className="text-primary hover:underline">Create account</a>
            </div>
            
            {/* Development mode shortcuts - remove in production */}
            {process.env.NODE_ENV !== 'production' && (
              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground mb-2 text-center">Development Login Examples</p>
                <div className="grid gap-2">
                  {loginExamples.map((example, index) => (
                    <div 
                      key={index} 
                      className="text-xs p-2 bg-muted rounded flex justify-between items-center cursor-pointer hover:bg-muted/80"
                      onClick={() => {
                        setEmail(example.email);
                        setPassword(example.password);
                      }}
                    >
                      <span className="font-semibold">{example.role}:</span>
                      <span>{example.email}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
