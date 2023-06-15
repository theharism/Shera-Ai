import { initializeApp } from '@firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC3jG-1yDLfsn-Dt-lPtw9V3mKNJtuv8qk",
    authDomain: "shera-ai.firebaseapp.com",
    databaseURL: "https://shera-ai-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shera-ai",
    storageBucket: "shera-ai.appspot.com",
    messagingSenderId: "27302368942",
    appId: "1:27302368942:web:55bb2be475ec02075c3f3f"
};

export function uploadToFirebase(blob,filename) {
    return new Promise((resolve, reject) => {
        const firebase = initializeApp(firebaseConfig);
        const storage = getStorage(firebase);
        const imageRef = ref(storage, `images/${new Date().getTime()}.jpg`);
        const uploadTask = uploadBytesResumable(imageRef, blob);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log('Image upload Error ' + error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL);
                }).catch((error) => {
                    console.log('Error getting download URL ' + error);
                    reject(error);
                });
            }
        );
    });
}

export function deleteFromFirebae()