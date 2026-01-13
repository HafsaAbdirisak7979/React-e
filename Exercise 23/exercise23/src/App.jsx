import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    experience: "",
    skills: [],
    agreeToTerms: false,
    notifications: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Product Manager"
  ];

  const skillOptions = [
    "React", "JavaScript", "TypeScript", "Node.js",
    "Python", "Java", "UI Design", "API Development"
  ];

  const validateField = (name, value) => {
    let error = "";
    
    if (name === 'fullName') {
      if (!value.trim()) {
        error = "Full name is required";
      } else if (!/^[a-zA-Z\s]{2,30}$/.test(value)) {
        error = "Please enter a valid name (2-30 characters, letters only)";
      }
    }
    
    if (name === 'email') {
      if (!value) {
        error = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Please enter a valid email address";
      }
    }
    
    if (name === 'role') {
      if (!value) {
        error = "Please select a role";
      }
    }
    
    if (name === 'experience') {
      if (!value) {
        error = "Experience is required";
      } else if (isNaN(value) || value < 0 || value > 50) {
        error = "Please enter valid years of experience (0-50)";
      }
    }
    
    if (name === 'skills') {
      if (!value || value.length === 0) {
        error = "Please select at least one skill";
      }
    }
    
    if (name === 'agreeToTerms') {
      if (!value) {
        error = "You must agree to the terms";
      }
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear submission status
    setIsSubmitted(false);
    
    // Show validation immediately when user types/changes value
    const error = validateField(name, newValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSkillChange = (skill) => {
    const newSkills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));

    // Clear submission status
    setIsSubmitted(false);

    // Validate skills immediately
    const error = validateField('skills', newSkills);
    setErrors(prev => ({
      ...prev,
      skills: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const formErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        formErrors[key] = error;
      }
    });

    if (Object.keys(formErrors).length === 0) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          role: "",
          experience: "",
          skills: [],
          agreeToTerms: false,
          notifications: false
        });
        setIsSubmitted(false);
      }, 3000);
    } else {
      setErrors(formErrors);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Application Submitted Successfully!</h3>
                <p className="mt-1 text-sm text-green-600">Thank you for your application. We'll review it shortly.</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">Developer Application Form</h2>
            <p className="mt-2 text-rose-100">Join our team of talented developers</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Grid for first row of inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`mt-1 block w-full rounded-xl border ${
                    errors.fullName
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-rose-500 focus:ring-rose-500'
                  } px-4 py-3 text-base focus:outline-none focus:ring-2 transition-all duration-200`}
                />
                {errors.fullName && (
                  <div className="flex items-center mt-2">
                    <svg className="h-4 w-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-600">{errors.fullName}</p>
                  </div>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`mt-1 block w-full rounded-xl border ${
                    errors.email
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-rose-500 focus:ring-rose-500'
                  } px-4 py-3 text-base focus:outline-none focus:ring-2 transition-all duration-200`}
                />
                {errors.email && (
                  <div className="flex items-center mt-2">
                    <svg className="h-4 w-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-600">{errors.email}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Grid for second row of inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Role Select */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Desired Role
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-xl border ${
                      errors.role
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-rose-500 focus:ring-rose-500'
                    } px-4 py-3 text-base focus:outline-none focus:ring-2 transition-all duration-200 appearance-none bg-white`}
                  >
                    <option value="" className="text-gray-400">Select a role</option>
                    {roles.map(role => (
                      <option key={role} value={role} className="text-gray-700">{role}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.role && (
                  <div className="flex items-center mt-2">
                    <svg className="h-4 w-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-600">{errors.role}</p>
                  </div>
                )}
              </div>

              {/* Experience Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Years of Experience
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                  max="50"
                  placeholder="e.g., 3"
                  className={`mt-1 block w-full rounded-xl border ${
                    errors.experience
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-rose-500 focus:ring-rose-500'
                  } px-4 py-3 text-base focus:outline-none focus:ring-2 transition-all duration-200`}
                />
                {errors.experience && (
                  <div className="flex items-center mt-2">
                    <svg className="h-4 w-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-600">{errors.experience}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Checkboxes */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Skills
                <span className="text-red-500 ml-1">*</span>
                <span className="block text-xs font-normal text-gray-500 mt-1">
                  Select all that apply
                </span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skillOptions.map(skill => (
                  <div
                    key={skill}
                    className={`rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${
                      formData.skills.includes(skill)
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSkillChange(skill)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`h-5 w-5 rounded border flex items-center justify-center ${
                        formData.skills.includes(skill)
                          ? 'bg-rose-500 border-rose-500'
                          : 'bg-white border-gray-300'
                      }`}>
                        {formData.skills.includes(skill) && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        formData.skills.includes(skill) ? 'text-rose-700' : 'text-gray-700'
                      }`}>
                        {skill}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {errors.skills && (
                <div className="flex items-center mt-2">
                  <svg className="h-4 w-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-600">{errors.skills}</p>
                </div>
              )}
            </div>

            {/* Checkboxes Section */}
            <div className="space-y-6 p-6 bg-gray-50 rounded-2xl">
              {/* Terms Checkbox */}
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="h-5 w-5 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-700">
                      I agree to the terms and conditions
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      By checking this box, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
                {errors.agreeToTerms && (
                  <div className="flex items-center ml-8 mt-2">
                    <svg className="h-4 w-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
                  </div>
                )}
              </div>

              {/* Notifications Checkbox */}
              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">
                    Receive notifications about new opportunities
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Stay updated with the latest job openings and company news.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-4 text-base font-semibold text-white shadow-lg hover:from-rose-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Submit Application
                <svg className="inline-block ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <p className="mt-3 text-xs text-center text-gray-500">
                Fields marked with <span className="text-red-500">*</span> are required
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;