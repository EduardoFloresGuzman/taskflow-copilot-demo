/**
 * Utility functions for TaskFlow Todo Application
 * Following conventions and patterns defined in README.md
 */

import { Task, TaskPriority, CreateTaskInput } from '@/types';

/**
 * Generate a UUID v4 string
 * Used for creating unique task IDs
 */
export function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Create a new task from input data
 * Follows the Task interface specification
 */
export function createTask(input: CreateTaskInput): Task {
  const now = new Date();
  
  return {
    id: generateId(),
    title: input.title.trim(),
    description: input.description?.trim(),
    completed: false,
    priority: input.priority,
    category: input.category.trim(),
    createdAt: now,
    updatedAt: now,
    dueDate: input.dueDate,
  };
}

/**
 * Validate task title according to specification (max 100 characters)
 */
export function validateTaskTitle(title: string): { valid: boolean; error?: string } {
  const trimmed = title.trim();
  
  if (!trimmed) {
    return { valid: false, error: 'Title is required' };
  }
  
  if (trimmed.length > 100) {
    return { valid: false, error: 'Title must be 100 characters or less' };
  }
  
  return { valid: true };
}

/**
 * Validate task description according to specification (max 500 characters)
 */
export function validateTaskDescription(description?: string): { valid: boolean; error?: string } {
  if (!description) {
    return { valid: true };
  }
  
  if (description.trim().length > 500) {
    return { valid: false, error: 'Description must be 500 characters or less' };
  }
  
  return { valid: true };
}

/**
 * Get priority color following design system
 */
export function getPriorityColor(priority: TaskPriority): string {
  const colors = {
    low: 'text-slate-500 bg-slate-100',
    medium: 'text-amber-600 bg-amber-100',
    high: 'text-orange-600 bg-orange-100',
    urgent: 'text-red-600 bg-red-100',
  };
  
  return colors[priority];
}

/**
 * Get priority label for display
 */
export function getPriorityLabel(priority: TaskPriority): string {
  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  };
  
  return labels[priority];
}

/**
 * Sort tasks by priority (urgent first, then high, medium, low)
 */
export function sortTasksByPriority(tasks: Task[]): Task[] {
  const priorityOrder: Record<TaskPriority, number> = {
    urgent: 0,
    high: 1,
    medium: 2,
    low: 3,
  };
  
  return [...tasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Filter tasks by search term
 * Searches in title, description, and category
 */
export function filterTasksBySearch(tasks: Task[], searchTerm: string): Task[] {
  if (!searchTerm.trim()) {
    return tasks;
  }
  
  const term = searchTerm.toLowerCase().trim();
  
  return tasks.filter(task => 
    task.title.toLowerCase().includes(term) ||
    task.description?.toLowerCase().includes(term) ||
    task.category.toLowerCase().includes(term)
  );
}

/**
 * Get unique categories from task list
 */
export function getUniqueCategories(tasks: Task[]): string[] {
  const categories = new Set(tasks.map(task => task.category));
  return Array.from(categories).sort();
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffHours < 1) {
    return 'Just now';
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  } else {
    return formatDate(date);
  }
}

/**
 * Check if task is overdue
 */
export function isTaskOverdue(task: Task): boolean {
  if (!task.dueDate || task.completed) {
    return false;
  }
  
  return new Date() > task.dueDate;
}

/**
 * Get task statistics
 */
export function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;
  const overdue = tasks.filter(isTaskOverdue).length;
  
  return {
    total,
    completed,
    active,
    overdue,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

/**
 * Local storage utilities following the StorageData interface
 */
export const storage = {
  /**
   * Save tasks to localStorage
   */
  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  },

  /**
   * Load tasks from localStorage
   */
  loadTasks(): Task[] {
    try {
      const stored = localStorage.getItem('taskflow-tasks');
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return parsed.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      }));
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
      return [];
    }
  },

  /**
   * Save theme preference
   */
  saveTheme(theme: 'light' | 'dark'): void {
    try {
      localStorage.setItem('taskflow-theme', theme);
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }
  },

  /**
   * Load theme preference
   */
  loadTheme(): 'light' | 'dark' {
    try {
      const stored = localStorage.getItem('taskflow-theme');
      return (stored === 'dark' || stored === 'light') ? stored : 'light';
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error);
      return 'light';
    }
  },
};
