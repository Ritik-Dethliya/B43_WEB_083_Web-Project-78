
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4 text-center">Finish Signing In</h1>
      <button
        onClick={handleCompleteSignIn}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Complete Sign-In
      </button>
      {error && (
        <div className="mt-4 text-red-600 bg-red-100 p-2 rounded-md">{error}</div>
      )}
    </div>

  );
};

export default FinishSignUp;
