import { FlatList } from "react-native";
import useFavorite from "../context/FavoriteContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../RootNavigator";
import FavoriteCard from "../components/FavoriteCard";
import { useMemo } from "react";
import { BOOKS_QUERY } from "../service/Queries";
import { useQuery } from "@apollo/client";

export type Book = {
  id: number;
  displayTitle: string;
  url: string;
  subjects: Subject[];
  levels: Level[];
  valid: boolean;
};

export type BookQuery = {
  viewer: {
    books: {
      hits: Book[];
    };
  };
};

export type Subject = {
  name: string;
};

export type Level = {
  name: string;
};

type Props = NativeStackScreenProps<StackParamList, "FavoritePage">;

export default function FavoritePage({ navigation }: Readonly<Props>) {
  const { liked } = useFavorite();
  const { data: bookData } = useQuery<BookQuery>(BOOKS_QUERY);
  const books = bookData?.viewer.books.hits || [];
  const bookIdsOfLikedChapters = useMemo(
    () =>
      Object.values(liked.chapters).filter(
        (bookId) => typeof bookId === "number"
      ),
    [liked.chapters]
  );

  return (
    <FlatList<Book>
      data={books.filter(
        (book) =>
          liked.books[book.id] ||
          bookIdsOfLikedChapters.some((bookId) => bookId === book.id)
      )}
      renderItem={({ item }) => (
        <FavoriteCard
          onPress={() =>
            navigation.navigate("BookPage", {
              bookId: item.id,
              displayTitle: item.displayTitle,
            })
          }
          displayTitle={item.displayTitle}
          picture={item.url}
          bookId={item.id}
        />
      )}
    />
  );
}
