import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCS5eUX329-hp3wKHRLn-WxyFsIS5aQC3s",
  authDomain: "takeaway-fcb9d.firebaseapp.com",
  projectId: "takeaway-fcb9d",
  storageBucket: "takeaway-fcb9d.appspot.com",
  messagingSenderId: "382782023677",
  appId: "1:382782023677:web:cbb9dd7c54cbb0e1fb9b94",
  measurementId: "G-RV1RGHXVH3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
