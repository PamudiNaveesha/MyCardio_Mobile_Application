import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBQ205Feck1kc940z8q7RActby_xz7IPGk",
    authDomain: "medcare-63b18.firebaseapp.com",
    projectId: "medcare-63b18",
    storageBucket: "medcare-63b18.appspot.com",
    messagingSenderId: "1057524522978",
    appId: "1:1057524522978:web:6dfa36b74f51b8933da3bb"
};

// Initialize Firebase if it's not already initialized
const app = initializeApp(firebaseConfig);

// Get the Firebase Authentication instance
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Storage
const storage = getStorage(app);

const db = getFirestore(app);

export { auth, db, storage };