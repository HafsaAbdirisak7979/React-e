import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'hey whtsapp', completed: false },
    { id: 2, text: 'how are yu doing', completed: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showDeleteAll, setShowDeleteAll] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo = { 
      id: Date.now(), 
      text: inputValue, 
      completed: false 
    };
    setTodos([newTodo, ...todos]);
    setInputValue('');
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
    setShowDeleteAll(false);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            My Todo List
          </h1>
          <p className="text-gray-600">Stay organized and get things done</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Todo Section */}
          <div className="lg:col-span-2">
            {/* Add Todo Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Add a new todo...
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What needs to be done?"
                    className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all transform hover:-translate-y-0.5"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>

            {/* Todo List */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
                <div className="text-sm text-gray-500">
                  {completedCount} of {totalCount} completed
                </div>
              </div>

              <div className="space-y-4">
                {todos.map(todo => (
                  <div
                    key={todo.id}
                    className={`flex items-center p-4 rounded-xl border transition-all duration-300 ${
                      todo.completed 
                        ? 'bg-green-50 border-green-100' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex items-center justify-center w-6 h-6 rounded-lg border-2 mr-4 ${
                        todo.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-400 hover:border-indigo-500'
                      } transition-colors`}
                    >
                      {todo.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </button>
                    
                    <span className={`flex-1 text-lg ${
                      todo.completed 
                        ? 'text-gray-500 line-through' 
                        : 'text-gray-800'
                    }`}>
                      {todo.text}
                    </span>
                    
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="ml-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {todos.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-300 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <p className="text-gray-500">No todos yet. Add one above!</p>
                </div>
              )}

              {/* Delete All Button */}
              {todos.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setShowDeleteAll(true)}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all transform hover:-translate-y-0.5"
                  >
                    Delete All
                  </button>
                </div>
              )}
            </div>

            {/* Comment Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    This is cool right?
                  </h3>
                  <p className="text-gray-700">
                    A beautifully designed todo app to help you stay productive and organized.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Stats</h2>
              
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Progress</span>
                  <span className="text-sm font-bold text-indigo-600">
                    {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-indigo-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-indigo-700">{totalCount}</div>
                  <div className="text-sm text-indigo-600">Total</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-green-700">{completedCount}</div>
                  <div className="text-sm text-green-600">Done</div>
                </div>
              </div>

              {/* Tips */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-medium text-gray-700 mb-4">Tips</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>Start with important tasks</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>Break tasks into steps</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>Review daily</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteAll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete All Tasks?
              </h3>
              <p className="text-gray-600 mb-6">
                This will permanently delete all {totalCount} tasks. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteAll(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteAllTodos}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-xl hover:opacity-90 transition-colors"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;