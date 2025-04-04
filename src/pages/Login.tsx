
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Book, Info } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showExamples, setShowExamples] = useState(false);

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

  // User credentials examples for different roles
  const loginExamples = [
    { role: 'Super Admin', email: 'admin@example.com', password: 'password123', description: 'Full system access' },
    { role: 'School Admin', email: 'admin.riverside@example.com', password: 'password123', description: 'Manage Riverside Academy' },
    { role: 'School Admin', email: 'admin.highland@example.com', password: 'password123', description: 'Manage Highland High School' },
    { role: 'School Admin', email: 'admin.oceanside@example.com', password: 'password123', description: 'Manage Oceanside College' },
    { role: 'Teacher', email: 'teacher1.riverside@example.com', password: 'password123', description: 'Teacher at Riverside Academy' },
    { role: 'Teacher', email: 'teacher1.highland@example.com', password: 'password123', description: 'Teacher at Highland High School' },
    { role: 'Teacher', email: 'teacher1.oceanside@example.com', password: 'password123', description: 'Teacher at Oceanside College' },
    { role: 'Student', email: 'student1.riverside@example.com', password: 'password123', description: 'Student at Riverside Academy' },
    { role: 'Student', email: 'student1.highland@example.com', password: 'password123', description: 'Student at Highland High School' },
    { role: 'Student', email: 'student1.oceanside@example.com', password: 'password123', description: 'Student at Oceanside College' }
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
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
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
            
            {/* Development mode information */}
            {process.env.NODE_ENV !== 'production' && (
              <div className="border-t pt-4 w-full">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-muted-foreground">Development Login Examples</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowExamples(!showExamples)}
                    className="h-8 px-2"
                  >
                    <Info className="h-4 w-4 mr-1" />
                    {showExamples ? "Hide" : "Show"} all
                  </Button>
                </div>
                
                <div className="grid gap-2">
                  {(showExamples ? loginExamples : loginExamples.slice(0, 4)).map((example, index) => (
                    <div 
                      key={index} 
                      className="text-xs p-2 bg-muted rounded flex justify-between items-center cursor-pointer hover:bg-muted/80"
                      onClick={() => {
                        setEmail(example.email);
                        setPassword(example.password);
                      }}
                    >
                      <div>
                        <span className="font-semibold">{example.role}:</span>
                        <span className="ml-1">{example.email}</span>
                      </div>
                      <span className="text-muted-foreground text-xs hidden sm:inline">{example.description}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950 rounded-md border border-amber-200 dark:border-amber-800">
                  <p className="text-xs text-amber-800 dark:text-amber-300">
                    <strong>Note:</strong> To create real user accounts, register them through the Supabase Auth UI. 
                    For development, you might need to disable email verification in Supabase.
                  </p>
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
