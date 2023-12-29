import { ref, deleteObject } from 'firebase/storage';
import { storage } from './config';

const removeFile = async (url) => {
  // Only delete if its in the images folder
  if (url && url.includes('/images%')) {
    // Extract the storage path from the URL
    const path = url.replace(/.*firebaseapp.com\/o\//, '').split('?')[0];

    const fileRef = ref(storage, decodeURIComponent(path));

    try {
      await deleteObject(fileRef);
      console.log(`File at ${path} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete file at ${path}:`, error);
    }
  }
};

export default removeFile;
