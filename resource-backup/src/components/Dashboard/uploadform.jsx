import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { uploadMaterial } from '../../redux/materialReducer';

// List of available categories
const categories = [
  'Academic Notes',
  'Research Paper',
  'Case Study',
  'Project Report',
  'Tutorial',
  'Exam Preparation',
  'Assignment',
  'Lecture Slides',
  'Course Material',
  'Reference Book',
  'Lab Report',
  'Practice Questions',
];

// List of subjects
const subjects = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Engineering',
  'Business',
  'Economics',
  'History',
  'Literature',
  'Psychology',
  'Sociology',
];

const InputField = ({ label, type, placeholder, icon, accept, multiple, value, onChange }) => {
  return (
    <div className="mb-4 w-full">
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: 'var(--text-secondary)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        {label}
      </label>
      <div
        style={{
          borderRadius: '0.5rem',
          border: `1px solid var(--input-border)`,
          transition: 'all 0.3s ease',
        }}
        className="flex items-center px-3 py-2 hover:shadow-sm focus-within:shadow-md bg-white dark:bg-slate-800"
      >
        {icon}
        {type === 'textarea' ? (
          <textarea
            style={{
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
            className="w-full focus:outline-none min-h-[100px] resize-none"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        ) : type === 'file' ? (
          <input
            type="file"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
            className="w-full focus:outline-none file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-50 file:text-purple-700
              hover:file:bg-purple-100"
            accept={accept}
            multiple={multiple}
            onChange={onChange}
          />
        ) : type === 'select' ? (
          <select
            style={{
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
            className="w-full focus:outline-none"
            value={value}
            onChange={onChange}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            style={{
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
            className="w-full focus:outline-none"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

const Upload = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.material);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subject: '',
    tags: '',
    visibility: 'public',
    file: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field) => (e) => {
    const value = field === 'file' ? e.target.files[0] : e.target.value;

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.title || !formData.description || !formData.category || !formData.subject || !formData.file) {
      setErrorMessage('Please fill all required fields');
      return;
    }

    // Create form data for file upload
    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('description', formData.description);
    uploadData.append('category', formData.category);
    uploadData.append('subject', formData.subject);
    uploadData.append('tags', formData.tags);
    uploadData.append('visibility', formData.visibility);
    uploadData.append('file', formData.file);

    try {
      const resultAction = await dispatch(uploadMaterial(uploadData));

      if (uploadMaterial.fulfilled.match(resultAction)) {
        setSubmitted(true);

        // Reset form after successful submission
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            title: '',
            description: '',
            category: '',
            subject: '',
            tags: '',
            visibility: 'public',
            file: null,
          });
          if (setOpen) setOpen(false);
        }, 3000);
      } else {
        setErrorMessage(resultAction.error.message || 'Upload failed');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Upload failed');
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full max-w-3xl overflow-hidden border border-slate-100 dark:border-slate-700 relative">
        <button
          onClick={() => setOpen && setOpen(false)}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors z-50"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5 text-slate-500 dark:text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="p-6">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              background: 'var(--gradient-mixed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Upload Resource
          </h2>

          {submitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Upload Successful!</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                Your resource has been uploaded and is now available for others to access.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              {errorMessage && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md mb-4">
                  {errorMessage}
                </div>
              )}

              <InputField
                label="Title *"
                type="text"
                placeholder="Enter the title of your resource"
                value={formData.title}
                onChange={handleChange('title')}
                icon={
                  <svg className="h-5 w-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                }
              />

              <InputField
                label="Description *"
                type="textarea"
                placeholder="Provide a brief description of your resource"
                value={formData.description}
                onChange={handleChange('description')}
                icon={
                  <svg className="h-5 w-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                }
              />

              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="File Upload *"
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.zip"
                  multiple={false}
                  onChange={handleChange('file')}
                  icon={
                    <svg className="h-5 w-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Category *"
                  type="select"
                  value={formData.category}
                  onChange={handleChange('category')}
                  icon={
                    <svg className="h-5 w-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  }
                />

                <div className="mb-4 w-full">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Subject *
                  </label>
                  <div
                    style={{
                      borderRadius: '0.5rem',
                      border: `1px solid var(--input-border)`,
                      transition: 'all 0.3s ease',
                    }}
                    className="flex items-center px-3 py-2 hover:shadow-sm focus-within:shadow-md bg-white dark:bg-slate-800"
                  >
                    <svg className="h-5 w-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.775-2.754-1.253-4.5-1.253-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <select
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--text-primary)',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                      }}
                      className="w-full focus:outline-none"
                      value={formData.subject}
                      onChange={handleChange('subject')}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Tags (comma separated)"
                  type="text"
                  placeholder="e.g. calculus, math, advanced"
                  value={formData.tags}
                  onChange={handleChange('tags')}
                  icon={
                    <svg className="h-5 w-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  }
                />

                <div className="mb-4 w-full">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Visibility
                  </label>
                  <div
                    style={{
                      borderRadius: '0.5rem',
                      border: `1px solid var(--input-border)`,
                      transition: 'all 0.3s ease',
                    }}
                    className="flex items-center px-3 py-2 hover:shadow-sm focus-within:shadow-md bg-white dark:bg-slate-800"
                  >
                    <svg className="h-5 w-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <select
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--text-primary)',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                      }}
                      className="w-full focus:outline-none"
                      value={formData.visibility}
                      onChange={handleChange('visibility')}
                    >
                      <option value="public">Public - Everyone can view</option>
                      <option value="private">Private - Only you can view</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <p className="text-xs text-slate-500 dark:text-slate-400">* Required fields</p>

                {isLoading ? (
                  <div className="flex items-center justify-center h-12">
                    <div className="w-28 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                        style={{
                          width: '80%',
                          animation: 'pulse 2s ease-in-out infinite',
                        }}
                      ></div>
                    </div>
                    <style jsx>{`
                      @keyframes pulse {
                        0%,
                        100% {
                          opacity: 0.3;
                          transform: scaleX(0.8);
                        }
                        50% {
                          opacity: 1;
                          transform: scaleX(1);
                        }
                      }
                    `}</style>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    style={{
                      background: 'var(--gradient-purple)',
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    Upload Resource
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
