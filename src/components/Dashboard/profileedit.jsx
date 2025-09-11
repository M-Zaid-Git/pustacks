import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../../redux/userReducer';

const InputField = ({ label, type, placeholder, icon, value, onChange, required = false }) => {
  return (
    <div className="mb-4 w-full">
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: 'var(--text-secondary)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        {label} {required && <span className="text-red-500">*</span>}
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

const ProfileEdit = ({ setEditMode }) => {
  const dispatch = useDispatch();
  const { profile, isLoading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    role: '',
    profileImage: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        institution: profile.institution || '',
        role: profile.role || 'student',
      });
    }
  }, [profile]);

  const handleChange = (field) => (e) => {
    const value = field === 'profileImage' ? e.target.files[0] : e.target.value;

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validate form
    if (!formData.name || !formData.email) {
      setErrorMessage('Name and email are required');
      return;
    }

    // Create form data for file upload
    const updateData = new FormData();
    updateData.append('name', formData.name);
    updateData.append('email', formData.email);
    updateData.append('institution', formData.institution);
    updateData.append('role', formData.role);

    if (formData.profileImage) {
      updateData.append('profileImage', formData.profileImage);
    }

    try {
      const resultAction = await dispatch(updateProfile(updateData));

      if (updateProfile.fulfilled.match(resultAction)) {
        setSuccessMessage('Profile updated successfully');

        // Close edit mode after short delay
        setTimeout(() => {
          if (setEditMode) {
            setEditMode(false);
          }
        }, 2000);
      } else {
        setErrorMessage(resultAction.error.message || 'Failed to update profile');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to update profile');
    }
  };

  if (!profile && !isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load profile. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Edit Profile
          </h2>
          <button
            onClick={() => setEditMode && setEditMode(false)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
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
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-4 border-t-purple-500 animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            {errorMessage && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md mb-4">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-md mb-4">
                {successMessage}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-700 shadow-md relative group">
                <img
                  src={
                    formData.profileImage
                      ? URL.createObjectURL(formData.profileImage)
                      : profile?.profileImage || '/interview.webp'
                  }
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="cursor-pointer p-2 bg-white bg-opacity-25 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <input type="file" accept="image/*" className="hidden" onChange={handleChange('profileImage')} />
                  </label>
                </div>
              </div>

              <div className="flex-grow space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <InputField
                    label="Full Name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange('name')}
                    required
                    icon={
                      <svg
                        className="h-5 w-5 mr-3 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    }
                  />

                  <InputField
                    label="Email Address"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange('email')}
                    required
                    icon={
                      <svg
                        className="h-5 w-5 mr-3 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    }
                  />

                  <InputField
                    label="Institution"
                    type="text"
                    placeholder="Your institution name"
                    value={formData.institution}
                    onChange={handleChange('institution')}
                    icon={
                      <svg
                        className="h-5 w-5 mr-3 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    }
                  />

                  <div className="mb-4 w-full">
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    >
                      Role
                    </label>
                    <div
                      style={{
                        borderRadius: '0.5rem',
                        border: `1px solid var(--input-border)`,
                        transition: 'all 0.3s ease',
                      }}
                      className="flex items-center px-3 py-2 hover:shadow-sm focus-within:shadow-md bg-white dark:bg-slate-800"
                    >
                      <svg
                        className="h-5 w-5 mr-3 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <select
                        style={{
                          backgroundColor: 'transparent',
                          color: 'var(--text-primary)',
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                        }}
                        className="w-full focus:outline-none"
                        value={formData.role}
                        onChange={handleChange('role')}
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="researcher">Researcher</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setEditMode && setEditMode(false)}
                    type="button"
                    className="px-4 py-2 mr-3 rounded-lg text-slate-600 dark:text-slate-300 font-medium bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    style={{ background: 'var(--gradient-purple)' }}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;
