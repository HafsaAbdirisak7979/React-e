// src/components/TodoItem.jsx
import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 mb-3 animate-fade-in">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex items-center justify-center w-5 h-5 rounded border-2 ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-primary-500'} transition-colors duration-200`}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </button>
        
        <div className="flex-1">
          <p className={`text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </p>
          <span className={`text-xs px-2 py-0.5 rounded-full ${todo.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
            {todo.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
      </div>
      
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
        aria-label="Delete todo"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;