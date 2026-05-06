import { memo } from 'react';

const StatCard = memo(({ label, value, icon, variant = 'blue', darkMode = false }) => {
  const colorMap = {
    blue: 'text-blue-700',
    green: 'text-emerald-700',
    orange: 'text-amber-700',
    purple: 'text-indigo-700',
    red: 'text-rose-700',
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded border p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{label}</p>
          <p className={`mt-1 text-2xl font-semibold ${colorMap[variant]}`}>{value}</p>
        </div>
        <span className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-500'} grid h-9 w-9 place-items-center rounded text-[11px] font-semibold`}>
          {icon}
        </span>
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';
export default StatCard;
