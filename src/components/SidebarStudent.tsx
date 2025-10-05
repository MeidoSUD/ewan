import React from 'react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/dashboard/student/courses', label: 'My Courses' },
  { to: '/dashboard/student/private-lessons', label: 'Private Lessons' },
  { to: '/dashboard/student/make-order', label: 'Make Order' },
  { to: '/dashboard/student/language-study', label: 'Language Study' },
  { to: '/dashboard/student/abilities', label: 'Abilities & Achievement' },
  { to: '/dashboard/student/books', label: 'Books' },
];

const SidebarStudent = () => {
  return (
    <nav aria-label="Student sidebar" className="flex flex-col gap-2">
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
          <NavLink to="/dashboard/student/settings/profile" className="px-2 py-1 rounded hover:bg-muted">Edit Profile</NavLink>
          <NavLink to="/dashboard/student/settings/payment" className="px-2 py-1 rounded hover:bg-muted">Payment Method</NavLink>
        </div>
      </details>

      <NavLink to="/logout" className="mt-auto px-3 py-2 text-destructive">Logout</NavLink>
    </nav>
  );
};

export default SidebarStudent;
