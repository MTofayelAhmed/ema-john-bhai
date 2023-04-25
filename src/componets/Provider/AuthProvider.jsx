import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../../Firebase/Firebase.config";
import { useNavigate } from "react-router-dom";

export const authContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
const [loading, setLoading]= useState(true)
const navigate = useNavigate()
  const SignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
   const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
  
    });
    return ()=>{
      unsubscribe()
    }


  }, []);

  const authInfo = { createUser, SignIn, logOut, user, loading };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
