// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCCzKQll-FazR45lyvc6Q3qN_0IlgD1ATk',
    authDomain: 'staynest-uploading-images.firebaseapp.com',
    projectId: 'staynest-uploading-images',
    storageBucket: 'staynest-uploading-images.appspot.com',
    messagingSenderId: '1059283758042',
    appId: '1:1059283758042:web:8ee9a3f5e28f3c859aeee3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
