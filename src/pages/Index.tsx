
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('educationUser');
    if (storedUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute top-4 right-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-6">
          <div className="inline-block p-4 bg-primary rounded-full mb-4">
            <Book className="h-16 w-16 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-2">TeachFlow</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Comprehensive Educational Management System
          </p>
        </div>
        
        <div className="max-w-md w-full space-y-4 mb-8">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Button 
              size="lg" 
              className="w-full" 
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl">
          {[
            { title: "Student Management", description: "Easily manage student information and records" },
            { title: "Attendance Tracking", description: "Track and manage attendance efficiently" },
            { title: "Fee Management", description: "Handle all aspects of tuition and fees" },
            { title: "Learning Resources", description: "Share educational materials securely" },
            { title: "Assessment System", description: "Create and grade assessments" },
            { title: "Quiz Platform", description: "Interactive quizzes for better learning" },
            { title: "Role-Based Access", description: "Secure access control for all users" },
            { title: "Dark Mode Support", description: "Comfortable viewing day and night" },
          ].map((feature, i) => (
            <div key={i} className="bg-card p-4 rounded-lg border shadow-sm">
              <h3 className="font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-12 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 TeachFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
