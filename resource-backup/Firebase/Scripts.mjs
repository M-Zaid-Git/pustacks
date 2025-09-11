import { auth, db, firebaseConfig } from './ClientApp.mjs';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

// Utility function for uploading PDF files
const uploadPdfFile = async (file) => {
  try {
    const fileName = `${file.name}`;
    const storageRef = ref(storage, 'Pdfs/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress}%`);
        },
        (error) => {
          console.error('Error uploading file:', error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const fileId = doc(collection(firestore, 'files')).id;

            await setDoc(doc(firestore, 'files', fileId), {
              name: file.name,
              downloadURL: downloadURL,
              storagePath: uploadTask.snapshot.ref.fullPath,
              uploadDate: new Date(),
              dec: '',
              mat_type: '',
              pages: '',
            });

            resolve({ fileId, downloadURL });
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error in uploadPdfFile:', error);
    throw error;
  }
};

// Utility function for uploading image files
const uploadImageFile = async (file) => {
  try {
    const fileName = `${file.name}`;
    const storageRef = ref(storage, 'images/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress}%`);
        },
        (error) => {
          console.error('Error uploading file:', error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const fileId = doc(collection(firestore, 'files')).id;

            await setDoc(doc(firestore, 'files', fileId), {
              name: file.name,
              downloadURL: downloadURL,
              storagePath: uploadTask.snapshot.ref.fullPath,
              uploadDate: new Date(),
              dec: '',
              mat_type: '',
              pages: '',
            });

            resolve({ fileId, downloadURL });
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error in uploadImageFile:', error);
    throw error;
  }
};

// Utility function for fetching item details
const fetchItem = async (itemId) => {
  try {
    const itemDocRef = doc(firestore, 'files', itemId);
    const itemDocSnap = await getDoc(itemDocRef);

    if (itemDocSnap.exists()) {
      const itemDetails = itemDocSnap.data();

      let downloadURL = itemDetails.downloadURL;
      if (!downloadURL && itemDetails.filename) {
        const fileRef = ref(storage, 'files/' + itemDetails.filename);
        downloadURL = await getDownloadURL(fileRef);
      }

      return { ...itemDetails, downloadURL };
    } else {
      console.log('Item does not exist.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};

// Sample categories for educational materials
const categories = [
  { id: 'books', name: 'Books', icon: 'book', description: 'Academic books for all courses' },
  { id: 'notes', name: 'Notes', icon: 'note', description: 'Class notes and handouts' },
  { id: 'papers', name: 'Previous Papers', icon: 'paper', description: 'Past exam papers and solutions' },
  { id: 'interviews', name: 'Interview Preparation', icon: 'interview', description: 'Resources for job interviews' },
  { id: 'coding', name: 'Coding Resources', icon: 'code', description: 'Programming tutorials and examples' },
];

// Sample materials (initial seed data)
const sampleMaterials = [
  {
    title: 'Introduction to Computer Science',
    description: 'A comprehensive guide to CS fundamentals',
    category: 'books',
    fileName: 'intro_cs.pdf',
    fileUrl: 'https://example.com/sample.pdf', // Replace with actual URL
    storagePath: 'materials/intro_cs.pdf',
    uploadDate: new Date(),
    uploadedBy: 'admin',
  },
  {
    title: 'Data Structures Notes',
    description: 'Complete semester notes for Data Structures course',
    category: 'notes',
    fileName: 'data_structures.pdf',
    fileUrl: 'https://example.com/sample2.pdf', // Replace with actual URL
    storagePath: 'materials/data_structures.pdf',
    uploadDate: new Date(),
    uploadedBy: 'admin',
  },
];

// Function to set up initial data
const setupInitialData = async () => {
  try {
    // Check if categories already exist
    const categoriesCollection = collection(firestore, 'categories');
    const categoriesSnapshot = await getDocs(categoriesCollection);

    if (categoriesSnapshot.empty) {
      console.log('Setting up initial categories...');

      // Add categories
      for (const category of categories) {
        await setDoc(doc(firestore, 'categories', category.id), category);
      }

      console.log('Categories added successfully!');
    }

    // Check if materials already exist
    const materialsCollection = collection(firestore, 'materials');
    const materialsSnapshot = await getDocs(materialsCollection);

    if (materialsSnapshot.empty) {
      console.log('Setting up sample materials...');

      // Add sample materials
      for (const material of sampleMaterials) {
        await addDoc(collection(firestore, 'materials'), material);
      }

      console.log('Sample materials added successfully!');
    }

    return { success: true };
  } catch (error) {
    console.error('Error setting up initial data:', error);
    return { success: false, error };
  }
};

// Function to verify and create admin user
const verifyAdmin = async () => {
  // Get admin email from environment or use a default
  // We use try/catch because import.meta.env might not be available in .mjs files outside Vite context
  let adminEmail;
  try {
    adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  } catch (error) {
    // Fallback to a default admin email
    adminEmail = process.env.VITE_ADMIN_EMAIL || 'admin@example.com';
    console.warn('Using fallback admin email. Set VITE_ADMIN_EMAIL in your environment variables.');
  }

  // Check if admin email is set
  if (!adminEmail) {
    console.error('Admin email not set in environment variables');
    return { success: false, error: 'Admin email not configured' };
  }

  try {
    // Check if user exists in users collection
    const usersCollection = collection(firestore, 'users');
    const usersSnapshot = await getDocs(usersCollection);

    let adminExists = false;
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.email === adminEmail && userData.isAdmin) {
        adminExists = true;
      }
    });

    // If admin doesn't exist, create entry
    if (!adminExists) {
      await setDoc(doc(firestore, 'users', 'admin'), {
        email: adminEmail,
        isAdmin: true,
        role: 'admin',
        createdAt: new Date(),
      });
      console.log('Admin user created in database');
    }

    return { success: true };
  } catch (error) {
    console.error('Error verifying admin:', error);
    return { success: false, error };
  }
};

// Export all utility functions
export { uploadPdfFile, uploadImageFile, fetchItem, setupInitialData, verifyAdmin };
