import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

export type Books = {
  id: number;
  displayTitle: string;
  url: string;
  subjects: Subject[];
  levels: Level[];
  valid: boolean;
};

type Subject = {
  name: string;
};

type Level = {
  name: string;
};

type BookQuery = {
  data: {
    viewer: {
      books: {
        hits: Books[];
      };
    };
  };
};
interface IDataContext {
  data: Books[];
  loading: boolean;
}

const DataContext = React.createContext({} as IDataContext);

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
      })
      .catch((err: Error) => console.error(err));
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
    throw new Error("DataContext must be used within a DataContextProvider");
  }
  return context;
};

export default useData;
