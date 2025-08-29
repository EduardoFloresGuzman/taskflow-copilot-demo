/**
 * TaskCard Component - Following TaskFlow Specifications
 * Displays a single task with all features following the design system
 */

'use client';

import { Task, TaskCardProps } from '@/types';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { formatRelativeTime, isTaskOverdue } from '@/lib/utils';
import { useState } from 'react';

/**
 * TaskCard component following TaskFlow design system and specifications
 * Implements accessibility, proper TypeScript interfaces, and design patterns
 */
export function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEdit(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const isOverdue = isTaskOverdue(task);

  return (
    <div
      className={`
        group relative bg-white border border-slate-200 rounded-lg p-4 
        transition-all duration-200 hover:shadow-md hover:border-slate-300
        ${task.completed ? 'opacity-60' : ''}
        ${isOverdue ? 'border-red-200 bg-red-50' : ''}
      `}
      role="article"
      aria-label={`Task: ${task.title}`}
    >
      {/* Task Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Completion Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`
            mt-1 w-5 h-5 rounded border-2 flex items-center justify-center
            transition-colors duration-200 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-2
            ${task.completed 
              ? 'bg-emerald-600 border-emerald-600 text-white' 
              : 'border-slate-300 hover:border-blue-500'
            }
          `}
          aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
        >
          {task.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Task title (max 100 characters)"
                maxLength={100}
                autoFocus
                aria-label="Edit task title"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Task description (optional, max 500 characters)"
                maxLength={500}
                rows={2}
                aria-label="Edit task description"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 bg-slate-200 text-slate-700 text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              onDoubleClick={() => setIsEditing(true)}
              className="cursor-pointer"
            >
              <h3
                className={`
                  font-medium text-slate-900 leading-tight
                  ${task.completed ? 'line-through text-slate-500' : ''}
                `}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`
                    mt-1 text-sm text-slate-600 leading-relaxed
                    ${task.completed ? 'line-through text-slate-400' : ''}
                  `}
                >
                  {task.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Priority Badge */}
        <PriorityBadge priority={task.priority} size="sm" />
      </div>

      {/* Task Metadata */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {formatRelativeTime(task.createdAt)}
          </span>
          
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            {task.category}
          </span>

          {task.dueDate && (
            <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Due {formatRelativeTime(task.dueDate)}
              {isOverdue && ' (Overdue)'}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Edit task"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Delete task"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
