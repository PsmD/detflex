import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "./fbase";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext(null);
export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const UseAuth = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscribe = onAuthStateChanged(authService, async (firebaseUser) => {
      console.log("firebaseUser", firebaseUser);
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          defaultHeaders.Authorization = `Bearer ${token}`;

          setUser(firebaseUser);
        } catch (error) {
          console.log(error);
        }
      } else {
        delete defaultHeaders.Authorizations;
        setUser(null);
      }
    });
    return () => {
      subscribe();
    };
  }, [authService, navigate]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UseAuth;
