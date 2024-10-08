// Books typing

export type Books = {
  id: number;
  displayTitle: string;
  url: string;
  subjects: Subject[];
  levels: Level[];
  valid: boolean;
};

export type Subject = {
  name: string;
};

export type Level = {
  name: string;
};
export type BookCardProps = {
  bookId: number;
  picture: string;
  displayTitle: string;
  onPress?: () => void;
};

export type BookQuery = {
  data: {
    viewer: {
      books: {
        hits: Books[];
      };
    };
  };
};

// Chapter typing

export type Chapter = {
  id: number;
  title: string;
  url: string;
  valid: boolean;
};

export type ChapterCardProps = {
  chapterId: number;
  chapterTitle: string;
  chapterUrl: string;
};

export type ChapterQuery = {
  data: {
    viewer: {
      chapters: {
        hits: Chapter[];
      };
    };
  };
};

// Routes typing

export type StackParamList = {
  Home: undefined;
  Bookpage: { bookId: number; displayTitle: string };
};
