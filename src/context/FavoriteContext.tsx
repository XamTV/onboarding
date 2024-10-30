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
  toggleLikedBook: (id: number, uid: string) => void;
  toggleLikedChapter: (bookIds: number, chapterId: number, uid: string) => void;

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

  const toggleLikedBook = useCallback((id: number, uid: string) => {
    setLiked((prev) => {
      const updatedBooks = { ...prev.books, [id]: !prev.books[id] };
      firestore()
        .doc(`login/${uid}`)
        .update({
          likedBooks: [updatedBooks],
        });
      return {
        ...prev,
        books: updatedBooks,
      };
    });
  }, []);

  const toggleLikedChapter = useCallback(
    (bookId: number, chapterId: number, uid: string) => {
      setLiked((prev) => {
        const updatedChapters = {
          ...prev.chapters,
          [chapterId]: prev.chapters[chapterId] ? 0 : bookId,
        };
        firestore()
          .doc(`login/${uid}`)
          .update({
            likedChapters: [updatedChapters],
          });
        return {
          ...prev,
          chapters: updatedChapters,
        };
      });
    },
    []
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
      toggleLikedBook,
      toggleLikedChapter,
    }),
    [liked, toggleLikedBook, toggleLikedChapter]
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
