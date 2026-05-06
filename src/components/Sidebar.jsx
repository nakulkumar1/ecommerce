import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

export default function Sidebar() {
  const { darkMode } = useContext(TaskContext);

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/analytics', label: 'Analytics' },
  ];

  return (
    <aside className={`${darkMode ? 'bg-gray-950' : 'bg-slate-900'} hidden h-screen w-60 shrink-0 p-5 text-white md:flex md:flex-col`}>
      <div className="mb-8">
        <h1 className="text-xl font-semibold leading-tight">Study Planner</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded px-4 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
