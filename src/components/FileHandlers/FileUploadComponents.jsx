import React, { useState, useEffect } from 'react';
import { auth, db, firebaseConfig } from '../../firebase/ClientApp.mjs';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

//uploading pdfs
export const UploadDataPdfComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileIds, setFileIds] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(Array.from(files));
    setProgress(Array.from(files).map(() => 0));
  };

  const handleUpload = () => {
    const uploadPromises = [];
    const ids = [];

    selectedFiles.forEach((file, index) => {
      const fileName = `${file.name}`;
      const storageRef = ref(storage, 'Pdfs/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress((prevProgress) => {
            const updatedProgress = [...prevProgress];
            updatedProgress[index] = uploadProgress;
            console.log('working');
            return updatedProgress;
          });
        },
        (error) => {
          console.log('Error uploading file:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const fileId = doc(collection(firestore, 'files')).id;
          await setDoc(doc(firestore, 'files', fileId), {
            name: file.name,
            downloadURL: downloadURL,
            dec: '',
            mat_type: '',
            pages: '',
          });
          console.log('working2');
          ids.push(fileId);
          setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, file]);
          setFileIds(ids);
        }
      );

      uploadPromises.push(uploadTask);
    });

    Promise.all(uploadPromises)
      .then(() => {
        console.log('All files uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });
  };

  return (
    <div className="upload-pdf-container">
      <input type="file" onChange={handleFileChange} multiple accept=".pdf" />
      <button onClick={handleUpload} disabled={selectedFiles.length === 0}>
        Upload PDFs
      </button>
      {progress.map((p, i) => (
        <div key={i} className="progress-bar">
          <div className="progress" style={{ width: `${p}%` }}>
            {p}%
          </div>
        </div>
      ))}
    </div>
  );
};

//UPloading images
export const UploadDataImageComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileIds, setFileIds] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(Array.from(files));
    setProgress(Array.from(files).map(() => 0));
  };

  const handleUpload = () => {
    const uploadPromises = [];
    const ids = [];

    selectedFiles.forEach((file, index) => {
      const fileName = `${file.name}`;
      const storageRef = ref(storage, 'images/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress((prevProgress) => {
            const updatedProgress = [...prevProgress];
            updatedProgress[index] = uploadProgress;
            console.log('working');
            return updatedProgress;
          });
        },
        (error) => {
          console.log('Error uploading file:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const fileId = doc(collection(firestore, 'files')).id;
          await setDoc(doc(firestore, 'files', fileId), {
            name: file.name,
            downloadURL: downloadURL,
            dec: '',
            mat_type: '',
            pages: '',
          });
          console.log('working2');
          ids.push(fileId);
          setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, file]);
          setFileIds(ids);
        }
      );

      uploadPromises.push(uploadTask);
    });

    Promise.all(uploadPromises)
      .then(() => {
        console.log('All files uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });
  };

  return (
    <div className="upload-image-container">
      <input type="file" onChange={handleFileChange} multiple accept="image/*" />
      <button onClick={handleUpload} disabled={selectedFiles.length === 0}>
        Upload Images
      </button>
      {progress.map((p, i) => (
        <div key={i} className="progress-bar">
          <div className="progress" style={{ width: `${p}%` }}>
            {p}%
          </div>
        </div>
      ))}
    </div>
  );
};

//downloading component
export const FetchItemComponent = ({ itemId }) => {
  const [itemData, setItemData] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        console.log('working3');
        const itemDocRef = doc(firestore, 'files', itemId);
        const itemDocSnap = await getDoc(itemDocRef);

        if (itemDocSnap.exists()) {
          const itemDetails = itemDocSnap.data();
          setItemData(itemDetails);

          const fileRef = ref(storage, 'files/' + itemDetails.filename);
          const url = await getDownloadURL(fileRef);
          setDownloadURL(url);
        } else {
          console.log('Item does not exist.');
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItemData();
  }, [itemId]);

  if (!itemData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-details">
      <h2>{itemData.name}</h2>
      {downloadURL && (
        <div>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            Download File
          </a>
        </div>
      )}
    </div>
  );
};
