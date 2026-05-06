/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useCallback, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = useCallback((text, priority = 'medium', subject = 'General') => {
    if (!text.trim()) return null;

    const newTask = {
      id: uuidv4(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      priority,
      subject,
    };

    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : null,
          }
          : task
      )
    );
  }, []);

  const updateTask = useCallback((id, updates) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }, []);

  const deleteCompletedTasks = useCallback(() => {
    setTasks(prev => prev.filter(task => !task.completed));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const getFilteredTasks = useCallback(() => {
    let filtered = tasks;

    if (filterStatus === 'completed') {
      filtered = filtered.filter(t => t.completed);
    } else if (filterStatus === 'pending') {
      filtered = filtered.filter(t => !t.completed);
    }

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.text.toLowerCase().includes(lowerSearch) ||
        t.subject.toLowerCase().includes(lowerSearch)
      );
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case 'alphabetical':
        sorted.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case 'priority':
      {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      }
      case 'recent':
      default:
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return sorted;
  }, [tasks, filterStatus, searchTerm, sortBy]);

  const stats = useMemo(() => {
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.length - completed;

    return {
      total: tasks.length,
      completed,
      pending,
      completionRate: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0,
      highPriority: tasks.filter(t => !t.completed && t.priority === 'high').length,
    };
  }, [tasks]);

  const getWeeklyProductivity = useCallback(() => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const completedCount = tasks.filter(t => {
        if (!t.completedAt) return false;
        const completedDate = new Date(t.completedAt);
        completedDate.setHours(0, 0, 0, 0);
        return completedDate.getTime() === date.getTime();
      }).length;

      last7Days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: completedCount,
      });
    }
    return last7Days;
  }, [tasks]);

  const value = useMemo(() => ({
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    deleteCompletedTasks,
    darkMode,
    toggleDarkMode,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    getFilteredTasks,
    stats,
    getWeeklyProductivity,
  }), [
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    deleteCompletedTasks,
    darkMode,
    toggleDarkMode,
    searchTerm,
    filterStatus,
    sortBy,
    getFilteredTasks,
    stats,
    getWeeklyProductivity,
  ]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
}
