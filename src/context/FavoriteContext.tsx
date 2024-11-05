import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import firestore from "@react-native-firebase/firestore";
import useAuthContext from "./AuthContext";

interface IFavoriteContext {
  toggleLiked: (bookIds: number, chapterId?: number) => void;

  liked: Favorite;
}

type Favorite = {
  books: Record<number, boolean>;
  chapters: Record<number, number | boolean>; // { 45: 0, 46: 12 } 0 means not favorite
};

const FavoriteContext = React.createContext({} as IFavoriteContext);

export const FavoriteContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [liked, setLiked] = useState<Favorite>({ books: {}, chapters: {} });
  const { user } = useAuthContext();

  const toggleLiked = useCallback(
    (bookId: number, chapterId?: number) => {
      if (!user) return;

      if (bookId && chapterId) {
        firestore()
          .doc(`login/${user.uid}`)
          .get()
          .then((doc) => {
            const currentLiked = doc.data()?.likedChapters || {};
            firestore()
              .doc(`login/${user.uid}`)
              .update({
                [`likedChapters.${chapterId}`]: currentLiked[chapterId]
                  ? 0
                  : bookId,
              });
          });
        return;
      }

      if (bookId && !chapterId) {
        firestore()
          .doc(`login/${user.uid}`)
          .get()
          .then((doc) => {
            const currentLiked = doc.data()?.likedBooks || {};
            firestore()
              .doc(`login/${user.uid}`)
              .update({
                [`likedBooks.${bookId}`]: !currentLiked[bookId],
              });
          });
      }
    },
    [user]
  );

  useEffect(() => {
    if (user) {
      const userDocRef = firestore().collection("login").doc(user.uid);

      const unsubscribe = userDocRef.onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setLiked({
            books: data?.likedBooks || {},
            chapters: data?.likedChapters || {},
          });
        } else {
          userDocRef.set({ email: user.email, uid: user.uid });
          setLiked({ books: {}, chapters: {} });
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const contextValue: IFavoriteContext = useMemo(
    () => ({
      liked,
      toggleLiked,
    }),
    [liked, toggleLiked]
  );

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};

const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (Object.keys(context).length === 0) {
    throw new Error(
      "FavoriteContext must be used within a FavoriteContextProvider"
    );
  }
  return context;
};

export default useFavorite;
