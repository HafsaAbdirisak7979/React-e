import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: true },
    { id: 3, text: 'Master JavaScript', completed: false },

  ]);
  
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    if (editingText.trim() !== '') {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: editingText } : todo
      ));
      setEditingId(null);
      setEditingText('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (editingId) {
        saveEdit(editingId);
      } else {
        addTodo();
      }
    }
  };

  const clearAllCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="app">
      <div className="todo-container">
        <header className="header">
          <div className="header-top">
            <div className="app-icon">
              <div className="app-icon-circle">✓</div>
            </div>
            <h1 className="title">My Todo List</h1>
          </div>
          <p className="subtitle">Stay organized and productive</p>
        </header>

        <div className="input-section">
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new todo..."
                className="todo-input"
              />
              <div className="input-hint">Press Enter to add</div>
            </div>
            <button onClick={addTodo} className="add-btn">
              <span className="btn-text">Add</span>
              <span className="plus-icon">+</span>
            </button>
          </div>
        </div>

        <div className="todos-section">
          {todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <p className="empty-text">No todos yet. Add one above!</p>
            </div>
          ) : (
            <ul className="todo-list">
              {todos.map(todo => (
                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-left">
                    <button 
                      className={`checkbox-btn ${todo.completed ? 'checked' : ''}`}
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.completed ? '✓' : ''}
                    </button>
                    
                    {editingId === todo.id ? (
                      <div className="edit-input-wrapper">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="edit-input"
                          autoFocus
                        />
                        <div className="edit-actions">
                          <button 
                            onClick={() => saveEdit(todo.id)}
                            className="action-btn save-btn"
                          >
                            Save
                          </button>
                          <button 
                            onClick={cancelEdit}
                            className="action-btn cancel-btn"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className={`todo-text ${todo.completed ? 'completed-text' : ''}`}>
                        {todo.text}
                      </span>
                    )}
                  </div>
                  
                  <div className="todo-actions">
                    {editingId !== todo.id && (
                      <button 
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="action-btn edit-btn"
                        title="Edit"
                      >
                        ✎
                      </button>
                    )}
                    <button 
                      onClick={() => deleteTodo(todo.id)}
                      className="action-btn delete-btn"
                      title="Delete"
                    >
                      🗑️
                      
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="footer-actions">
          <div className="stats">
            <span className="stat">
              Total: <strong>{todos.length}</strong>
            </span>
            <span className="stat">
              Done: <strong>{todos.filter(todo => todo.completed).length}</strong>
            </span>
            <span className="stat">
              Left: <strong>{todos.filter(todo => !todo.completed).length}</strong>
            </span>
          </div>
          
          {todos.some(todo => todo.completed) && (
            <button onClick={clearAllCompleted} className="clear-btn">
              Clear Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;