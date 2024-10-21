import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import { useCallback, useEffect } from "react";
import ChapterCard from "../components/ChapterCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import useFavorite from "../context/FavoriteContext";
import useData, { Chapter } from "../context/FetchContext";

type Props = NativeStackScreenProps<StackParamList, "BookPage">;

export default function BookPage({ navigation, route }: Readonly<Props>) {
  const { toggleLiked, likedBooks } = useFavorite();
  const { sendBookId, chapters } = useData();

  const { bookId } = route.params;

  const onFavoritePress = useCallback(() => {
    toggleLiked(bookId);
  }, [bookId]);

  useEffect(() => sendBookId(bookId), [bookId]);

  const renderItem = useCallback(
    ({ item }: { item: Chapter }) => {
      return item.valid ? (
        <ChapterCard
          chapterId={item.id}
          chapterTitle={item.title}
          chapterUrl={item.url}
          onPress={() => {
            navigation.navigate("ChapterPage", {
              chapterId: item.id,
              title: item.title,
            });
          }}
        />
      ) : null;
    },
    [chapters]
  );

  return (
    <View style={style.bookPageContainer}>
      <Pressable
        style={
          likedBooks[bookId] !== true
            ? [style.buttons, style.favoriteAddbutton]
            : [style.buttons, style.favoriteRemovebutton]
        }
        onPress={onFavoritePress}
      >
        <Text style={style.buttonText}>
          {likedBooks[bookId] !== true
            ? "Ajouter aux favoris"
            : "Retirer des favoris"}
        </Text>
      </Pressable>
      <FlatList<Chapter> data={chapters} renderItem={renderItem} />
    </View>
  );
}

const style = StyleSheet.create({
  bookPageContainer: {
    marginBottom: 60,
  },
  buttons: {
    backgroundColor: "lightgreen",
    marginHorizontal: "auto",
    marginVertical: 16,
    padding: 8,
    borderRadius: 32,
  },
  favoriteAddbutton: {
    backgroundColor: "lightgreen",
  },
  favoriteRemovebutton: {
    backgroundColor: "#f1807e",
  },
  buttonText: {
    fontSize: 16,
  },
});
