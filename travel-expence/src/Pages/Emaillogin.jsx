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
        url: 'http://localhost:5173/home',
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      console.log('Email sent!');
      // Optionally, notify user to check their email
    } catch (err) {
      //setError("Error sending email link.");
      console.log(err.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSendLink}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Sign-In Link"}
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default EmailLinkLoginPage;
