import React, { useState, useEffect } from 'react';
import { categoriesAPI } from '../../services/apiService';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoriesAPI.getCategories();
      setCategories(response.categories || []);
    } catch (error) {
      console.error('Error loading categories:', error);
      // Fallback to static categories if API fails
      setCategories([
        {
          id: 1,
          name: 'Programming & Computer Science',
          icon: '💻',
          description: 'Code, algorithms, software development resources',
          materialCount: 0,
          color: 'from-blue-500 to-cyan-500',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          subjects: ['Programming', 'Data Structures', 'Algorithms', 'Software Engineering', 'Web Development']
        },
        {
          id: 2,
          name: 'Mathematics',
          icon: '📐',
          description: 'Math concepts, formulas, problem sets',
          materialCount: 0,
          color: 'from-green-500 to-emerald-500',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          subjects: ['Calculus', 'Linear Algebra', 'Statistics', 'Discrete Math', 'Probability']
        },
        {
          id: 3,
          name: 'Science & Engineering',
          icon: '🔬',
          description: 'Physics, chemistry, biology, engineering materials',
          materialCount: 0,
          color: 'from-purple-500 to-pink-500',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          subjects: ['Physics', 'Chemistry', 'Biology', 'Engineering', 'Research']
        },
        {
          id: 4,
          name: 'Business & Economics',
          icon: '📊',
          description: 'Business cases, economic theories, market analysis',
          materialCount: 0,
          color: 'from-orange-500 to-red-500',
          bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          subjects: ['Management', 'Finance', 'Marketing', 'Entrepreneurship', 'Economics']
        },
        {
          id: 5,
          name: 'Literature & Humanities',
          icon: '📚',
          description: 'Books, essays, historical documents',
          materialCount: 0,
          color: 'from-indigo-500 to-blue-500',
          bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
          subjects: ['Literature', 'History', 'Philosophy', 'Languages', 'Arts']
        },
        {
          id: 6,
          name: 'Research Papers',
          icon: '�',
          description: 'Academic papers, thesis, research documents',
          materialCount: 0,
          color: 'from-yellow-500 to-orange-500',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          subjects: ['Research', 'Academic Papers', 'Thesis', 'Publications', 'Studies']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10 dark:from-violet-600/20 dark:to-purple-600/20"></div>
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Explore Categories
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Discover educational resources organized by subject areas. Find exactly what you need to excel in your studies.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 text-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-gray-200 dark:border-slate-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className={`floating-card group cursor-pointer transform hover:scale-105 transition-all duration-300 ${category.bgColor} border border-gray-200/50 dark:border-slate-700/50`}
                onClick={() => setSelectedCategory(category)}
              >
                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {category.materialCount || 0} resources
                    </span>
                    <div className="w-8 h-8 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-900/50 transition-colors duration-300">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No categories found</h3>
              <p className="text-gray-600 dark:text-gray-300">Try adjusting your search terms or browse all categories.</p>
            </div>
          )}
        </div>
      </div>

      {/* Popular Subjects Section */}
      <div className="py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Popular Subjects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Most searched and studied subjects on our platform.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {['Programming', 'Calculus', 'Physics', 'Organic Chemistry', 'Data Structures', 'Linear Algebra', 'Machine Learning', 'Statistics', 'Web Development', 'Algorithms'].map((subject, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 text-violet-700 dark:text-violet-300 rounded-full font-medium hover:from-violet-200 hover:to-purple-200 dark:hover:from-violet-800/50 dark:hover:to-purple-800/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden p-12 text-center bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-3xl shadow-2xl">
            {/* Gradient Overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 to-purple-600/90 rounded-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Can't Find Your Subject?
              </h2>
              <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
                We're constantly adding new categories and subjects. Request your topic and help us expand our library.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-secondary px-8 py-4 !bg-white !text-violet-700 hover:bg-gray-100 font-semibold shadow-lg">
                  Request Subject
                </button>
                <button className="btn-primary px-8 py-4 bg-violet-700 hover:bg-violet-800 border border-violet-500 !text-white font-semibold shadow-lg">
                  Browse All Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Category Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="floating-card max-w-2xl w-full p-8 bg-white dark:bg-slate-800 rounded-3xl">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${selectedCategory.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl">{selectedCategory.icon}</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedCategory.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedCategory.resourceCount} resources available</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedCategory.description}</p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Popular Subjects:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCategory.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="btn-primary flex-1 py-3 !text-white">
                Browse Resources
              </button>
              <button className="btn-secondary flex-1 py-3 !text-violet-600 hover:!text-violet-700">
                Subscribe to Updates
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
