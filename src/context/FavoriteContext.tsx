import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";

interface IFavoriteContext {
  toggleLikedBooks: (id: number) => void;
  toggleLikedChapters: (bookIds: number, chapterId: number) => void;
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

  useEffect(() => {
    const storeFavoriteBooks = async () => {
      try {
        const jsonValue = JSON.stringify(liked);
        await AsyncStorage.setItem("favorites", jsonValue);
      } catch (e) {
        console.error("Can't store liked");
      }
    };

    storeFavoriteBooks();
  }, [liked]);

  const toggleLikedBooks = useCallback((id: number) => {
    setLiked((prev) => ({
      ...prev,
      books: { ...prev.books, [id]: !prev.books[id] },
    }));
  }, []);
  const toggleLikedChapters = useCallback(
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

  const readFavoriteBooks = useCallback(() => {
    AsyncStorage.getItem("favorites")
      .then((jsonValue) => {
        if (jsonValue != null) {
          setLiked(JSON.parse(jsonValue));
        }
      })
      .catch(console.log);
  }, []);

  useEffect(readFavoriteBooks, []);

  const contextValue: IFavoriteContext = {
    liked,
    toggleLikedBooks,
    toggleLikedChapters,
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
