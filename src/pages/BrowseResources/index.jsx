import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMaterials } from '../../redux/materialReducer';
import { NavBar, Footer } from '../../components';
import { Link } from 'react-router-dom';
import BackToTop from '../../components/backtotop';

const BrowseResources = () => {
  const dispatch = useDispatch();
  const { materials, isLoading, error } = useSelector((state) => state.material);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'title'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

  // Define categories directly since we're not fetching from Firebase anymore
  const categories = [
    { id: 'programming', name: 'Programming Fundamentals' },
    { id: 'networks', name: 'Computer Networks' },
    { id: 'oop', name: 'Object Oriented Programming' },
    { id: 'ideology', name: 'Ideology' },
    { id: 'physics', name: 'Applied Physics' },
    { id: 'tutorials', name: 'Tutorials' },
    { id: 'presentations', name: 'Presentations' },
    { id: 'other', name: 'Other' },
  ];

  // Fetch materials on component mount
  useEffect(() => {
    dispatch(getAllMaterials());
  }, [dispatch]);

  // Filter and sort materials based on active category and search term
  const filteredMaterials = React.useMemo(() => {
    if (!materials) return [];

    return materials
      .filter((material) => {
        const matchesCategory = activeCategory === 'all' || material.category === activeCategory;
        const matchesSearch =
          (material.title && material.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (material.description && material.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (material.subject && material.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (material.tags && material.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return sortOrder === 'asc'
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === 'title') {
          return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        } else if (sortBy === 'popular') {
          return sortOrder === 'desc'
            ? (b.views || 0) + (b.downloads || 0) - ((a.views || 0) + (a.downloads || 0))
            : (a.views || 0) + (a.downloads || 0) - ((b.views || 0) + (b.downloads || 0));
        }
        return 0;
      });
  }, [materials, activeCategory, searchTerm, sortBy, sortOrder]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-grow container mx-auto px-4 pt-20 md:pt-24 pb-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-2">Study Resources</h1>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Browse through our collection of study materials for all courses
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search Bar */}
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              {/* Category Filter */}
              <div className="w-full md:w-auto">
                <select
                  value={activeCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div className="w-full md:w-auto">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={handleSortChange}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="title-asc">Title (A-Z)</option>
                  <option value="title-desc">Title (Z-A)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Materials List */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
          ) : filteredMaterials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No materials found. Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <div
                  key={material.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded">
                        {categories.find((cat) => cat.id === material.category)?.name || material.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(material.uploadDate)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">{material.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {material.description || 'No description available.'}
                    </p>
                    <div className="flex items-center justify-between space-x-3">
                      <Link
                        to={`/pdfviewer/${material.id}`}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5"
                      >
                        View Material
                      </Link>
                      <button
                        onClick={() => {
                          // Create demo download
                          const demoContent = `# ${
                            material.title || 'Academic Resource'
                          }\n\nThis is a demo file from ZESHO Educational Platform.\nIn a real application, this would be the actual academic resource.\n\nCategory: ${
                            material.category || 'General'
                          }\nType: ${material.type || 'PDF'}`;
                          const blob = new Blob([demoContent], { type: 'text/plain' });
                          const url = window.URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = `${(material.title || 'resource')
                            .replace(/[^a-z0-9]/gi, '_')
                            .toLowerCase()}.txt`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          window.URL.revokeObjectURL(url);
                          alert(`✅ "${material.title || 'Resource'}" downloaded successfully!`);
                        }}
                        className="group inline-flex items-center px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 transition-all duration-200 transform hover:-translate-y-0.5"
                      >
                        <svg
                          className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
      <BackToTop />
    </>
  );
};

export default BrowseResources;
