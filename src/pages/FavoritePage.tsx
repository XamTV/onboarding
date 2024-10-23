import { FlatList, Text } from "react-native";
import useData, { Book } from "../context/FetchContext";
import useFavorite from "../context/FavoriteContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import FavoriteCard from "../components/FavoriteCard";
import { useEffect, useMemo } from "react";

type Props = NativeStackScreenProps<StackParamList, "FavoritePage">;

export default function FavoritePage({ navigation }: Props) {
  const { books, fetchChapter } = useData();
  const { liked } = useFavorite();

  const likedBookIds = useMemo(
    () =>
      Object.keys(liked.books)
        .map((bookId) => parseInt(bookId))
        .filter((bookId) => liked.books[bookId]),
    [liked.books]
  );
  const bookIdsOfLikedChapters = useMemo(
    () =>
      Object.values(liked.chapters).filter(
        (bookId) => typeof bookId === "number"
      ),
    [liked.chapters]
  );
  useEffect(() => {
    likedBookIds.map((likedBookId) => fetchChapter(likedBookId));
  }, [likedBookIds]);
  useEffect(() => {
    bookIdsOfLikedChapters.map((likedBookId) => fetchChapter(likedBookId));
  }, [bookIdsOfLikedChapters]);

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
