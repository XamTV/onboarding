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
      if (user) {
        if (bookId && chapterId) {
          setLiked((prev) => {
            const updatedChapters = {
              ...prev.chapters,
              [chapterId]: prev.chapters[chapterId] ? 0 : bookId,
            };
            firestore()
              .doc(`login/${user.uid}`)
              .update({
                likedChapters: [updatedChapters],
              });
            return {
              ...prev,
              chapters: updatedChapters,
            };
          });
        } else if (bookId && !chapterId) {
          setLiked((prev) => {
            const updatedBooks = {
              ...prev.books,
              [bookId]: !prev.books[bookId],
            };
            firestore()
              .doc(`login/${user.uid}`)
              .update({
                likedBooks: [updatedBooks],
              });
            return {
              ...prev,
              books: updatedBooks,
            };
          });
        }
      }
    },
    [user]
  );

  useEffect(() => {
    if (user) {
      const userDocRef = firestore().collection("login").doc(`${user.uid}`);
      userDocRef.get().then((doc) => {
        if (!doc.exists) {
          userDocRef.set({
            email: user.email,
            uid: user.uid,
            likedBooks: [],
            likedChapters: [],
          });
          setLiked({ books: {}, chapters: {} });
        }
        if (doc.exists) {
          const data = doc.data();
          setLiked({
            books: data?.likedBooks[0] || {},
            chapters: data?.likedChapters[0] || {},
          });
        }
      });
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
