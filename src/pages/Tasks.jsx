import { useCallback, useContext, useMemo, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import StatCard from '../components/StatCard';
import { EmptyState } from '../components/LoadingStates';

export default function Tasks() {
  const {
    getFilteredTasks,
    deleteTask,
    toggleTask,
    deleteCompletedTasks,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    stats,
    darkMode,
  } = useContext(TaskContext);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const filteredTasks = useMemo(() => getFilteredTasks(), [getFilteredTasks]);
  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / tasksPerPage));
  const activePage = Math.min(currentPage, totalPages);
  const pageStart = (activePage - 1) * tasksPerPage;
  const paginatedTasks = filteredTasks.slice(pageStart, pageStart + tasksPerPage);

  const handleDeleteTask = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  }, [deleteTask]);

  return (
    <main className={`min-h-full p-4 sm:p-6 ${darkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Tasks Management</h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
            Search, filter, sort, complete, and delete your study tasks.
          </p>
        </div>
        {stats.completed > 0 && (
          <button
            onClick={deleteCompletedTasks}
            className="rounded border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Clear completed
          </button>
        )}
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Tasks" value={stats.total} icon="ALL" variant="blue" darkMode={darkMode} />
        <StatCard label="Completed" value={stats.completed} icon="DONE" variant="green" darkMode={darkMode} />
        <StatCard label="Pending" value={stats.pending} icon="TODO" variant="orange" darkMode={darkMode} />
        <StatCard label="Completion Rate" value={`${stats.completionRate}%`} icon="RATE" variant="purple" darkMode={darkMode} />
      </div>

      <section className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-5 rounded border p-4`}>
        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 block text-sm font-medium`}>Search Tasks</label>
            <input
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search title or subject"
              className={`w-full rounded border p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                darkMode ? 'border-gray-700 bg-gray-900 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
              }`}
            />
          </div>
          <div>
            <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 block text-sm font-medium`}>Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(event) => {
                setFilterStatus(event.target.value);
                setCurrentPage(1);
              }}
              className={`w-full rounded border p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                darkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-900'
              }`}
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 block text-sm font-medium`}>Sort by</label>
            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setCurrentPage(1);
              }}
              className={`w-full rounded border p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                darkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-900'
              }`}
            >
              <option value="recent">Most Recent</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </section>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <EmptyState
            darkMode={darkMode}
            title="No tasks found"
            description={filterStatus === 'all' ? 'Add a task from the dashboard to get started.' : 'Try a different filter or search term.'}
          />
        ) : (
          paginatedTasks.map((task) => (
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

      {filteredTasks.length > tasksPerPage && (
        <div className={`mt-5 flex flex-col gap-3 rounded border p-3 sm:flex-row sm:items-center sm:justify-between ${
          darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        }`}>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
            Showing {pageStart + 1} to {Math.min(pageStart + tasksPerPage, filteredTasks.length)} of {filteredTasks.length} tasks
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={activePage === 1}
              className={`rounded border px-3 py-1.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ${
                darkMode ? 'border-gray-600 text-gray-200' : 'border-gray-300 text-gray-700'
              }`}
            >
              Previous
            </button>
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} px-2 text-sm`}>
              Page {activePage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={activePage === totalPages}
              className={`rounded border px-3 py-1.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ${
                darkMode ? 'border-gray-600 text-gray-200' : 'border-gray-300 text-gray-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
