import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from '@/contexts/AuthContext';
import AppSidebar from './AppSidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {isAuthenticated ? <AppSidebar>{children}</AppSidebar> : children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
