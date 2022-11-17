import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1NGCjbZtFg5f04N5j1gboRAh8jfSKQQs",
  authDomain: "react-todo-2b3b1.firebaseapp.com",
  databaseURL: "https://react-todo-2b3b1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-todo-2b3b1",
  storageBucket: "react-todo-2b3b1.appspot.com",
  messagingSenderId: "46660757180",
  appId: "1:46660757180:web:62126884ae62b8214f92b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
export const auth = getAuth(app);