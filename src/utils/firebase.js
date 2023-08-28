// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhjeJQ-B6hQ7Hgh8FxkeM-xbzyLoMg8nI",
  authDomain: "netflixgpt-df30b.firebaseapp.com",
  projectId: "netflixgpt-df30b",
  storageBucket: "netflixgpt-df30b.appspot.com",
  messagingSenderId: "567569622951",
  appId: "1:567569622951:web:d996f1afe4c1df733c7882",
  measurementId: "G-LNCK6CE3VB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(); 