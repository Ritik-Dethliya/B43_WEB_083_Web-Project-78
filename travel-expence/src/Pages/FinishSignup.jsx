
import React, { useState, useEffect } from "react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const FinishSignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate()
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
        console.log("Signed in successfully!");
        navigate("/")
      
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
