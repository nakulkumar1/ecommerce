import { Suspense, lazy, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { LoadingSpinner } from './components/LoadingStates';
import ErrorBoundary from './components/ErrorBoundary';
import { TaskContext } from './context/TaskContext';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Analytics = lazy(() => import('./pages/Analytics'));

function AppContent() {
  const { darkMode } = useContext(TaskContext);
  const location = useLocation();

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className={`flex-1 overflow-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <ErrorBoundary darkMode={darkMode} resetKey={location.pathname}>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default AppContent;
