// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import AppHandler from './AppHandler';
import Header from './templates/Header';

// Configure Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyCsqclIDr5LcG_63e_htcsVgwMyjBeL4mM",
  authDomain: "minhastack-7ffca.firebaseapp.com",
  projectId: "minhastack-7ffca",
  storageBucket: "minhastack-7ffca.appspot.com",
  messagingSenderId: "437617252334",
  appId: "1:437617252334:web:a6c61ff4fd2193ac17e0ff",
  measurementId: "G-2WXWZ0NYL4"
};

firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function SignInScreen() {
  const [isAuthLoading, setAuthLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [authToken, setAuthToken] = useState(false);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if(!user){
        setAuthLoading(false)
      } else {         
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          setAuthToken(idToken)
          setAuthLoading(false)
        }).catch(function(error) {
          alert(error)
          setAuthLoading(false)
        });
      }

      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if(isAuthLoading){
    return (
      <div>
        <Header />
        <div className="container">
          <div className="insight">
            Carregando...
          </div>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div>
        <Header />
        <div className="container">
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      </div>
    );
  }

  return ( <AppHandler authToken={authToken} auth={firebase.auth()} /> );
}

export default SignInScreen;