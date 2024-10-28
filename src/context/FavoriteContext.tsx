import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

interface IFavoriteContext {
  toggleLikedBook: (id: number) => void;
  toggleLikedChapter: (bookIds: number, chapterId: number) => void;
  storeFavoriteBooks: (uid: string) => void;
  storeFavoriteChapters: (uid: string) => void;
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

  const storageName = "favorite";

  const storeFavoriteBooks = useCallback(
    (uid: string) => {
      firestore()
        .doc(`login/${uid}`)
        .update({
          likedBooks: [liked.books],
        });
    },
    [liked.books]
  );

  const storeFavoriteChapters = useCallback(
    (uid: string) => {
      firestore()
        .doc(`login/${uid}`)
        .update({
          likedChapters: [liked.chapters],
        });
    },
    [liked.chapters]
  );

  const toggleLikedBook = useCallback((id: number) => {
    setLiked((prev) => ({
      ...prev,
      books: { ...prev.books, [id]: !prev.books[id] },
    }));
  }, []);

  const toggleLikedChapter = useCallback(
    (bookId: number, chapterId: number) => {
      setLiked((prev) => ({
        ...prev,
        chapters: {
          ...prev.chapters,
          [chapterId]: prev.chapters[chapterId] ? 0 : bookId,
        },
      }));
    },
    []
  );

  //TODO Read favoriteBooks and FavoriteChapters using a Firestore Subscription inside the app;

  const contextValue: IFavoriteContext = {
    liked,
    toggleLikedBook,
    toggleLikedChapter,
    storeFavoriteBooks,
    storeFavoriteChapters,
  };

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
