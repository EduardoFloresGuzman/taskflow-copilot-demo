'use client';

import React, { useState, useEffect } from 'react';
import Task from '@/components/Task';
import './todo.css';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoPage() {
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, newTodo]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id: number, newText: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="todo-app">
      <header>
        <h1>Todo List</h1>
      </header>

      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active ({activeCount})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({completedCount})
        </button>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty-state">
            {filter === 'all' ? 'No tasks yet. Add one above!' :
             filter === 'active' ? 'No active tasks!' :
             'No completed tasks!'}
          </p>
        ) : (
          filteredTasks.map(task => (
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))
        )}
      </div>

      {completedCount > 0 && (
        <div className="actions">
          <button onClick={clearCompleted}>
            Clear Completed ({completedCount})
          </button>
        </div>
      )}

      <footer>
        <p>Total: {tasks.length} tasks</p>
      </footer>
    </div>
  );
}
