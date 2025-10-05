import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { BookOpen, CalendarCheck, CreditCard, LayoutDashboard, MessageSquare, Users, Video, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const AppSidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  const items = () => {
    if (!user) return [] as { to: string; label: string; icon?: React.ComponentType<any> }[];

    if (user.role === 'teacher') {
      return [
        { to: '/dashboard/teacher/courses', label: t('menu.my_courses'), icon: BookOpen },
        { to: '/dashboard/teacher/lessons', label: t('menu.my_lessons'), icon: Video },
        { to: '/dashboard/teacher/orders', label: t('menu.orders'), icon: CalendarCheck },
        { to: '/dashboard/teacher/timetable', label: t('menu.timetable'), icon: CalendarCheck },
        { to: '/dashboard/teacher/transactions', label: t('menu.transactions'), icon: CreditCard },
        { to: '/dashboard/teacher/reviews', label: t('menu.reviews'), icon: MessageSquare },
        { to: '/dashboard/teacher/disputes', label: t('menu.disputes'), icon: Shield },
        // settings and logout will be rendered separately
      ];
    }

    if (user.role === 'student') {
      return [
        { to: '/dashboard/student/courses', label: t('menu.my_courses'), icon: BookOpen },
        { to: '/dashboard/student/private-lessons', label: t('menu.private_lessons'), icon: Video },
        { to: '/dashboard/student/make-order', label: t('menu.make_order'), icon: CalendarCheck },
        { to: '/dashboard/student/language-study', label: t('menu.language_study'), icon: BookOpen },
        { to: '/dashboard/student/abilities', label: t('menu.abilities'), icon: Users },
        { to: '/dashboard/student/books', label: t('menu.books'), icon: BookOpen },
      ];
    }

    // admin fallback
    return [
      { to: '/dashboard', label: t('menu.dashboard'), icon: LayoutDashboard },
    ];
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-sidebar-border">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold">EduConnect</span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              {user?.role === 'admin' ? t('sidebar.admin') : t('sidebar.menu')}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items().map(({ to, label, icon: Icon }) => (
                  <SidebarMenuItem key={to}>
                    <SidebarMenuButton asChild isActive={location.pathname === to}>
                      <Link to={to} className="flex items-center gap-2">
                        {Icon ? <Icon /> : null}
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {/* Settings submenu and logout */}
                {user?.role === 'teacher' && (
                  <SidebarMenuItem>
                    <details className="group">
                      <summary className="cursor-pointer px-3 py-2">{t('menu.settings')}</summary>
                      <div className="pl-3 mt-2 flex flex-col gap-1">
                        <Link to="/dashboard/teacher/settings/profile" className="px-2 py-1 rounded hover:bg-muted">{t('settings.edit_profile')}</Link>
                        <Link to="/dashboard/teacher/settings/types" className="px-2 py-1 rounded hover:bg-muted">{t('settings.type_of_lessons')}</Link>
                        <Link to="/dashboard/teacher/settings/revenue" className="px-2 py-1 rounded hover:bg-muted">{t('settings.revenue_management')}</Link>
                        <Link to="/dashboard/teacher/settings/payment" className="px-2 py-1 rounded hover:bg-muted">{t('settings.payment_method')}</Link>
                        <Link to="/dashboard/teacher/settings/courses" className="px-2 py-1 rounded hover:bg-muted">{t('settings.courses_management')}</Link>
                      </div>
                    </details>
                  </SidebarMenuItem>
                )}

                {user?.role === 'student' && (
                  <SidebarMenuItem>
                    <details className="group">
                      <summary className="cursor-pointer px-3 py-2">{t('menu.settings')}</summary>
                      <div className="pl-3 mt-2 flex flex-col gap-1">
                        <Link to="/dashboard/student/settings/profile" className="px-2 py-1 rounded hover:bg-muted">{t('settings.edit_profile')}</Link>
                        <Link to="/dashboard/student/settings/payment" className="px-2 py-1 rounded hover:bg-muted">{t('settings.payment_method')}</Link>
                      </div>
                    </details>
                  </SidebarMenuItem>
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/logout" className="px-3 py-2 text-destructive">{t('menu.logout')}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-2">
            {/* kept for compatibility; primary settings available in menu */}
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/settings">{t('menu.settings')}</Link>
            </Button>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="flex h-12 items-center gap-2 border-b border-border px-3">
          <SidebarTrigger />
        </div>
        <div className="flex-1 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppSidebarLayout;
