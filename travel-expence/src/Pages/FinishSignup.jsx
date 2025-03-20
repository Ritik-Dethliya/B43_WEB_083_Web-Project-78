// src/FinishSignUp.js
import React, { useState, useEffect } from "react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../firebase-config";

const FinishSignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const emailFromStorage = window.localStorage.getItem('emailForSignIn');
    if (emailFromStorage) {
      setEmail(emailFromStorage);
    }
  }, []);

  const handleCompleteSignIn = async () => {
    //console.log("hi")
    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem('emailForSignIn');
        console.log("Signed in successfully!");
        // Redirect user to dashboard or home page
      }
    } catch (err) {
        console.log(err)
      setError("Error completing sign-in.");
    }
  };

  return (
    <div>
      <h1>Finish Signing In</h1>
      <button onClick={handleCompleteSignIn}>Complete Sign-In</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default FinishSignUp;
