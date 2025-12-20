// src/components/AddTodo.jsx
import React, { useState } from 'react';

const AddTodo = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 animate-slide-up">
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-xl border border-primary-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add a new todo...</h2>
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What do you need to do today?"
            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-lg hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTodo;