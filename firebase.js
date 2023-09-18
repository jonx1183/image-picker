// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2RCOa6PiG990HjVY_BHr9ftPErtERWRw",
  authDomain: "jonsproject-2b6fc.firebaseapp.com",
  projectId: "jonsproject-2b6fc",
  storageBucket: "jonsproject-2b6fc.appspot.com",
  messagingSenderId: "583412275457",
  appId: "1:583412275457:web:3711462df4f302e8c1e300"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);
export { app, database, storage }