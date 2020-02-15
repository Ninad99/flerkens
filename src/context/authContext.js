import React, { useState, useEffect } from 'react';
import firebase from '../firebase/config';

export const AuthContext = React.createContext({ currentUser: null });

const AuthContextProvider = props => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;