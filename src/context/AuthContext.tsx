import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { requestUserPermission } from "../service/requestUserPermission";
import firestore from "@react-native-firebase/firestore";

export type UserData = {
  email: string;
  likedBooks: { number: boolean };
  likedChapters: { number: number };
  notification_token: string;
  role: string;
  students?: string[];
  uid: string;
};

interface IAuthContext {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  userData: UserData | null;
}

const AuthContext = React.createContext({} as IAuthContext);

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const onAuthUserChange = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      setUser(user);

      if (user !== null) {
        firestore()
          .doc(`login/${user.uid}`)
          .get()
          .then((res) => {
            const data = res.data();
            setUserData(data as UserData);
          });
        requestUserPermission(user.uid);
      }
      if (initializing) setInitializing(false);
    },
    []
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthUserChange);

    return subscriber;
  }, []);

  const contextValue: IAuthContext = useMemo(
    () => ({
      user,
      initializing,
      userData,
    }),
    [user, initializing, userData]
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
