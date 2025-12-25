// src/StudentDashboard.jsx
import { useState } from 'react';

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [courseFilter, setCourseFilter] = useState('all'); // 'all', 'in-progress', 'completed'
  const [assignmentFilter, setAssignmentFilter] = useState('all'); // 'all', 'pending', 'completed', 'in-progress'
  const [searchQuery, setSearchQuery] = useState('');
  
  const courses = [
    { id: 1, name: 'React Fundamentals', progress: 75, instructor: 'Sarah Wilson', nextLesson: 'Components & Props', color: 'blue' },
    { id: 2, name: 'JavaScript Advanced', progress: 45, instructor: 'Mike Johnson', nextLesson: 'Async/Await', color: 'purple' },
    { id: 3, name: 'UI/UX Design', progress: 90, instructor: 'Emily Chen', nextLesson: 'Color Theory', color: 'pink' },
    { id: 4, name: 'TypeScript Basics', progress: 30, instructor: 'David Lee', nextLesson: 'Type Annotations', color: 'blue' },
    { id: 5, name: 'Node.js Backend', progress: 100, instructor: 'Alex Brown', nextLesson: 'Course Completed', color: 'green' },
  ];

  const assignments = [
    { id: 1, title: 'Build a Todo App', course: 'React Fundamentals', dueDate: '2024-03-20', status: 'pending' },
    { id: 2, title: 'API Integration', course: 'JavaScript Advanced', dueDate: '2024-03-18', status: 'completed' },
    { id: 3, title: 'Design System', course: 'UI/UX Design', dueDate: '2024-03-25', status: 'in-progress' },
    { id: 4, title: 'Type Annotations Exercise', course: 'TypeScript Basics', dueDate: '2024-03-22', status: 'pending' },
    { id: 5, title: 'REST API Project', course: 'Node.js Backend', dueDate: '2024-03-15', status: 'completed' },
  ];

  const announcements = [
    { id: 1, title: 'New Course Available', message: 'Check out our new TypeScript course!', time: '2 hours ago' },
    { id: 2, title: 'Maintenance Notice', message: 'Platform updates scheduled for tonight', time: '5 hours ago' },
    { id: 3, title: 'Weekend Workshop', message: 'Join our React Hooks workshop this Saturday', time: '1 day ago' },
  ];

  const stats = [
    { label: 'Average Grade', value: '88%', icon: '📊' },
    { label: 'Courses', value: courses.length, icon: '📚' },
    { label: 'Study Hours', value: '45h', icon: '⏰' },
    { label: 'Assignments', value: assignments.length, icon: '✍️' },
  ];

  // Filter courses based on progress
  const filteredCourses = courses.filter(course => {
    if (courseFilter === 'completed') return course.progress === 100;
    if (courseFilter === 'in-progress') return course.progress < 100 && course.progress > 0;
    if (courseFilter === 'not-started') return course.progress === 0;
    return true; // 'all'
  }).filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter assignments based on status
  const filteredAssignments = assignments.filter(assignment => {
    if (assignmentFilter === 'all') return true;
    return assignment.status === assignmentFilter;
  }).filter(assignment => 
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function for progress bar colors
  const getProgressColor = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-500';
      case 'purple': return 'bg-purple-500';
      case 'pink': return 'bg-pink-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  // Get progress status for course
  const getCourseStatus = (progress) => {
    if (progress === 100) return 'Completed';
    if (progress > 0) return 'In Progress';
    return 'Not Started';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Search */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, Student!</h1>
              <p className="text-gray-500">Here's what's happening with your courses today.</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search courses, assignments..."
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  🔔
                </button>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-semibold">
               H
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'courses' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('courses')}
            >
              📚 Courses
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'assignments' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('assignments')}
            >
              📝 Assignments
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-4">{stat.icon}</div>
                <div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Progress Section with Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">Course Progress</h2>
                
                {/* Course Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1 text-xs rounded-full ${courseFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setCourseFilter('all')}
                  >
                    All ({courses.length})
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded-full ${courseFilter === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setCourseFilter('in-progress')}
                  >
                    In Progress ({courses.filter(c => c.progress > 0 && c.progress < 100).length})
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded-full ${courseFilter === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setCourseFilter('completed')}
                  >
                    Completed ({courses.filter(c => c.progress === 100).length})
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded-full ${courseFilter === 'not-started' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setCourseFilter('not-started')}
                  >
                    Not Started ({courses.filter(c => c.progress === 0).length})
                  </button>
                </div>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">📚</div>
                  <p className="text-gray-500">No courses found matching your criteria.</p>
                  <button 
                    onClick={() => { setCourseFilter('all'); setSearchQuery(''); }}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCourses.map(course => (
                    <div key={course.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium text-gray-800">{course.name}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                            {getCourseStatus(course.progress)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-gray-500">{course.progress}%</span>
                          <p className="text-xs text-gray-500">{course.instructor}</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${getProgressColor(course.color)}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-gray-500">Next: {course.nextLesson}</span>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View Details →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Upcoming Assignments with Filter */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Upcoming Assignments</h2>
                
                {/* Assignment Status Filter */}
                <div className="flex gap-1">
                  <select
                    className="text-xs border border-gray-300 rounded-lg px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={assignmentFilter}
                    onChange={(e) => setAssignmentFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {filteredAssignments.length === 0 ? (
                <div className="text-center py-4">
                  <div className="text-gray-400 mb-2">📝</div>
                  <p className="text-gray-500 text-sm">No assignments found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAssignments.map(assignment => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div>
                        <h3 className="font-medium text-gray-800">{assignment.title}</h3>
                        <p className="text-sm text-gray-500">{assignment.course}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            assignment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                          }`}>
                          {assignment.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">Due {assignment.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Announcements</h2>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {announcements.length} new
                </span>
              </div>
              <div className="space-y-4">
                {announcements.map(announcement => (
                  <div key={announcement.id} className="border-l-4 border-blue-500 pl-4 hover:bg-gray-50 p-2 rounded-r-lg transition-colors">
                    <h3 className="font-medium text-gray-800">{announcement.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{announcement.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{announcement.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="font-semibold mb-4">📈 Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Courses</span>
                  <span className="font-bold">{courses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assignments Due</span>
                  <span className="font-bold">{assignments.filter(a => a.status === 'pending').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Progress</span>
                  <span className="font-bold">
                    {Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)}%
                  </span>
                </div>
              </div>
              <button className="w-full mt-4 bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                View Full Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;