import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const MaterialsPage = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [materials, setMaterials] = useState([]);

  // Load materials from localStorage (admin uploads) on component mount
  useEffect(() => {
    // Get search parameter from URL if it exists
    const urlSearch = searchParams.get('search');
    const urlCategory = searchParams.get('category');

    if (urlSearch) {
      setSearchTerm(urlSearch);
    }

    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }

    const storedMaterials = JSON.parse(localStorage.getItem('zesho-materials') || '[]');

    // If no admin materials exist, show some sample materials
    if (storedMaterials.length === 0) {
      const sampleMaterials = [
        {
          id: 1,
          title: 'Advanced Data Structures and Algorithms',
          description: 'Comprehensive guide covering trees, graphs, dynamic programming, and optimization techniques.',
          category: 'Computer Science',
          author: 'Dr. Sarah Johnson',
          university: 'MIT',
          uploadDate: '2024-03-15',
          downloads: 1247,
          rating: 4.8,
          type: 'PDF',
          size: '15.2 MB',
          tags: ['Algorithms', 'Data Structures', 'Programming'],
          thumbnail: '📊',
        },
        {
          id: 2,
          title: 'Calculus I Complete Notes',
          description: 'Full semester notes covering limits, derivatives, integrals, and applications.',
          category: 'Mathematics',
          author: 'Prof. Michael Chen',
          university: 'Stanford',
          uploadDate: '2024-03-12',
          downloads: 892,
          rating: 4.9,
          type: 'PDF',
          size: '23.5 MB',
          tags: ['Calculus', 'Mathematics', 'Derivatives'],
          thumbnail: '📐',
        },
        {
          id: 3,
          title: 'Quantum Physics Laboratory Manual',
          description: 'Practical experiments and theoretical background for quantum mechanics lab.',
          category: 'Physics',
          author: 'Dr. Elena Rodriguez',
          university: 'Caltech',
          uploadDate: '2024-03-10',
          downloads: 634,
          rating: 4.7,
          type: 'PDF',
          size: '18.7 MB',
          tags: ['Quantum Physics', 'Laboratory', 'Experiments'],
          thumbnail: '⚛️',
        },
      ];
      setMaterials(sampleMaterials);
    } else {
      setMaterials(storedMaterials);
    }
  }, [searchParams]); // Added searchParams dependency

  // Handle material download
  const handleDownload = (materialId) => {
    const material = materials.find((m) => m.id === materialId);

    // Increment download count
    const updatedMaterials = materials.map((mat) => {
      if (mat.id === materialId) {
        return { ...mat, downloads: mat.downloads + 1 };
      }
      return mat;
    });

    setMaterials(updatedMaterials);

    // Update localStorage
    localStorage.setItem('zesho-materials', JSON.stringify(updatedMaterials));

    // Create a demo download for demonstration
    const demoContent = `
# ${material.title}

**Author:** ${material.author}
**University:** ${material.university}
**Category:** ${material.category}
**Upload Date:** ${material.uploadDate}

## Description
${material.description}

## Tags
${material.tags.join(', ')}

---
This is a demo file from ZESHO Educational Platform.
In a real application, this would be the actual academic resource.
    `;

    // Create and trigger download
    const blob = new Blob([demoContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${material.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Show success notification
    alert(`✅ "${material.title}" downloaded successfully!`);
  };

  const categories = [
    'all',
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Business',
    'Engineering',
    'Biology',
    'Academics',
    'Competitive Exams',
  ];

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedMaterials = filteredMaterials.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <NavBar />

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 md:pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10 dark:from-violet-600/20 dark:to-purple-600/20"></div>
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Browse Resources</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Discover thousands of educational materials shared by students and educators worldwide.
            </p>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="floating-card p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search Bar */}
                  <div className="md:col-span-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search materials, topics, or keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full py-3 px-4 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="py-2 px-3 bg-gray-100 dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="newest">Newest First</option>
                      <option value="popular">Most Downloaded</option>
                      <option value="rating">Highest Rated</option>
                      <option value="title">Title A-Z</option>
                    </select>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {sortedMaterials.length} resources found
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedMaterials.map((material) => (
              <div key={material.id} className="floating-card group hover:scale-105 transition-all duration-300">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                        {material.thumbnail}
                      </div>
                      <div>
                        <span className="text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 px-2 py-1 rounded-full">
                          {material.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-yellow-500 mb-1">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm font-medium ml-1">{material.rating}</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{material.downloads} downloads</div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                    {material.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{material.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {material.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div>
                      <div className="font-medium">{material.author}</div>
                      <div>{material.university}</div>
                    </div>
                    <div className="text-right">
                      <div>
                        {material.type} • {material.size}
                      </div>
                      <div>{new Date(material.uploadDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDownload(material.id)}
                      className="group relative flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <svg className="w-4 h-4 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="relative z-10">Download</span>
                    </button>
                    <button className="group p-3 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transform hover:-translate-y-0.5 transition-all duration-200">
                      <svg
                        className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedMaterials.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No materials found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Try adjusting your search terms or browse different categories.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="btn-primary px-8 py-3"
              >
                Show All Materials
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden p-12 text-center bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-3xl shadow-2xl">
            {/* Gradient Overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 to-purple-600/90 rounded-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6 text-white">Explore More Resources</h2>
              <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
                Discover high-quality educational materials shared by verified contributors in our growing academic
                library.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/categories">
                  <button className="btn-secondary px-8 py-4 bg-white !text-violet-700 hover:bg-gray-100 hover:!text-violet-800 font-semibold shadow-lg">
                    Browse Categories
                  </button>
                </Link>
                <Link to="/about">
                  <button className="btn-primary px-8 py-4 bg-violet-700 hover:bg-violet-800 border border-violet-500 !text-white font-semibold shadow-lg">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MaterialsPage;
