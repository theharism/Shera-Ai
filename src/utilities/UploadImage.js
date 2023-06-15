import { initializeApp } from "@firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3jG-1yDLfsn-Dt-lPtw9V3mKNJtuv8qk",
  authDomain: "shera-ai.firebaseapp.com",
  databaseURL:
    "https://shera-ai-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shera-ai",
  storageBucket: "shera-ai.appspot.com",
  messagingSenderId: "27302368942",
  appId: "1:27302368942:web:55bb2be475ec02075c3f3f",
};

export function uploadToFirebase(blob, filename) {
  return new Promise((resolve, reject) => {
    const firebase = initializeApp(firebaseConfig);
    const storage = getStorage(firebase);
    console.log("f", filename);
    const imageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(imageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log("Image upload Error " + error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          })
          .catch((error) => {
            console.log("Error getting download URL " + error);
            reject(error);
          });
      }
    );
  });
}

export function deleteFromFirebae(filename) {

    console.log(filename)

  const firebase = initializeApp(firebaseConfig);
  const storage = getStorage(firebase);

  // Create a reference to the file to delete
  const desertRef = ref(storage, filename);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
      console.log('File Deleted')
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log('FUCKK YOu', error)
    });
}
