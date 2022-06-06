import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "./fbase";

export const UserContext = createContext(null);
export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const UseAuth = ({ children }) => {
  const [SignsLoading, setSignsLoading] = useState(true);
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
      setSignsLoading(false);
    });
    return () => {
      subscribe();
    };
  }, []);

  return <UserContext.Provider value={{ user, setUser, SignsLoading }}>{children}</UserContext.Provider>;
};

export default UseAuth;
