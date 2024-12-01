// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQzyoKbWgYlXNqwroT2uAsQUImV2AqTx4",
  authDomain: "watchshop-9fca2.firebaseapp.com",
  projectId: "watchshop-9fca2",
  storageBucket: "watchshop-9fca2.appspot.com",
  messagingSenderId: "62583640067",
  appId: "1:62583640067:web:e156d66846fc4c9b1a7e36",
  measurementId: "G-Y7CR7BX70F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;
