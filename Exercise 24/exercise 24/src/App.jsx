import React, { useState, useEffect } from 'react';
import { FaUserGraduate, FaUser, FaEnvelope, FaGraduationCap, FaBook, FaExclamationCircle, FaCheck, FaPaperPlane, FaSpinner, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

function App() {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    gradeLevel: '',
    subjects: {
      mathematics: false,
      science: false,
      english: false
    }
  });

  const [errors, setErrors] = useState({
    studentName: '',
    email: '',
    gradeLevel: '',
    subjects: ''
  });

  const [touched, setTouched] = useState({
    studentName: false,
    email: false,
    gradeLevel: false,
    subjects: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Only letters and spaces allowed';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email (example@domain.com)';
    return '';
  };

  const validateGrade = (grade) => {
    if (!grade) return 'Please select a grade';
    return '';
  };

  const validateSubjects = (subjects) => {
    const selectedSubjects = Object.values(subjects).filter(Boolean);
    if (selectedSubjects.length === 0) return 'Select at least one subject';
    return '';
  };

  // Real-time validation on change
  useEffect(() => {
    if (touched.studentName) {
      setErrors(prev => ({
        ...prev,
        studentName: validateName(formData.studentName)
      }));
    }
  }, [formData.studentName, touched.studentName]);

  useEffect(() => {
    if (touched.email) {
      setErrors(prev => ({
        ...prev,
        email: validateEmail(formData.email)
      }));
    }
  }, [formData.email, touched.email]);

  useEffect(() => {
    if (touched.gradeLevel) {
      setErrors(prev => ({
        ...prev,
        gradeLevel: validateGrade(formData.gradeLevel)
      }));
    }
  }, [formData.gradeLevel, touched.gradeLevel]);

  useEffect(() => {
    if (touched.subjects) {
      setErrors(prev => ({
        ...prev,
        subjects: validateSubjects(formData.subjects)
      }));
    }
  }, [formData.subjects, touched.subjects]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        subjects: {
          ...prev.subjects,
          [value]: checked
        }
      }));
      if (!touched.subjects) {
        setTouched(prev => ({ ...prev, subjects: true }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (!touched[name]) {
        setTouched(prev => ({ ...prev, [name]: true }));
      }
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mark all fields as touched to show all errors
    const allTouched = Object.keys(touched).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validate all fields
    const nameError = validateName(formData.studentName);
    const emailError = validateEmail(formData.email);
    const gradeError = validateGrade(formData.gradeLevel);
    const subjectsError = validateSubjects(formData.subjects);
    
    const newErrors = {
      studentName: nameError,
      email: emailError,
      gradeLevel: gradeError,
      subjects: subjectsError
    };
    
    setErrors(newErrors);
    
    // Check if form is valid
    const isValid = !nameError && !emailError && !gradeError && !subjectsError;
    
    if (isValid) {
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setIsSubmitting(false);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            studentName: '',
            email: '',
            gradeLevel: '',
            subjects: {
              mathematics: false,
              science: false,
              english: false
            }
          });
          setTouched({
            studentName: false,
            email: false,
            gradeLevel: false,
            subjects: false
          });
        }, 3000);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  // Check if at least one subject is selected
  const hasSelectedSubjects = Object.values(formData.subjects).some(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
            <FaUserGraduate className="text-blue-600 text-5xl" />
            Student Registration
          </h1>
          <p className="text-gray-600 text-lg">
            Please fill out all required fields to complete your registration
          </p>
        </div>
        
        {isSubmitted ? (
          /* Success Message */
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center transform transition-all duration-500 animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-5xl text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Thank you for registering. Your information has been submitted.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 text-left">
              <h3 className="font-semibold text-gray-700 mb-4 text-lg">Submitted Information:</h3>
              <div className="space-y-3">
                <p className="text-gray-800">
                  <span className="font-semibold text-gray-700">Name:</span> {formData.studentName}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold text-gray-700">Email:</span> {formData.email}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold text-gray-700">Grade Level:</span> {formData.gradeLevel}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold text-gray-700">Subjects:</span> {
                    Object.entries(formData.subjects)
                      .filter(([_, isSelected]) => isSelected)
                      .map(([subject]) => subject.charAt(0).toUpperCase() + subject.slice(1))
                      .join(', ')
                  }
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form 
            onSubmit={handleSubmit} 
            noValidate
            className="bg-white rounded-2xl shadow-xl p-8 mb-8 space-y-8"
          >
            {/* Student Name Field */}
            <div>
              <label htmlFor="studentName" className="block text-gray-700 font-semibold mb-3 text-lg">
                <span className="flex items-center gap-2">
                  <FaUser className="text-blue-600" />
                  Student Name
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                onBlur={() => handleBlur('studentName')}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.studentName && touched.studentName
                    ? 'border-red-500 focus:ring-red-200 bg-red-50'
                    : !errors.studentName && touched.studentName && formData.studentName
                    ? 'border-green-500 focus:ring-green-200 bg-green-50'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="Enter your full name"
              />
              {errors.studentName && touched.studentName && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <FaExclamationCircle />
                  <span>{errors.studentName}</span>
                </div>
              )}
              {touched.studentName && !errors.studentName && formData.studentName && (
                <div className="flex items-center gap-2 mt-2 text-green-600">
                  <FaCheck />
                  <span>Valid name</span>
                </div>
              )}
            </div>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-3 text-lg">
                <span className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-600" />
                  Email
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.email && touched.email
                    ? 'border-red-500 focus:ring-red-200 bg-red-50'
                    : !errors.email && touched.email && formData.email
                    ? 'border-green-500 focus:ring-green-200 bg-green-50'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="example@domain.com"
              />
              {errors.email && touched.email && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <FaExclamationCircle />
                  <span>{errors.email}</span>
                </div>
              )}
              {touched.email && !errors.email && formData.email && (
                <div className="flex items-center gap-2 mt-2 text-green-600">
                  <FaCheck />
                  <span>Valid email</span>
                </div>
              )}
            </div>
            
            {/* Grade Level Field */}
            <div>
              <label htmlFor="gradeLevel" className="block text-gray-700 font-semibold mb-3 text-lg">
                <span className="flex items-center gap-2">
                  <FaGraduationCap className="text-blue-600" />
                  Grade Level
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                id="gradeLevel"
                name="gradeLevel"
                value={formData.gradeLevel}
                onChange={handleChange}
                onBlur={() => handleBlur('gradeLevel')}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                  errors.gradeLevel && touched.gradeLevel
                    ? 'border-red-500 focus:ring-red-200 bg-red-50'
                    : !errors.gradeLevel && touched.gradeLevel && formData.gradeLevel
                    ? 'border-green-500 focus:ring-green-200 bg-green-50'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
              >
                <option value="">Select Grade</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
              {errors.gradeLevel && touched.gradeLevel && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <FaExclamationCircle />
                  <span>{errors.gradeLevel}</span>
                </div>
              )}
              {touched.gradeLevel && !errors.gradeLevel && formData.gradeLevel && (
                <div className="flex items-center gap-2 mt-2 text-green-600">
                  <FaCheck />
                  <span>Grade selected</span>
                </div>
              )}
            </div>
            
            {/* Subjects Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-lg">
                <span className="flex items-center gap-2">
                  <FaBook className="text-blue-600" />
                  Subjects Interest
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                errors.subjects && touched.subjects
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'mathematics', label: 'Mathematics', value: 'mathematics' },
                    { id: 'science', label: 'Science', value: 'science' },
                    { id: 'english', label: 'English', value: 'english' }
                  ].map((subject) => (
                    <div key={subject.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={subject.id}
                        value={subject.value}
                        checked={formData.subjects[subject.value]}
                        onChange={handleChange}
                        onBlur={() => handleBlur('subjects')}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label htmlFor={subject.id} className="ml-3 text-gray-700 font-medium cursor-pointer">
                        {subject.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {errors.subjects && touched.subjects && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <FaExclamationCircle />
                  <span>{errors.subjects}</span>
                </div>
              )}
              {touched.subjects && !errors.subjects && hasSelectedSubjects && (
                <div className="flex items-center gap-2 mt-2 text-green-600">
                  <FaCheck />
                  <span>{Object.values(formData.subjects).filter(Boolean).length} subject(s) selected</span>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-3 text-lg"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Register
                </>
              )}
            </button>
          </form>
        )}
        
        {/* Form Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="space-y-3">
            <p className="text-gray-700 flex items-center gap-3">
              <FaInfoCircle className="text-blue-600 flex-shrink-0" />
              <span>All fields marked with <span className="text-red-500 font-bold">*</span> are required.</span>
            </p>
            <p className="text-gray-700 flex items-center gap-3">
              <FaCheckCircle className="text-green-600 flex-shrink-0" />
              <span>Validation occurs in real-time as you type/select.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;