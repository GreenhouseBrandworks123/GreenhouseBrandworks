import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { httpsCallable } from 'firebase/functions';
import { storage, functions } from './firebase';

// ============== Firestore - Store Form Submissions (via Cloud Functions) ==============

export const saveContactSubmission = async (contactData) => {
  try {
    const submitContactFn = httpsCallable(functions, 'submitContact');
    const result = await submitContactFn(contactData);
    return result.data.id;
  } catch (error) {
    throw new Error('Failed to save contact submission', { cause: error });
  }
};

export const saveJobApplication = async (applicationData) => {
  try {
    const submitJobApplicationFn = httpsCallable(functions, 'submitJobApplication');
    const result = await submitJobApplicationFn(applicationData);
    return result.data.id;
  } catch (error) {
    throw new Error('Failed to save job application', { cause: error });
  }
};

// ============== Storage - Upload Files ==============

const ALLOWED_RESUME_TYPES = [
  'application/pdf', 
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export const uploadResume = async (file, jobId) => {
  // Client-side file type and size verification
  if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
    throw new Error('Only PDF and Word documents are accepted.');
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File must be under 10 MB.');
  }

  try {
    // Create unique filename inside jobId subfolder to match storage rules structure
    const filename = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `resumes/${jobId}/${filename}`);
    
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
  // Client-side size verification (Max 20MB as per rules update)
  if (file.size > 20 * 1024 * 1024) {
    throw new Error('File must be under 20 MB.');
  }

  try {
    // Create unique filename inside jobId subfolder to match storage rules structure
    const filename = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `portfolios/${jobId}/${filename}`);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    throw new Error('Portfolio upload failed', { cause: error });
  }
};
