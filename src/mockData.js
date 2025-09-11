// mockData.js - Mock data to replace backend functionality
// This file provides static data for the website to function without a backend

export const categories = [
  {
    id: 'books',
    name: 'Books',
    icon: 'book',
    description: 'Academic books for all courses',
    imageSrc: '/education.webp',
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: 'note',
    description: 'Class notes and handouts',
    imageSrc: '/data-structure.webp',
  },
  {
    id: 'papers',
    name: 'Previous Papers',
    icon: 'paper',
    description: 'Past exam papers and solutions',
    imageSrc: '/test.webp',
  },
  {
    id: 'interviews',
    name: 'Interview Preparation',
    icon: 'interview',
    description: 'Resources for job interviews',
    imageSrc: '/interview.webp',
  },
  {
    id: 'coding',
    name: 'Coding Resources',
    icon: 'code',
    description: 'Programming tutorials and examples',
    imageSrc: '/coding.webp',
  },
];

export const materials = [
  {
    id: 'material-1',
    title: 'Introduction to Computer Science',
    description: 'A comprehensive guide to CS fundamentals',
    category: 'books',
    fileName: 'intro_cs.pdf',
    fileUrl: '/2.2_Scales.pdf',
    storagePath: 'materials/intro_cs.pdf',
    uploadDate: '2023-09-15',
    uploadedBy: 'admin',
    viewCount: 328,
    downloadCount: 145,
    bookmarked: false,
  },
  {
    id: 'material-2',
    title: 'Data Structures Notes',
    description: 'Complete semester notes for Data Structures course',
    category: 'notes',
    fileName: 'data_structures.pdf',
    fileUrl: '/2.2_Scales.pdf',
    storagePath: 'materials/data_structures.pdf',
    uploadDate: '2023-08-22',
    uploadedBy: 'admin',
    viewCount: 412,
    downloadCount: 201,
    bookmarked: true,
  },
  {
    id: 'material-3',
    title: 'Algorithm Design Examples',
    description: 'Examples of efficient algorithm design patterns',
    category: 'coding',
    fileName: 'algorithm_design.pdf',
    fileUrl: '/2.2_Scales.pdf',
    storagePath: 'materials/algorithm_design.pdf',
    uploadDate: '2023-09-05',
    uploadedBy: 'admin',
    viewCount: 256,
    downloadCount: 112,
    bookmarked: false,
  },
  {
    id: 'material-4',
    title: 'Interview Questions for Software Engineers',
    description: 'Common interview questions and answers for SE positions',
    category: 'interviews',
    fileName: 'se_interview.pdf',
    fileUrl: '/2.2_Scales.pdf',
    storagePath: 'materials/se_interview.pdf',
    uploadDate: '2023-07-18',
    uploadedBy: 'admin',
    viewCount: 521,
    downloadCount: 318,
    bookmarked: true,
  },
  {
    id: 'material-5',
    title: 'Calculus Final Exam 2023',
    description: 'Previous year final exam paper for Calculus',
    category: 'papers',
    fileName: 'calculus_final_2023.pdf',
    fileUrl: '/2.2_Scales.pdf',
    storagePath: 'materials/calculus_final_2023.pdf',
    uploadDate: '2023-06-10',
    uploadedBy: 'admin',
    viewCount: 389,
    downloadCount: 275,
    bookmarked: false,
  },
];

export const users = [
  {
    id: 'user-1',
    email: 'demo@example.com',
    name: 'Demo User',
    role: 'user',
    photoURL: null,
    bookmarks: ['material-2', 'material-4'],
    downloads: ['material-1', 'material-2', 'material-4'],
    uploads: ['material-3'],
  },
];

// Mock authentication state
let currentUser = null;

