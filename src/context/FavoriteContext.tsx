import React, { useCallback, useContext, useEffect, useState } from "react";
import { Book } from "./FetchContext";

interface IFavoriteContext {
  toggleLiked: (id: number) => void;
  likedBooks: Record<number, boolean>;
}

const FavoriteContext = React.createContext({} as IFavoriteContext);

export const FavoriteContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [likedBooks, setLikedBooks] = useState<Record<number, boolean>>({});

  const toggleLiked = useCallback((id: number) => {
    setLikedBooks((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

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
