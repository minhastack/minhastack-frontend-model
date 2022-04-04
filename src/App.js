// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import AppHandler from './AppHandler';
import Header from './templates/Header';

import firebaseConfig from '../config/firebaseConfig'

firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function SignInScreen() {
  const [isAuthLoading, setAuthLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [authToken, setAuthToken] = useState(false);

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