import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase } from 'firebase/database';

export let firebaseApp: FirebaseApp, firebaseDb: Database;
export const firebaseInit = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCmZzUuwjOUenyhFc0udCJubCXEK5aPmvc',
    authDomain: 'zuut-b9280.firebaseapp.com',
    projectId: 'zuut-b9280',
    storageBucket: 'zuut-b9280.appspot.com',
    messagingSenderId: '446616267614',
    appId: '1:446616267614:web:56b3074f49a61ad95dfdcf',
    measurementId: 'G-QVR1HMXWYN',
    databaseURL: 'https://zuut-b9280-default-rtdb.firebaseio.com/',
  };
  firebaseApp = initializeApp(firebaseConfig);
  firebaseDb = getDatabase(firebaseApp);
};
