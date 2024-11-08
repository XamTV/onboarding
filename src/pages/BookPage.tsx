import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import { useCallback } from "react";
import ChapterCard from "../components/ChapterCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../RootNavigator";
import useFavorite from "../context/FavoriteContext";
import { CHAPTERS_QUERY } from "../service/Queries";
import { useQuery } from "@apollo/client";

export type Chapter = {
  id: number;
  title: string;
  url: string;
  valid: boolean;
};

export type ChapterQuery = {
  viewer: {
    chapters: {
      hits: Chapter[];
    };
  };
};

type Props = NativeStackScreenProps<StackParamList, "BookPage">;

export default function BookPage({ navigation, route }: Readonly<Props>) {
  const { bookId } = route.params;
  const { toggleLiked, liked } = useFavorite();
  const { data: chapterData } = useQuery<ChapterQuery>(CHAPTERS_QUERY, {
    variables: { bookId },
    fetchPolicy: "cache-first",
  });
  const chapters = { [bookId]: chapterData?.viewer.chapters.hits };

  const onFavoritePress = useCallback(
    () => toggleLiked(bookId),

    [bookId]
  );

  const renderItem = useCallback(({ item }: { item: Chapter }) => {
    return item.valid ? (
      <ChapterCard
        chapterId={item.id}
        chapterTitle={item.title}
        chapterUrl={item.url}
        onPress={() => {
          navigation.navigate("ChapterPage", {
            chapterId: item.id,
            title: item.title,
            bookId,
          });
        }}
      />
    ) : null;
  }, []);

  return (
    <View style={style.bookPageContainer}>
      <Pressable
        style={
          liked.books[bookId] !== true
            ? [style.buttons, style.favoriteAddbutton]
            : [style.buttons, style.favoriteRemovebutton]
        }
        onPress={onFavoritePress}
      >
        <Text style={style.buttonText}>
          {liked.books[bookId] !== true
            ? "Ajouter aux favoris"
            : "Retirer des favoris"}
        </Text>
      </Pressable>
      <FlatList<Chapter> data={chapters[bookId]} renderItem={renderItem} />
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
