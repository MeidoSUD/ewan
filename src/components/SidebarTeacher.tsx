import React from 'react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/dashboard/teacher/courses', label: 'My Courses' },
  { to: '/dashboard/teacher/lessons', label: 'My Lessons' },
  { to: '/dashboard/teacher/orders', label: 'Orders' },
  { to: '/dashboard/teacher/timetable', label: 'Timetable' },
  { to: '/dashboard/teacher/transactions', label: 'Transactions' },
  { to: '/dashboard/teacher/reviews', label: 'Reviews' },
  { to: '/dashboard/teacher/disputes', label: 'Disputes' },
];

const SidebarTeacher = () => {
  return (
    <nav aria-label="Teacher sidebar" className="flex flex-col gap-2">
      {items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          className={({ isActive }) =>
            `block rounded px-3 py-2 focus:outline-none focus:ring ${isActive ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`
          }
        >
          {it.label}
        </NavLink>
      ))}

      <details className="mt-4">
        <summary className="px-3 py-2 cursor-pointer">Settings</summary>
        <div className="pl-3 mt-2 flex flex-col gap-1">
          <NavLink to="/dashboard/teacher/settings/profile" className="px-2 py-1 rounded hover:bg-muted">Edit Profile</NavLink>
          <NavLink to="/dashboard/teacher/settings/types" className="px-2 py-1 rounded hover:bg-muted">Type of Lessons</NavLink>
          <NavLink to="/dashboard/teacher/settings/revenue" className="px-2 py-1 rounded hover:bg-muted">Revenue Management</NavLink>
          <NavLink to="/dashboard/teacher/settings/payment" className="px-2 py-1 rounded hover:bg-muted">Payment Method</NavLink>
          <NavLink to="/dashboard/teacher/settings/courses" className="px-2 py-1 rounded hover:bg-muted">Courses Management</NavLink>
        </div>
      </details>

      <NavLink to="/logout" className="mt-auto px-3 py-2 text-destructive">Logout</NavLink>
    </nav>
  );
};

export default SidebarTeacher;
