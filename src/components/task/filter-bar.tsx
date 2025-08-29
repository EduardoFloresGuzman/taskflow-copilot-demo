/**
 * FilterBar Component - Following TaskFlow Specifications
 * Advanced filtering and search functionality with design system
 */

'use client';

import { FilterBarProps, TaskFilter } from '@/types';

/**
 * Filter and search bar following TaskFlow design system
 * Provides filtering by status, category, and text search
 */
export function FilterBar({
  currentFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: FilterBarProps) {
  const filters: { key: TaskFilter; label: string }[] = [
    { key: 'all', label: 'All Tasks' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="h-4 w-4 text-slate-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100 transition-colors"
          placeholder="Search tasks by title, description, or category..."
          aria-label="Search tasks"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            aria-label="Clear search"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter Buttons and Category Dropdown */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Status Filter Buttons */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                dark:focus:ring-offset-slate-800
                ${currentFilter === filter.key
                  ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                }
              `}
              aria-pressed={currentFilter === filter.key}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2">
            <label 
              htmlFor="category-filter"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap"
            >
              Category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory || ''}
              onChange={(e) => onCategoryChange(e.target.value || null)}
              className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100 min-w-0"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory) && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Active filters:
          </span>
          
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md">
              Search: "{searchTerm}"
              <button
                onClick={() => onSearchChange('')}
                className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                aria-label="Remove search filter"
              >
                ✕
              </button>
            </span>
          )}
          
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs rounded-md">
              Category: {selectedCategory}
              <button
                onClick={() => onCategoryChange(null)}
                className="text-emerald-600 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-100"
                aria-label="Remove category filter"
              >
                ✕
              </button>
            </span>
          )}
          
          <button
            onClick={() => {
              onSearchChange('');
              onCategoryChange(null);
            }}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
