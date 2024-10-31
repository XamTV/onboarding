import { FlatList, View } from "react-native";
import useData, { Book } from "../context/FetchContext";
import useFavorite from "../context/FavoriteContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../RootNavigator";
import FavoriteCard from "../components/FavoriteCard";
import { useMemo } from "react";

type Props = NativeStackScreenProps<StackParamList, "FavoritePage">;

export default function FavoritePage({ navigation }: Readonly<Props>) {
  const { books } = useData();
  const { liked } = useFavorite();

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
