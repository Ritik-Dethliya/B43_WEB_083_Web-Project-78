import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB6XBlxJUi2gNiNUwu0160AzTGjrCQiyYA",
    authDomain: "expence-tracker-49678.firebaseapp.com",
    databaseURL: "https://expence-tracker-49678-default-rtdb.firebaseio.com",
    projectId: "expence-tracker-49678",
    storageBucket: "expence-tracker-49678.firebasestorage.app",
    messagingSenderId: "1056909950334",
    appId: "1:1056909950334:web:84d20337a8ef4a21d2472f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth,app };