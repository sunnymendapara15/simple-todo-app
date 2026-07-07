import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span className="todo-text" onClick={onToggle}>
        {todo.text}
      </span>
      <div className="todo-actions">
        <button type="button" onClick={onToggle}>
          {todo.completed ? 'Mark active' : 'Complete'}
        </button>
        <button type="button" className="delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
