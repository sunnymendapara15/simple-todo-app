import React, { useState } from 'react';

function TodoForm({ onAdd, disabled }) {
  const [text, setText] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setLocalError('Please enter a todo.');
      return;
    }

    setLocalError('');
    try {
      await onAdd(trimmed);
      setText('');
    } catch (err) {
      setLocalError(err.message || 'Unable to add todo.');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        Add
      </button>
      {localError && <p className="feedback error">{localError}</p>}
    </form>
  );
}

export default TodoForm;
