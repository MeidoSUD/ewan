import { Toaster as LocalToaster } from "@/components/ui/toaster";
import { Toaster as UIToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Register from './pages/Register';
import VerifyPhone from './pages/VerifyPhone';
import StudentDashboard from './pages/dashboard/student';
import StudentCourses from './pages/dashboard/student-courses';
import StudentPrivateLessons from './pages/dashboard/student-private-lessons';
import TeacherDashboard from './pages/dashboard/teacher';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Bookings from './pages/Bookings';
import Payments from './pages/Payments';
import Reviews from './pages/Reviews';
import Sessions from './pages/Sessions';
import Users from './pages/Users';
import Disputes from './pages/Disputes';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UIToaster />
      <SonnerToaster />
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Public auth pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-phone" element={<VerifyPhone />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/sessions" element={<Sessions />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/payments" element={<Payments />} />

                {/* Dashboard variants */}
                <Route path="/dashboard/student" element={<StudentDashboard />} />
                <Route path="/dashboard/student/courses" element={<StudentCourses />} />
                <Route path="/dashboard/student/private-lessons" element={<StudentPrivateLessons />} />
                <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
              </Route>

              {/* Admin only */}
              <Route element={<RoleRoute allowed={["admin"] as any} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/disputes" element={<Disputes />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
