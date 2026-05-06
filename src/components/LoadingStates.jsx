import { memo } from 'react';

export const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center p-8">
    <div className="relative h-8 w-8">
      <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
      <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-blue-600"></div>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

export const EmptyState = memo(({ icon, title, description, action, darkMode = false }) => (
  <div className={`rounded border border-dashed py-10 text-center ${
    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
  }`}>
    {icon && <p className="text-4xl mb-4">{icon}</p>}
    <p className={`${darkMode ? 'text-gray-100' : 'text-gray-700'} font-medium`}>{title}</p>
    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-400'} text-sm mt-2`}>{description}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
));

EmptyState.displayName = 'EmptyState';

export const SkeletonLoader = memo(({ count = 5, darkMode = false }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-sm animate-pulse`}>
        <div className="flex items-center gap-4">
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-300'} w-5 h-5 rounded`}></div>
          <div className="flex-1">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-300'} h-4 rounded w-3/4 mb-2`}></div>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} h-3 rounded w-1/2`}></div>
          </div>
        </div>
      </div>
    ))}
  </div>
));

SkeletonLoader.displayName = 'SkeletonLoader';
