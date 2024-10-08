import { createContext, useEffect, useState, useContext } from "react";
import { Books, BookQuery } from "../types";
import axios from "axios";

const DataContext = createContext<Books[]>([]);

export default function DataContextProvider({ children }) {
  const [data, setData] = useState<Books[]>([]);

  useEffect(() => {
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
      });
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useContext must be used within a MyContextProvider");
  }
  return context;
}
