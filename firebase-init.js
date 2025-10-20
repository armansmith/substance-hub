// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB6giLOMEesZN8k3KpMUfbPBO19RUZRY0",
  authDomain: "compoundism.firebaseapp.com",
  projectId: "compoundism",
  storageBucket: "compoundism.firebasestorage.app",
  messagingSenderId: "60525355923",
  appId: "1:60525355923:web:9f9f1e65b6d3d20baa7e66",
  measurementId: "G-XRQG9KNQY3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();      // For login/signup
const db = firebase.firestore();   // For dynamic topics/chat
const storage = firebase.storage(); // Optional: for avatars/images
