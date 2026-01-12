import { useState, useRef } from 'react';

function App() {
  const [activeForm, setActiveForm] = useState('controlled');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            React Forms Practice
          </h1>
          <p className="text-gray-600">
            Learn the difference between Controlled and Uncontrolled components
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-gray-300 p-1 bg-white">
            <button
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeForm === 'controlled'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveForm('controlled')}
            >
              Controlled Form
            </button>
            <button
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeForm === 'uncontrolled'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveForm('uncontrolled')}
            >
              Uncontrolled Form
            </button>
          </div>
        </div>

        {/* Form Display */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          {activeForm === 'controlled' ? <ControlledForm /> : <UncontrolledForm />}
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2">📝 Practice Task:</h3>
          <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
            <li><strong>Controlled Form:</strong> Uses React state to manage inputs</li>
            <li><strong>Uncontrolled Form:</strong> Uses refs to access DOM values</li>
            <li><strong>Submit both forms</strong> to see how data is accessed</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

// CONTROLLED FORM COMPONENT
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name: name,
      email: email,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setSubmittedData(formData);
    setName('');
    setEmail('');
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Controlled Form</h2>
        <p className="text-gray-600">React state manages all input values</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Current value: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{name || 'Empty'}</span>
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Current value: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{email || 'Empty'}</span>
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Submit Form
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Submitted Data</h3>
          <div className="text-sm">
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Time:</strong> {submittedData.timestamp}</p>
          </div>
          <div className="mt-3 text-xs text-blue-600">
            <p>✓ Data accessed from: <code>name</code> and <code>email</code> state variables</p>
          </div>
        </div>
      )}
    </div>
  );
}

// UNCONTROLLED FORM COMPONENT
function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    
    const formData = {
      name: name,
      email: email,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setSubmittedData(formData);
    nameRef.current.value = '';
    emailRef.current.value = '';
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-2">Uncontrolled Form</h2>
        <p className="text-gray-600">DOM manages input values, React uses refs</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            ref={nameRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your name"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Value stored in DOM element
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            ref={emailRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your email"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Access with: <code>ref.current.value</code>
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Submit Form
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Submitted Data</h3>
          <div className="text-sm">
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Time:</strong> {submittedData.timestamp}</p>
          </div>
          <div className="mt-3 text-xs text-green-600">
            <p>✓ Data accessed from: <code>nameRef.current.value</code></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;