
import { httpsCallable } from "firebase/functions";
import { storage, functions } from './firebase';

// ============== Firestore - Store Form Submissions ==============

export const saveContactSubmission = async (contactData) => {
  const submitContact = httpsCallable(functions, "submitContact");
  const result = await submitContact(contactData);
  return result.data;
};

export const saveJobApplication = async (applicationData) => {
  const submitJobApplication = httpsCallable(functions, "submitJobApplication");
  const result = await submitJobApplication(applicationData);
  return result.data;
};

// ============== Storage - Upload Files ==============






