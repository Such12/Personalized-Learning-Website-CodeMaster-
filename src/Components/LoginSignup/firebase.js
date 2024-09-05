import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCB0wQm_MKqvwS85bawVild4bwAj55QUE",
  authDomain: "codemaster-4b732.firebaseapp.com",
  projectId: "codemaster-4b732",
  storageBucket: "codemaster-4b732.appspot.com",
  messagingSenderId: "519718811786",
  appId: "1:519718811786:web:4d9288d1ac7335c3cdd573"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;