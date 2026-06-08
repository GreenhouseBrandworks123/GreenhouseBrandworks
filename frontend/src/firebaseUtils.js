import { 
  collection, 
  addDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { db, storage } from './firebase';

// ============== Firestore - Store Form Submissions ==============

export const saveContactSubmission = async (contactData) => {
  try {
    const docRef = await addDoc(collection(db, 'contactSubmissions'), {
      ...contactData,
      submittedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    throw new Error('Failed to save contact submission', { cause: error });
  }
};

export const saveJobApplication = async (applicationData) => {
  try {
    const docRef = await addDoc(collection(db, 'jobApplications'), {
      ...applicationData,
      appliedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    throw new Error('Failed to save job application', { cause: error });
  }
};

// ============== Storage - Upload Files ==============

export const uploadResume = async (file, jobId) => {
  try {
    // Create unique filename
    const filename = `${jobId}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `resumes/${filename}`);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    throw new Error('Resume upload failed', { cause: error });
  }
};

export const uploadPortfolio = async (file, jobId) => {
  try {
    // Create unique filename
    const filename = `${jobId}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `portfolios/${filename}`);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    throw new Error('Portfolio upload failed', { cause: error });
  }
};
