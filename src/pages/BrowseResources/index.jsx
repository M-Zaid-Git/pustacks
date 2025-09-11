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
    { id: 'books', name: 'Books' },
    { id: 'notes', name: 'Notes' },
    { id: 'papers', name: 'Papers' },
    { id: 'assignments', name: 'Assignments' },
    { id: 'exams', name: 'Exams' },
    { id: 'coding', name: 'Coding Resources' },
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

        <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
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
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/pdfviewer/${material.id}`}
                        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                      >
                        View Material
                      </Link>
                      <a
                        href={material.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Download
                      </a>
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
