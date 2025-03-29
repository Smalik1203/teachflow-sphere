
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Book, Calendar, User, LogOut, Menu, X, FileText, DollarSign, CheckSquare, BookOpen, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { UserRole } from '@/types';

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  roles: UserRole[];
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout, checkAccess } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const navItems: NavItem[] = [
    { 
      title: 'Dashboard', 
      icon: <Book size={20} />, 
      href: '/dashboard',
      roles: ['super_admin', 'school_admin', 'teacher', 'student']
    },
    { 
      title: 'Attendance', 
      icon: <Calendar size={20} />, 
      href: '/attendance',
      roles: ['super_admin', 'school_admin', 'teacher', 'student']
    },
    { 
      title: 'Fees', 
      icon: <DollarSign size={20} />, 
      href: '/fees',
      roles: ['super_admin', 'school_admin', 'student']
    },
    { 
      title: 'Assessments', 
      icon: <CheckSquare size={20} />, 
      href: '/assessments',
      roles: ['super_admin', 'school_admin', 'teacher', 'student']
    },
    { 
      title: 'Resources', 
      icon: <FileText size={20} />, 
      href: '/resources',
      roles: ['super_admin', 'school_admin', 'teacher', 'student']
    },
    { 
      title: 'Quizzes', 
      icon: <BookOpen size={20} />, 
      href: '/quizzes',
      roles: ['super_admin', 'school_admin', 'teacher', 'student']
    },
    { 
      title: 'Profile', 
      icon: <User size={20} />, 
      href: '/profile',
      roles: ['super_admin', 'school_admin', 'teacher', 'student']
    },
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => 
    user && checkAccess(item.roles)
  );

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 bg-background border-b md:hidden">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0 sm:max-w-xs">
                <div className="px-7">
                  <div className="flex items-center justify-between">
                    <a href="/dashboard" className="flex items-center gap-2 font-semibold">
                      <Book className="h-6 w-6 text-primary" />
                      <span>TeachFlow</span>
                    </a>
                    <Sheet>
                      <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </Sheet>
                  </div>
                </div>
                <nav className="flex flex-col gap-4 px-2 py-4">
                  {filteredNavItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className={`nav-item ${
                        location.pathname === item.href ? 'nav-item-active' : 'text-foreground/60 hover:text-foreground hover:bg-muted'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        navigate(item.href);
                      }}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  ))}
                  <Button 
                    variant="ghost" 
                    className="nav-item justify-start hover:bg-destructive/10 hover:text-destructive"
                    onClick={logout}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            <a href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Book className="h-6 w-6 text-primary" />
              <span>TeachFlow</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            <span className="text-sm font-medium">{user.name}</span>
          </div>
        </div>
      </header>

      {/* Desktop layout */}
      <div className="flex-1 flex">
        {/* Sidebar for larger screens */}
        <aside className="fixed hidden md:flex h-screen w-64 flex-col border-r bg-sidebar">
          <div className="p-6">
            <a href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Book className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TeachFlow</span>
            </a>
          </div>
          <nav className="flex-1 overflow-auto py-6 px-4">
            <div className="space-y-1">
              {filteredNavItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`nav-item ${
                    location.pathname === item.href ? 'nav-item-active' : 'text-foreground/60 hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                  }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={toggleTheme}
                >
                  {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={logout}
                >
                  <LogOut size={16} />
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-64">
          <div className="container py-6 md:py-8 px-4 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
