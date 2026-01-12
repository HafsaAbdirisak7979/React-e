import { useRef, useState } from 'react';

const UncontrolledForm = () => {
  // Create refs to access DOM elements
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get values directly from DOM elements
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    
    // Create object with form data
    const formData = {
      name: name,
      email: email,
      timestamp: new Date().toLocaleTimeString()
    };
    
    // Store submitted data
    setSubmittedData(formData);
    
    // Reset form
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
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            ref={nameRef}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="Enter your name"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Value is stored in the DOM, not React state
          </p>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            ref={emailRef}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="Enter your email"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Use <code>ref.current.value</code> to access the value
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Submit Form
        </button>
      </form>

      {/* Display Submitted Data */}
      {submittedData && (
        <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
          <h3 className="text-lg font-semibold text-green-700 mb-3">Submitted Data</h3>
          <div className="bg-white p-4 rounded-lg">
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Submitted at:</strong> {submittedData.timestamp}</p>
          </div>
          <div className="mt-4 text-sm text-green-600">
            <p>✓ Form data came directly from DOM elements</p>
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">How Uncontrolled Form works:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>1. <code>useRef</code> creates references to DOM elements</p>
          <p>2. Inputs are connected via <code>ref</code> attribute</p>
          <p>3. Values are stored in the DOM (browser)</p>
          <p>4. Read values with <code>ref.current.value</code> on submit</p>
          <p>5. No React re-renders during typing</p>
        </div>
      </div>
    </div>
  );
};

export default UncontrolledForm;