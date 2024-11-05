import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

export type Book = {
  id: number;
  displayTitle: string;
  url: string;
  subjects: Subject[];
  levels: Level[];
  valid: boolean;
};

type BookQuery = {
  viewer: {
    books: {
      hits: Book[];
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
  viewer: {
    chapters: {
      hits: Chapter[];
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
  fetchChapter: (bookId: number) => void;
  chapters: Record<number, Array<Chapter>>;
}

const DataContext = React.createContext({} as IDataContext);

const BOOKS_QUERY = gql`
  query GetBooks {
    viewer {
      books {
        hits {
          id
          displayTitle
          url
          subjects {
            name
          }
          levels {
            name
          }
          valid
        }
      }
    }
  }
`;

const CHAPTERS_QUERY = gql`
  query GetChapters($bookId: Int!) {
    viewer {
      chapters(bookIds: [$bookId]) {
        hits {
          id
          title
          url
          valid
        }
      }
    }
  }
`;

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const [chapters, setChapters] = useState<Record<number, Array<Chapter>>>({});
  const cachedChapterRef = useRef<Set<number>>(new Set());
  const { loading, data: bookData } = useQuery<BookQuery>(BOOKS_QUERY);
  const [fetchChaptersQuery] = useLazyQuery<ChapterQuery>(CHAPTERS_QUERY);
  const books = bookData?.viewer.books.hits || [];

  const fetchChapter = useCallback(
    (bookId: number) => {
      fetchChaptersQuery({ variables: { bookId } }).then((res) => {
        if (res.data) {
          const result: Chapter[] = res.data.viewer.chapters.hits;
          setChapters((prev) => ({ ...prev, [bookId]: result }));
          cachedChapterRef.current.add(bookId);
          console.info("Chapters fetched and cached:", result);
        }
      });
    },
    [fetchChaptersQuery]
  );

  const contextValue: IDataContext = useMemo(
    () => ({
      books,
      loading,
      fetchChapter,
      chapters,
    }),
    [books, loading, fetchChapter, chapters]
  );

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
