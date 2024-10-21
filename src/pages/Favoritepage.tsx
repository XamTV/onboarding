import { FlatList } from "react-native";
import useData, { Book } from "../context/FetchContext";
import useFavorite from "../context/FavoriteContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import FavoriteCard from "../components/FavoriteCard";

type Props = NativeStackScreenProps<StackParamList, "FavoritePage">;

export default function FavoritePage({ navigation }: Props) {
  const { books } = useData();
  const { likedBooks } = useFavorite();

  return (
    <FlatList<Book>
      data={books.filter((book) => likedBooks[book.id])}
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
        />
      )}
    />
  );
}
