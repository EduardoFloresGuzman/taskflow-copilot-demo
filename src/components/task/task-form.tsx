/**
 * TaskForm Component - Following TaskFlow Specifications
 * Form for creating new tasks with validation and design system
 */

'use client';

import { useState } from 'react';
import { TaskFormProps, CreateTaskInput, TaskPriority } from '@/types';
import { validateTaskTitle, validateTaskDescription, getPriorityLabel } from '@/lib/utils';

/**
 * Task creation form following TaskFlow design system
 * Includes validation, accessibility, and proper error handling
 */
export function TaskForm({ 
  onSubmit, 
  categories, 
  defaultCategory = 'General',
  defaultPriority = 'medium' 
}: TaskFormProps) {
  const [formData, setFormData] = useState<CreateTaskInput>({
    title: '',
    description: '',
    priority: defaultPriority,
    category: defaultCategory,
  });

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const titleValidation = validateTaskTitle(formData.title);
    const descriptionValidation = validateTaskDescription(formData.description);
    
    const newErrors: typeof errors = {};
    
    if (!titleValidation.valid) {
      newErrors.title = titleValidation.error;
    }
    
    if (!descriptionValidation.valid) {
      newErrors.description = descriptionValidation.error;
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Submit the task
    const finalCategory = isCustomCategory ? customCategory.trim() : formData.category;
    
    onSubmit({
      ...formData,
      category: finalCategory,
      title: formData.title.trim(),
      description: formData.description?.trim() || undefined,
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: defaultPriority,
      category: defaultCategory,
    });
    setErrors({});
    setIsCustomCategory(false);
    setCustomCategory('');
  };

  const handleCategoryChange = (value: string) => {
    if (value === '__custom__') {
      setIsCustomCategory(true);
      setCustomCategory('');
    } else {
      setIsCustomCategory(false);
      setFormData(prev => ({ ...prev, category: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Create New Task
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title Input */}
        <div className="md:col-span-2">
          <label 
            htmlFor="task-title" 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Title *
          </label>
          <input
            id="task-title"
            type="text"
            value={formData.title}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, title: e.target.value }));
              if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
            }}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100
              ${errors.title 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-slate-300 dark:border-slate-600'
              }
            `}
            placeholder="What needs to be done?"
            maxLength={100}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.title}
            </p>
          )}
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {formData.title.length}/100 characters
          </p>
        </div>

        {/* Description Input */}
        <div className="md:col-span-2">
          <label 
            htmlFor="task-description" 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Description (optional)
          </label>
          <textarea
            id="task-description"
            value={formData.description}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, description: e.target.value }));
              if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
            }}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm transition-colors resize-none
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100
              ${errors.description 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-slate-300 dark:border-slate-600'
              }
            `}
            placeholder="Add more details about this task..."
            rows={3}
            maxLength={500}
            aria-describedby={errors.description ? "description-error" : undefined}
          />
          {errors.description && (
            <p id="description-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.description}
            </p>
          )}
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {formData.description?.length || 0}/500 characters
          </p>
        </div>

        {/* Priority Selection */}
        <div>
          <label 
            htmlFor="task-priority" 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Priority
          </label>
          <select
            id="task-priority"
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as TaskPriority }))}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>
                {getPriorityLabel(priority)}
              </option>
            ))}
          </select>
        </div>

        {/* Category Selection */}
        <div>
          <label 
            htmlFor="task-category" 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Category
          </label>
          {isCustomCategory ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100"
                placeholder="Enter category name"
                maxLength={50}
              />
              <button
                type="button"
                onClick={() => setIsCustomCategory(false)}
                className="px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                aria-label="Cancel custom category"
              >
                ✕
              </button>
            </div>
          ) : (
            <select
              id="task-category"
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="__custom__">+ Create new category</option>
            </select>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={!formData.title.trim() || (isCustomCategory && !customCategory.trim())}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-slate-800 transition-colors"
        >
          Create Task
        </button>
      </div>
    </form>
  );
}
