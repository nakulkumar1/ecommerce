import { useContext, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';
import StatCard from '../components/StatCard';
import { EmptyState } from '../components/LoadingStates';

export default function Analytics() {
  const { tasks, stats, getWeeklyProductivity, darkMode } = useContext(TaskContext);

  const weeklyData = useMemo(() => getWeeklyProductivity(), [getWeeklyProductivity]);
  const cardClass = `${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded border p-4`;
  const headingColor = darkMode ? 'text-white' : 'text-gray-900';
  const textColor = darkMode ? 'text-gray-300' : 'text-gray-700';
  const lightText = darkMode ? 'text-gray-400' : 'text-gray-500';

  const priorityData = useMemo(() => {
    const data = { high: 0, medium: 0, low: 0 };
    tasks.forEach((task) => {
      data[task.priority] += 1;
    });
    return data;
  }, [tasks]);

  const subjectData = useMemo(() => {
    const subjects = {};
    tasks.forEach((task) => {
      subjects[task.subject] = (subjects[task.subject] || 0) + 1;
    });
    return Object.entries(subjects).sort((a, b) => b[1] - a[1]);
  }, [tasks]);

  const weeklyTotal = weeklyData.reduce((total, day) => total + day.completed, 0);
  const busiestDay = weeklyData.reduce(
    (best, day) => (day.completed > best.completed ? day : best),
    weeklyData[0] || { date: '-', completed: 0 },
  );

  if (tasks.length === 0) {
    return (
      <main className={`min-h-full p-4 sm:p-6 ${darkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
        <h1 className={`mb-5 text-2xl font-semibold ${headingColor}`}>Analytics</h1>
        <EmptyState
          darkMode={darkMode}
          title="No task data yet"
          description="Add some tasks first, then this page will show your study progress."
        />
      </main>
    );
  }

  return (
    <main className={`min-h-full p-4 sm:p-6 ${darkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
      <div className="mb-5">
        <h1 className={`text-2xl font-semibold ${headingColor}`}>Study Analytics</h1>
        <p className={`mt-1 text-sm ${lightText}`}>Simple overview of my study tasks.</p>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Tasks" value={stats.total} icon="ALL" variant="blue" darkMode={darkMode} />
        <StatCard label="Completed" value={stats.completed} icon="DONE" variant="green" darkMode={darkMode} />
        <StatCard label="Pending" value={stats.pending} icon="WAIT" variant="orange" darkMode={darkMode} />
        <StatCard label="High Priority" value={stats.highPriority} icon="HIGH" variant="red" darkMode={darkMode} />
      </div>

      <section className={`${cardClass} mb-5`}>
        <h2 className={`mb-3 text-lg font-semibold ${headingColor}`}>Overall Progress</h2>
        <p className={`mb-2 text-sm ${textColor}`}>
          Completed {stats.completed} out of {stats.total} tasks ({stats.completionRate}%).
        </p>
        <div className={`h-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div className="h-4 rounded bg-blue-600" style={{ width: `${stats.completionRate}%` }} />
        </div>
      </section>

      <div className="mb-5 grid gap-4 lg:grid-cols-2">
        <section className={cardClass}>
          <h2 className={`mb-3 text-lg font-semibold ${headingColor}`}>This Week</h2>
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <div className={`rounded border p-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm ${lightText}`}>Tasks completed this week</p>
              <p className={`mt-1 text-2xl font-semibold ${headingColor}`}>{weeklyTotal}</p>
            </div>
            <div className={`rounded border p-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm ${lightText}`}>Most productive day</p>
              <p className={`mt-1 text-2xl font-semibold ${headingColor}`}>{busiestDay.date}</p>
            </div>
          </div>

          <div className="space-y-2">
            {weeklyData.map((day) => (
              <div key={day.date} className={`flex items-center justify-between rounded px-3 py-2 ${darkMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
                <span className={textColor}>{day.date}</span>
                <span className={`font-medium ${headingColor}`}>{day.completed} done</span>
              </div>
            ))}
          </div>
        </section>

        <section className={cardClass}>
          <h2 className={`mb-3 text-lg font-semibold ${headingColor}`}>Priority Count</h2>
          <div className="space-y-3">
            <ProgressLine label="High" value={priorityData.high} total={stats.total} color="bg-red-600" darkMode={darkMode} />
            <ProgressLine label="Medium" value={priorityData.medium} total={stats.total} color="bg-yellow-500" darkMode={darkMode} />
            <ProgressLine label="Low" value={priorityData.low} total={stats.total} color="bg-green-600" darkMode={darkMode} />
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className={cardClass}>
          <h2 className={`mb-3 text-lg font-semibold ${headingColor}`}>Subject Wise Tasks</h2>
          <table className="w-full text-left text-sm">
            <thead className={lightText}>
              <tr>
                <th className="border-b border-gray-200 pb-2 font-medium">Subject</th>
                <th className="border-b border-gray-200 pb-2 text-right font-medium">Tasks</th>
              </tr>
            </thead>
            <tbody className={textColor}>
              {subjectData.map(([subject, count]) => (
                <tr key={subject}>
                  <td className="border-b border-gray-100 py-2">{subject}</td>
                  <td className="border-b border-gray-100 py-2 text-right">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={cardClass}>
          <h2 className={`mb-3 text-lg font-semibold ${headingColor}`}>My Notes</h2>
          <ul className={`list-disc space-y-2 pl-5 text-sm ${textColor}`}>
            <li>{stats.completionRate >= 70 ? 'Good progress so far.' : 'Need to complete more pending tasks.'}</li>
            <li>{stats.highPriority} high priority tasks are still pending.</li>
            <li>{weeklyTotal} tasks were completed in the last 7 days.</li>
            <li>Most tasks are in {subjectData[0]?.[0] || 'General'}.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

function ProgressLine({ label, value, total, color, darkMode }) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className={`mb-1 flex justify-between text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className={`h-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div className={`h-3 rounded ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
