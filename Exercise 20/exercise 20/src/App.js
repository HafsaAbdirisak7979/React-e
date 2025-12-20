// src/App.js
import React, { useState } from 'react';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'hey whtsapp', completed: false },
    { id: 2, text: 'how are yu doing', completed: true },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600">
            My Todo List
          </h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            <AddTodo onAddTodo={addTodo} />

            {/* Todo List */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
                <div className="bg-primary-50 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
                  {completedCount} of {totalCount} completed
                </div>
              </div>

              {todos.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-gray-300 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <p className="text-gray-500">No tasks yet. Add one above!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </div>
              )}

              {/* Delete All Button */}
              {todos.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button
                    onClick={deleteAllTodos}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Delete All Tasks
                  </button>
                </div>
              )}
            </div>

            {/* Comment Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    This is cool right?
                  </h3>
                  <p className="text-gray-700">
                    A beautiful, responsive todo app built with React and Tailwind CSS. 
                    Stay productive and organized with this modern interface.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Sidebar - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Stats & Progress</h2>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Completion Progress</span>
                  <span className="text-sm font-bold text-primary-600">
                    {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                  <div className="text-2xl font-bold text-primary-700">{totalCount}</div>
                  <div className="text-sm text-primary-600">Total Tasks</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="text-2xl font-bold text-green-700">{completedCount}</div>
                  <div className="text-sm text-green-600">Completed</div>
                </div>
              </div>

              {/* Tips */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-medium text-gray-700 mb-4">Productivity Tips</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded mr-3 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">Start with the most important task</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded mr-3 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">Break large tasks into smaller ones</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded mr-3 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">Review your list daily</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with React & Tailwind CSS • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;