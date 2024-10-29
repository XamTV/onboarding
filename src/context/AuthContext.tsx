import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

interface IAuthContext {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
}

const AuthContext = React.createContext({} as IAuthContext);

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthUserChange = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      setUser(user);
      if (initializing) setInitializing(false);
    },
    []
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthUserChange);
    return subscriber;
  }, []);

  useEffect(() => {
    if (user) {
      firestore()
        .collection("login")
        .doc(`${user.uid}`)
        .set({
          email: user.email,
          uid: user.uid,
          likedBooks: [null],
          likedChapters: [null],
        });
    }
  }, [user]);

  const contextValue: IAuthContext = useMemo(
    () => ({
      user,
      initializing,
    }),
    [user, initializing]
  );

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
