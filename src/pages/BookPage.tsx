import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import { useCallback } from "react";
import ChapterCard from "../components/ChapterCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../RootNavigator";
import useFavorite from "../context/FavoriteContext";
import { CHAPTERS_QUERY } from "../service/Queries";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native-paper";

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
  const { t } = useTranslation();

  const {
    loading,
    error,
    data: chapterData,
  } = useQuery<ChapterQuery>(CHAPTERS_QUERY, {
    variables: { bookId },
    fetchPolicy: "cache-first",
  });
  const chapters = chapterData?.viewer.chapters.hits;

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

  if (loading) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <Text>{t("error")}</Text>
      </View>
    );
  }

  if (!chapters || Object.keys(chapters).length === 0) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <Text>
          {t("emptyPages", {
            prefix: "ce",
            container: "livre",
            data: "chapitres",
          })}{" "}
        </Text>
      </View>
    );
  }

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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
