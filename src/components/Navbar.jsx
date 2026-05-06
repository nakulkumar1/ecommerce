import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import { useDebounce } from '../hooks/useCustomHooks';

export default function Navbar() {
  const { darkMode, toggleDarkMode, setSearchTerm } = useContext(TaskContext);
  const location = useLocation();
  const [input, setInput] = useState('');
  const debouncedSearch = useDebounce(input, 300);

  useEffect(() => {
    setSearchTerm(debouncedSearch);
  }, [debouncedSearch, setSearchTerm]);

  const pageTitles = {
    '/': 'Dashboard',
    '/tasks': 'Task Management',
    '/analytics': 'Analytics',
  };

  const mobileLinks = [
    { path: '/', label: 'Home' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/analytics', label: 'Analytics' },
  ];

  return (
    <header className={`w-full border-b p-4 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs font-semibold uppercase tracking-wide md:hidden`}>
            Smart Study Planner
          </p>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {pageTitles[location.pathname] || 'Study Planner'}
          </h2>
        </div>

        <nav className="flex gap-2 md:hidden" aria-label="Mobile navigation">
          {mobileLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-100 text-gray-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {location.pathname === '/tasks' && (
            <div className={`flex items-center rounded-lg px-4 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} text-sm font-bold`}>Search</span>
              <input
                type="text"
                placeholder="Find tasks or subjects"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`ml-3 w-full bg-transparent outline-none sm:w-64 ${
                  darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          )}

          <button
            onClick={toggleDarkMode}
            className={`rounded border px-3 py-2 text-sm font-medium transition ${
              darkMode
                ? 'border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title="Toggle dark mode"
          >
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </div>
    </header>
  );
}
