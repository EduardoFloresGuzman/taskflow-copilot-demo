/**
 * TaskFlow Main Page - Following Complete Specifications
 * Advanced todo list with all features from the specification
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Task, AppState, CreateTaskInput, UpdateTaskInput, TaskFilter, TaskPriority } from '@/types';
import { TaskCard } from '@/components/task/task-card';
import { TaskForm } from '@/components/task/task-form';
import { FilterBar } from '@/components/task/filter-bar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  createTask, 
  storage, 
  filterTasksBySearch, 
  getUniqueCategories, 
  sortTasksByPriority,
  getTaskStats 
} from '@/lib/utils';

/**
 * Main todo application page following TaskFlow specifications
 * Implements all features: priorities, categories, search, theme, persistence
 */
export function TaskFlowPage() {
  const [appState, setAppState] = useState<AppState>({
    tasks: [],
    filter: 'all',
    searchTerm: '',
    selectedCategory: null,
    theme: 'light',
  });

  // Load initial data from localStorage
  useEffect(() => {
    const savedTasks = storage.loadTasks();
    const savedTheme = storage.loadTheme();
    
    setAppState(prev => ({
      ...prev,
      tasks: savedTasks,
      theme: savedTheme,
    }));
  }, []);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    storage.saveTasks(appState.tasks);
  }, [appState.tasks]);

  // Save theme to localStorage when theme changes
  useEffect(() => {
    storage.saveTheme(appState.theme);
    document.documentElement.classList.toggle('dark', appState.theme === 'dark');
  }, [appState.theme]);

  // Computed values
  const uniqueCategories = useMemo(() => getUniqueCategories(appState.tasks), [appState.tasks]);
  const taskStats = useMemo(() => getTaskStats(appState.tasks), [appState.tasks]);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = appState.tasks;

    // Apply text search
    filtered = filterTasksBySearch(filtered, appState.searchTerm);

    // Apply category filter
    if (appState.selectedCategory) {
      filtered = filtered.filter(task => task.category === appState.selectedCategory);
    }

    // Apply completion filter
    if (appState.filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (appState.filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    // Sort by priority
    return sortTasksByPriority(filtered);
  }, [appState.tasks, appState.searchTerm, appState.selectedCategory, appState.filter]);

  // Event handlers
  const handleCreateTask = (input: CreateTaskInput) => {
    const newTask = createTask(input);
    setAppState(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));
  };

  const handleToggleComplete = (id: string) => {
    setAppState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      ),
    }));
  };

  const handleEditTask = (id: string, updates: UpdateTaskInput) => {
    setAppState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      ),
    }));
  };

  const handleDeleteTask = (id: string) => {
    setAppState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id),
    }));
  };

  const handleFilterChange = (filter: TaskFilter) => {
    setAppState(prev => ({ ...prev, filter }));
  };

  const handleSearchChange = (searchTerm: string) => {
    setAppState(prev => ({ ...prev, searchTerm }));
  };

  const handleCategoryChange = (category: string | null) => {
    setAppState(prev => ({ ...prev, selectedCategory: category }));
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setAppState(prev => ({ ...prev, theme }));
  };

  const handleClearCompleted = () => {
    setAppState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => !task.completed),
    }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      appState.theme === 'dark' 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              TaskFlow - Advanced Demo
            </h1>
            <ThemeToggle theme={appState.theme} onThemeChange={handleThemeChange} />
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Specification-driven development with GitHub Copilot
          </p>
          
          {/* Statistics */}
          <div className="mt-4 flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <span>Total: {taskStats.total}</span>
            <span>Active: {taskStats.active}</span>
            <span>Completed: {taskStats.completed}</span>
            {taskStats.overdue > 0 && (
              <span className="text-red-600 dark:text-red-400 font-medium">
                Overdue: {taskStats.overdue}
              </span>
            )}
            <span>Progress: {taskStats.completionRate}%</span>
          </div>
        </header>

        {/* Task Creation Form */}
        <section className="mb-8" aria-label="Create new task">
          <TaskForm
            onSubmit={handleCreateTask}
            categories={uniqueCategories.length > 0 ? uniqueCategories : ['Work', 'Personal', 'Shopping']}
            defaultCategory={uniqueCategories[0] || 'Work'}
            defaultPriority="medium"
          />
        </section>

        {/* Filter and Search */}
        <section className="mb-6" aria-label="Filter and search tasks">
          <FilterBar
            currentFilter={appState.filter}
            onFilterChange={handleFilterChange}
            searchTerm={appState.searchTerm}
            onSearchChange={handleSearchChange}
            categories={uniqueCategories}
            selectedCategory={appState.selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </section>

        {/* Task List */}
        <main>
          {filteredTasks.length === 0 ? (
            <div className={`
              text-center py-16 px-4 rounded-lg border-2 border-dashed
              ${appState.theme === 'dark' 
                ? 'border-slate-700 bg-slate-800/50' 
                : 'border-slate-300 bg-white'
              }
            `}>
              <div className="mx-auto w-16 h-16 mb-4 text-slate-400">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                {appState.tasks.length === 0 
                  ? 'No tasks yet'
                  : `No ${appState.filter === 'all' ? '' : appState.filter} tasks found`
                }
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                {appState.tasks.length === 0 
                  ? 'Create your first task to get started with TaskFlow!'
                  : 'Try adjusting your filters or search terms.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3" role="list" aria-label="Task list">
              {filteredTasks.map(task => (
                <div key={task.id} role="listitem">
                  <TaskCard
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Actions */}
        {taskStats.completed > 0 && (
          <footer className="mt-8 flex justify-center">
            <button
              onClick={handleClearCompleted}
              className="px-4 py-2 text-sm font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 dark:text-amber-200 dark:bg-amber-900 dark:hover:bg-amber-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              Clear {taskStats.completed} Completed Task{taskStats.completed === 1 ? '' : 's'}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