export const mockAuth = {
  // Authentication methods
  signIn: (email, password) => {
    const user = users.find((user) => user.email === email);
    if (user && password === 'demo') {
      currentUser = { ...user, uid: user.id };
      localStorage.setItem('mockUser', JSON.stringify(currentUser));
      return Promise.resolve(currentUser);
    }
    return Promise.reject(new Error('Invalid email or password'));
  },

  signUp: (email, password, name) => {
    const newUser = {
      id: `user-${users.length + 1}`,
      email,
      name,
      role: 'user',
      photoURL: null,
      bookmarks: [],
      downloads: [],
      uploads: [],
    };
    users.push(newUser);
    currentUser = { ...newUser, uid: newUser.id };
    localStorage.setItem('mockUser', JSON.stringify(currentUser));
    return Promise.resolve(currentUser);
  },

  signOut: () => {
    currentUser = null;
    localStorage.removeItem('mockUser');
    return Promise.resolve();
  },

  getCurrentUser: () => {
    if (!currentUser) {
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        currentUser = JSON.parse(storedUser);
      }
    }
    return currentUser;
  },

  resetPassword: (email) => {
    return Promise.resolve();
  },

  updateProfile: (user, data) => {
    const userIndex = users.findIndex((u) => u.id === user.uid);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...data };
      currentUser = { ...users[userIndex], uid: users[userIndex].id };
      localStorage.setItem('mockUser', JSON.stringify(currentUser));
    }
    return Promise.resolve(currentUser);
  },
};

// Mock data functions
export const mockDataFunctions = {
  // Categories
  getCategories: () => Promise.resolve(categories),

  // Materials
  getMaterials: () => Promise.resolve(materials),
  getMaterialsByCategory: (category) => Promise.resolve(materials.filter((m) => m.category === category)),
  getMaterial: (id) => Promise.resolve(materials.find((m) => m.id === id)),
  searchMaterials: (query) => {
    const lowerQuery = query.toLowerCase();
    return Promise.resolve(
      materials.filter(
        (m) => m.title.toLowerCase().includes(lowerQuery) || m.description.toLowerCase().includes(lowerQuery)
      )
    );
  },

  // User-specific data
  getUserBookmarks: (userId) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return Promise.resolve([]);
    return Promise.resolve(materials.filter((m) => user.bookmarks.includes(m.id)));
  },

  getUserDownloads: (userId) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return Promise.resolve([]);
    return Promise.resolve(materials.filter((m) => user.downloads.includes(m.id)));
  },

  getUserUploads: (userId) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return Promise.resolve([]);
    return Promise.resolve(materials.filter((m) => user.uploads.includes(m.id)));
  },

  // Actions
  addBookmark: (userId, materialId) => {
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1 && !users[userIndex].bookmarks.includes(materialId)) {
      users[userIndex].bookmarks.push(materialId);
      if (currentUser && currentUser.uid === userId) {
        currentUser = { ...users[userIndex], uid: users[userIndex].id };
        localStorage.setItem('mockUser', JSON.stringify(currentUser));
      }
    }
    return Promise.resolve();
  },

  removeBookmark: (userId, materialId) => {
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].bookmarks = users[userIndex].bookmarks.filter((id) => id !== materialId);
      if (currentUser && currentUser.uid === userId) {
        currentUser = { ...users[userIndex], uid: users[userIndex].id };
        localStorage.setItem('mockUser', JSON.stringify(currentUser));
      }
    }
    return Promise.resolve();
  },

  addDownload: (userId, materialId) => {
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1 && !users[userIndex].downloads.includes(materialId)) {
      users[userIndex].downloads.push(materialId);

      // Update material's download count
      const materialIndex = materials.findIndex((m) => m.id === materialId);
      if (materialIndex !== -1) {
        materials[materialIndex].downloadCount += 1;
      }

      if (currentUser && currentUser.uid === userId) {
        currentUser = { ...users[userIndex], uid: users[userIndex].id };
        localStorage.setItem('mockUser', JSON.stringify(currentUser));
      }
    }
    return Promise.resolve();
  },
};
