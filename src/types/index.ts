/**
 * Core data models for TaskFlow Todo Application
 * Following the specification defined in README.md
 */

/**
 * Priority levels for tasks
 */
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * Task filter options
 */
export type TaskFilter = 'all' | 'active' | 'completed';

/**
 * Application theme options
 */
export type Theme = 'light' | 'dark';

/**
 * Main Task interface
 * Represents a single todo item with all required and optional properties
 */
export interface Task {
  /** Unique identifier (UUID v4) */
  id: string;
  
  /** Task title (max 100 characters) */
  title: string;
  
  /** Optional task description (max 500 characters) */
  description?: string;
  
  /** Whether the task is completed */
  completed: boolean;
  
  /** Task priority level */
  priority: TaskPriority;
  
  /** User-defined category */
  category: string;
  
  /** Task creation timestamp */
  createdAt: Date;
  
  /** Last update timestamp */
  updatedAt: Date;
  
  /** Optional due date */
  dueDate?: Date;
}

/**
 * Application global state interface
 * Represents the complete state of the todo application
 */
export interface AppState {
  /** List of all tasks */
  tasks: Task[];
  
  /** Current filter applied to task list */
  filter: TaskFilter;
  
  /** Current search term for filtering tasks */
  searchTerm: string;
  
  /** Currently selected category filter */
  selectedCategory: string | null;
  
  /** Current application theme */
  theme: Theme;
}

/**
 * Task creation input interface
 * Used for forms and API calls when creating new tasks
 */
export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: TaskPriority;
  category: string;
  dueDate?: Date;
}

/**
 * Task update input interface
 * Used for forms and API calls when updating existing tasks
 */
export interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  category?: string;
  dueDate?: Date;
  completed?: boolean;
}

/**
 * Local storage data structure
 * Defines how data is persisted in browser storage
 */
export interface StorageData {
  tasks: Task[];
  preferences: {
    theme: Theme;
    defaultCategory: string;
    defaultPriority: TaskPriority;
  };
}

/**
 * Component prop interfaces
 */

export interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, updates: UpdateTaskInput) => void;
  onDelete: (id: string) => void;
}

export interface TaskFormProps {
  onSubmit: (input: CreateTaskInput) => void;
  categories: string[];
  defaultCategory?: string;
  defaultPriority?: TaskPriority;
}

export interface FilterBarProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export interface PriorityBadgeProps {
  priority: TaskPriority;
  size?: 'sm' | 'md' | 'lg';
}

export interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}
