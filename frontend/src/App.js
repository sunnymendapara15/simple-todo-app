import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const API_BASE = '/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(API_BASE);
      if (!response.ok) {
        throw new Error('Unable to load todos.');
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message || 'Failed to load todos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    try {
      setError('');
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || 'Unable to add todo.');
      }

      const created = await response.json();
      setTodos((prev) => [...prev, created]);
    } catch (err) {
      setError(err.message || 'Unable to add todo.');
    }
  };

  const toggleTodo = async (id) => {
    try {
      setError('');
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PATCH'
      });

      if (!response.ok) {
        throw new Error('Unable to update todo status.');
      }

      const updated = await response.json();
      setTodos((prev) => prev.map((todo) => (todo.id === updated.id ? updated : todo)));
    } catch (err) {
      setError(err.message || 'Unable to update todo status.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError('');
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Unable to delete todo.');
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message || 'Unable to delete todo.');
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Simple Todo List</h1>
        <p>Track tasks without the overhead.</p>
      </header>

      <TodoForm onAdd={addTodo} disabled={loading} />

      {error && <p className="feedback error">{error}</p>}

      {loading ? (
        <p className="feedback">Loading todos…</p>
      ) : (
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      )}
    </div>
  );
}

export default App;
