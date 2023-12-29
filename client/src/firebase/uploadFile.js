import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '~/firebase/config';

const uploadFile = async (file, folder) => {
  const fileRef = ref(storage, `${folder ?? 'images'}/${file.name + v4()}`);
  const res = await uploadBytes(fileRef, file);
  const path = res.metadata.fullPath;

  // Get file url
  const imageRef = ref(storage, path);
  // console.log(imageRef);
  const url = await getDownloadURL(imageRef);
  // console.log(url);
  return url;
};

export default uploadFile;

// edit { payload }
