export type Subject = {
  name: string;
};

export type Level = {
  name: string;
};

export type Books = {
  id: number;
  displayTitle: string;
  url: string;
  subjects: Subject[];
  levels: Level[];
  valid: boolean;
};

export type Query = {
  data: {
    viewer: {
      books: {
        hits: Books[];
      };
    };
  };
};

export type BookCardProps = {
  bookId: number;
  picture: string;
  displayTitle: string;
  onPress?: () => void;
};

export type StackParamList = {
  Home: undefined;
  Bookpage: { bookId: number };
};
