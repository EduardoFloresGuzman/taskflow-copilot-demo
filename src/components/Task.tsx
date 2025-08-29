'use client';

import React, { useState } from 'react';

interface TaskProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export default function Task({ id, text, completed, onToggle, onDelete, onEdit }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(text);
      setIsEditing(false);
    }
  };

  return (
    <div className={`task ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleEdit}
          autoFocus
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>
          {text}
        </span>
      )}
      
      <button onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}
