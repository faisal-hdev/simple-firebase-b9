/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.init";

const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    console.log("google mama is coming soon");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    console.log("sign out");
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const loggedInUSer = result.user;
        console.log(loggedInUSer);
        setUser(loggedInUSer);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {user ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <div>
          <button onClick={handleGoogleSignIn}>Google login</button>
          <button onClick={handleGithubSignIn}>Github login</button>
        </div>
      )}
      {user && (
        <div>
          <img src={user?.photoURL} alt="" />
          <h1>User : {user?.displayName}</h1>
          <p>Email : {user?.email}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
