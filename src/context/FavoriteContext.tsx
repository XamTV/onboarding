import React, { useCallback, useContext, useMemo, useState } from "react";
import firestore from "@react-native-firebase/firestore";

interface IFavoriteContext {
  toggleLikedBook: (id: number, uid: string) => void;
  toggleLikedChapter: (bookIds: number, chapterId: number, uid: string) => void;
  getFavoritesByUser: (uid: string) => void;

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

  const getFavoritesByUser = useCallback((uid: string) => {
    firestore()
      .doc(`login/${uid}`)
      .get()
      .then((res) => {
        const userData = res.data();
        setLiked({
          books: userData?.likedBooks[0] || {},
          chapters: userData?.likedChapters[0] || {},
        });
      });
  }, []);

  const contextValue: IFavoriteContext = useMemo(
    () => ({
      liked,
      toggleLikedBook,
      toggleLikedChapter,
      getFavoritesByUser,
    }),
    [liked, toggleLikedBook, toggleLikedChapter, getFavoritesByUser]
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
