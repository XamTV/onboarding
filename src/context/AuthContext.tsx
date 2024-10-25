import React, { useContext, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface IAuthContext {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
}

const AuthContext = React.createContext({} as IAuthContext);

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthUserChange = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthUserChange);
    return subscriber;
  }, []);

  const contextValue: IAuthContext = {
    user,
    initializing,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (Object.keys(context).length === 0) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export default useAuthContext;
