import { useState } from 'react';

const ControlledForm = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create object with current state values
    const formData = {
      name: name,
      email: email,
      timestamp: new Date().toLocaleTimeString()
    };
    
    // Store submitted data
    setSubmittedData(formData);
    
    // Reset form
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
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter your name"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Current value: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{name || 'Empty'}</span>
          </p>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter your email"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Current value: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{email || 'Empty'}</span>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Submit Form
        </button>
      </form>

      {/* Display Submitted Data */}
      {submittedData && (
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Submitted Data</h3>
          <div className="bg-white p-4 rounded-lg">
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Submitted at:</strong> {submittedData.timestamp}</p>
          </div>
          <div className="mt-4 text-sm text-blue-600">
            <p>✓ Form data came from React state variables</p>
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">How Controlled Form works:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>1. <code>useState</code> stores input values in React state</p>
          <p>2. <code>value</code> prop connects input to state</p>
          <p>3. <code>onChange</code> updates state on every keystroke</p>
          <p>4. State is the "single source of truth"</p>
          <p>5. React re-renders component on every change</p>
        </div>
      </div>
    </div>
  );
};

export default ControlledForm;