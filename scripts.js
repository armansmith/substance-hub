// Make sure Firebase is initialized first
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to load substances
async function loadSubstances() {
  try {
    const substancesCol = collection(db, 'substances');
    const snapshot = await getDocs(substancesCol);
    const substances = snapshot.docs.map(doc => doc.data());
    console.log("Substances loaded:", substances);
    // You can now use this data in your website
  } catch (error) {
    console.error("Error loading substances:", error);
  }
}

// Call the function
loadSubstances();
