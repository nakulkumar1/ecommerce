import { useCallback, useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import StatCard from '../components/StatCard';
import TaskItem from '../components/TaskItem';
import { EmptyState } from '../components/LoadingStates';
import StudyQuote from '../components/StudyQuote';

export default function Dashboard() {
  const {
    addTask,
    deleteTask,
    toggleTask,
    tasks,
    stats,
    darkMode,
  } = useContext(TaskContext);

  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [subject, setSubject] = useState('General');

  const recentTasks = useMemo(
    () => [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    [tasks],
  );

  const handleAddTask = useCallback(() => {
    if (!taskText.trim()) return;
    addTask(taskText, priority, subject);
    setTaskText('');
    setPriority('medium');
    setSubject('General');
  }, [taskText, priority, subject, addTask]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleDeleteTask = useCallback((id) => {
    deleteTask(id);
  }, [deleteTask]);

  return (
    <main className={`min-h-full p-4 sm:p-6 ${darkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
      <div className="mb-5">
        <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
          Manage your study tasks and track progress in one place.
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Tasks" value={stats.total} icon="ALL" variant="blue" darkMode={darkMode} />
        <StatCard label="Completed" value={stats.completed} icon="DONE" variant="green" darkMode={darkMode} />
        <StatCard label="Pending" value={stats.pending} icon="TODO" variant="orange" darkMode={darkMode} />
        <StatCard label="Completion Rate" value={`${stats.completionRate}%`} icon="RATE" variant="purple" darkMode={darkMode} />
      </div>

      <div className="mb-6 grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <section className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded border p-5`}>
          <h2 className={`mb-4 text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Task</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your study task"
              className={`w-full rounded border p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                darkMode ? 'border-gray-700 bg-gray-900 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
              }`}
              value={taskText}
              onChange={(event) => setTaskText(event.target.value)}
              onKeyDown={handleKeyDown}
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 block text-sm font-medium`}>Priority</label>
                <select
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                  className={`w-full rounded border p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-900'
                  }`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 block text-sm font-medium`}>Subject</label>
                <select
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className={`w-full rounded border p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-900'
                  }`}
                >
                  <option>General</option>
                  <option>DSA</option>
                  <option>Web Dev</option>
                  <option>Minor Project</option>
                  <option>Maker's Lab</option>
                  <option>Physics</option>
                  <option>Other</option>
                </select>
              </div>

              <button
                onClick={handleAddTask}
                className="self-end rounded bg-slate-900 p-2 font-medium text-white transition hover:bg-slate-800"
              >
                Add Task
              </button>
            </div>
          </div>
        </section>

        <StudyQuote darkMode={darkMode} />
      </div>

      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Tasks</h2>
          <Link to="/tasks" className="text-sm font-medium text-blue-700 hover:text-blue-800">
            View all tasks
          </Link>
        </div>
        <div className="space-y-3">
          {recentTasks.length === 0 ? (
            <EmptyState
              darkMode={darkMode}
              title="No tasks yet"
              description="Create your first study task to begin tracking your progress."
            />
          ) : (
            recentTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={handleDeleteTask}
                darkMode={darkMode}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
