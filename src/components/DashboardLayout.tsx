import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import SidebarTeacher from './SidebarTeacher';
import SidebarStudent from './SidebarStudent';

const DashboardLayout: React.FC<{ children: React.ReactNode; userRole?: string }> = ({ children, userRole }) => {
  const { language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();

  return (
    <div className={`min-h-screen flex ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-sidebar p-4 border-r border-sidebar-border">
        {userRole === 'teacher' ? <SidebarTeacher /> : <SidebarStudent />}
      </aside>

      {/* Mobile Sidebar would be a collapsible drawer - simplified here */}

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-4 border-b bg-background">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-bold text-lg">EduConnect</Link>
            <button className="md:hidden" aria-label="Open menu">☰</button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="px-3 py-1 rounded-md border">{language === 'ar' ? 'AR' : 'EN'}</button>
            <div className="relative">
              <button className="px-3 py-1 rounded-md border">{user?.name || 'Account'}</button>
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded shadow p-2 hidden group-hover:block">
                <Link to="/profile" className="block px-2 py-1">Profile</Link>
                <Link to="/settings" className="block px-2 py-1">Settings</Link>
                <button onClick={logout} className="block px-2 py-1 text-destructive">Logout</button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
