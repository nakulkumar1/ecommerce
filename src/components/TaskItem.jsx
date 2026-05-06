import { memo, useCallback } from 'react';

const TaskItem = memo(({ task, onToggle, onDelete, darkMode = false }) => {
  const priorityStyles = {
    high: darkMode ? 'border-l-rose-500 bg-gray-800 border-gray-700' : 'border-l-rose-500 bg-white border-gray-200',
    medium: darkMode ? 'border-l-amber-500 bg-gray-800 border-gray-700' : 'border-l-amber-500 bg-white border-gray-200',
    low: darkMode ? 'border-l-emerald-500 bg-gray-800 border-gray-700' : 'border-l-emerald-500 bg-white border-gray-200',
  };

  const priorityBadgeStyles = {
    high: darkMode ? 'text-rose-300' : 'text-rose-700',
    medium: darkMode ? 'text-amber-300' : 'text-amber-700',
    low: darkMode ? 'text-emerald-300' : 'text-emerald-700',
  };

  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [task.id, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [task.id, onDelete]);

  return (
    <div className={`rounded border border-l-4 p-4 ${priorityStyles[task.priority]}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              className="h-5 w-5 cursor-pointer rounded"
              aria-label={`Mark ${task.text} as ${task.completed ? 'pending' : 'completed'}`}
            />
            <span
              className={`break-words ${
                task.completed
                  ? 'line-through text-gray-400'
                  : `${darkMode ? 'text-gray-100' : 'text-gray-800'} font-medium`
              }`}
            >
              {task.text}
            </span>
          </div>
          <div className="ml-8 mt-2 flex flex-wrap gap-2">
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
              {task.subject}
            </span>
            <span className={`${priorityBadgeStyles[task.priority]} text-xs font-medium`}>
              {task.priority.toUpperCase()}
            </span>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="shrink-0 rounded px-2 py-1 text-sm font-medium text-gray-500 transition hover:text-rose-600"
          aria-label={`Delete ${task.text}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';
export default TaskItem;
