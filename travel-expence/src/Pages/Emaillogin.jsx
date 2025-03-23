// src/EmailLinkLoginPage.js
import React, { useState } from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../firebase-config"; 

const EmailLinkLoginPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendLink = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const actionCodeSettings = {
        url: 'http://localhost:5173/finshsignup',
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      console.log('Email sent!');
      alert('Email sent!,Kindly check your email')
      // Optionally, notify user to check their email
    } catch (err) {
      //setError("Error sending email link.");
      console.log(err.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form 
        onSubmit={handleSendLink} 
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-4 p-3 bg-blue-500 text-white rounded-lg font-semibold disabled:bg-gray-400"
        >
          {loading ? "Sending..." : "Send Sign-In Link"}
        </button>
        {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
      </form>
    </div>
  );
};

export default EmailLinkLoginPage;
