import React, { ReactNode, useContext, useEffect, useState } from "react";
import { BookQuery, Books } from "../types";
import axios from "axios";

interface IDataContext {
  data: Books[];
  loading: boolean;
}

const DataContext = React.createContext({} as IDataContext); // empty default value, don't export the context

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const [data, setData] = useState<Books[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post<BookQuery>(
        "https://api-preprod.lelivrescolaire.fr/graph",
        {
          query:
            "query{viewer{books{hits{id displayTitle url subjects{name}levels{name}valid}}}}",
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then((res) => {
        const result: Books[] = res.data.data.viewer.books.hits;
        setData(result);
        setLoading(false);
      });
  }, []);

  const contextValue: IDataContext = {
    data,
    loading,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (Object.keys(context).length === 0) {
    throw new Error("useData must be used within a DataContextProvider");
  }
  return context;
};

export default useData;
