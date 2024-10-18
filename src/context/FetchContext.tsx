import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

export type Book = {
  id: number;
  displayTitle: string;
  url: string;
  subjects: Subject[];
  levels: Level[];
  valid: boolean;
};

type BookQuery = {
  data: {
    viewer: {
      books: {
        hits: Book[];
      };
    };
  };
};

export type Chapter = {
  id: number;
  title: string;
  url: string;
  valid: boolean;
};

type ChapterQuery = {
  data: {
    viewer: {
      chapters: {
        hits: Chapter[];
      };
    };
  };
};

type Subject = {
  name: string;
};

type Level = {
  name: string;
};

interface IDataContext {
  books: Book[];
  loading: boolean;
  sendBookId: (bookId: number) => void;
  chapters: Chapter[];
}

const DataContext = React.createContext({} as IDataContext);

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const [loading, setLoading] = useState(false);

  const [bookId, setBookId] = useState<number>();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.post<BookQuery>(
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
        );
        const result: Book[] = response.data.data.viewer.books.hits;
        setBooks(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    axios
      .post<ChapterQuery>(
        "https://api-preprod.lelivrescolaire.fr/graph",
        {
          query:
            "query chapters($bookId:Int){viewer{chapters(bookIds:[$bookId]){hits{id title url valid}}}}",
          variables: { bookId },
        },

        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then((res) => {
        const result: Chapter[] = res.data.data.viewer.chapters.hits;
        setChapters(result);
      });
  }, [bookId]);

  const sendBookId = useCallback((bookId: number) => {
    setBookId(bookId);
  }, []);

  const contextValue: IDataContext = {
    books,
    loading,
    sendBookId,
    chapters,
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
