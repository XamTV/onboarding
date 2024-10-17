import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";

interface IFavoriteContext {
  toggleLiked: (id: number) => void;
  likedBooks: Record<number, boolean>;
}

const FavoriteContext = React.createContext({} as IFavoriteContext);

export const FavoriteContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [likedBooks, setLikedBooks] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const storeFavoriteBooks = async () => {
      try {
        const jsonValue = JSON.stringify(likedBooks);
        await AsyncStorage.setItem("favoriteBooks", jsonValue);
      } catch (e) {
        console.error("Can't store likedBooks");
      }
    };

    storeFavoriteBooks();
  }, [likedBooks]);

  const toggleLiked = useCallback((id: number) => {
    setLikedBooks((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const readFavoriteBooks = useCallback(() => {
    AsyncStorage.getItem("favoriteBooks")
      .then((jsonValue) => {
        if (jsonValue != null) {
          setLikedBooks(JSON.parse(jsonValue));
        }
      })
      .catch(console.log);
  }, []);

  useEffect(readFavoriteBooks, []);

  const contextValue: IFavoriteContext = {
    likedBooks,
    toggleLiked,
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
