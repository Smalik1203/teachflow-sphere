
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import RouteGuard from "@/components/guards/RouteGuard";
import Layout from "@/components/layout/Layout";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <RouteGuard>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </RouteGuard>
                } 
              />
              
              {/* Add more protected routes here */}
              <Route 
                path="/attendance" 
                element={
                  <RouteGuard>
                    <Layout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
                        <p>This feature will be implemented in the next iteration.</p>
                      </div>
                    </Layout>
                  </RouteGuard>
                }
              />
              
              <Route 
                path="/fees" 
                element={
                  <RouteGuard allowedRoles={['super_admin', 'school_admin', 'student']}>
                    <Layout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold tracking-tight">Fee Management</h1>
                        <p>This feature will be implemented in the next iteration.</p>
                      </div>
                    </Layout>
                  </RouteGuard>
                }
              />
              
              <Route 
                path="/assessments" 
                element={
                  <RouteGuard>
                    <Layout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold tracking-tight">Assessments & Marks</h1>
                        <p>This feature will be implemented in the next iteration.</p>
                      </div>
                    </Layout>
                  </RouteGuard>
                }
              />
              
              <Route 
                path="/resources" 
                element={
                  <RouteGuard>
                    <Layout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
                        <p>This feature will be implemented in the next iteration.</p>
                      </div>
                    </Layout>
                  </RouteGuard>
                }
              />
              
              <Route 
                path="/quizzes" 
                element={
                  <RouteGuard>
                    <Layout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
                        <p>This feature will be implemented in the next iteration.</p>
                      </div>
                    </Layout>
                  </RouteGuard>
                }
              />
              
              <Route 
                path="/profile" 
                element={
                  <RouteGuard>
                    <Layout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
                        <p>This feature will be implemented in the next iteration.</p>
                      </div>
                    </Layout>
                  </RouteGuard>
                }
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
