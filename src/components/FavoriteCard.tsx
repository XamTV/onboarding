import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import useFavorite from "../context/FavoriteContext";
import { useCallback } from "react";
import { CHAPTERS_QUERY } from "../service/Queries";
import { useQuery } from "@apollo/client";
import { Chapter, ChapterQuery } from "../pages/BookPage";
import { useTranslation } from "react-i18next";

type Props = {
  onPress: () => void;
  displayTitle: string;
  picture: string;
  bookId: number;
};

export default function FavoriteCard({
  onPress,
  displayTitle,
  picture,
  bookId,
}: Readonly<Props>) {
  const { data: chapterData } = useQuery<ChapterQuery>(CHAPTERS_QUERY, {
    variables: { bookId },
    fetchPolicy: "cache-first",
  });

  const chapters = chapterData?.viewer.chapters.hits;

  const { liked, toggleLiked } = useFavorite();
  const { t } = useTranslation();

  const renderItem = useCallback(({ item }: { item: Chapter }) => {
    return (
      <View style={styles.chapterRowContainer}>
        <Card.Cover
          style={styles.chapterImage}
          source={
            item.url === null
              ? {
                  uri: "https://cdn.pixabay.com/photo/2016/12/05/21/09/duck-1884934_1280.jpg",
                }
              : { uri: item.url }
          }
        />
        <Text style={styles.chapterTitle}>{item.title}</Text>

        <Pressable
          onPress={() => toggleLiked(bookId, item.id)}
          style={styles.chapterPressable}
        >
          <Text>X</Text>
        </Pressable>
      </View>
    );
  }, []);

  if (!chapters || chapters.length === 0) {
    return (
      <View style={[styles.loaderContainer, styles.horizontal]}>
        <Text>
          {t("emptyPages", {
            prefix: "ce",
            container: "livre",
            data: "chapitres",
          })}
        </Text>
      </View>
    );
  }
  return (
    <Card style={styles.bookcard} onPress={onPress}>
      <Card.Title titleStyle={styles.title} title={displayTitle} />
      {liked.books[bookId] ? <Card.Cover source={{ uri: picture }} /> : null}

      {chapters?.some((chapter) => liked.chapters[chapter.id]) ? (
        <Text style={styles.subtitleText}>{t("chapters")} </Text>
      ) : null}

      <Card.Content>
        <FlatList
          data={chapters?.filter((chapter) => liked.chapters[chapter.id])}
          renderItem={renderItem}
        />
      </Card.Content>
      {liked.books[bookId] ? (
        <Pressable
          onPress={() => toggleLiked(bookId)}
          style={styles.chapterPressable}
        >
          <Text>{t("favorites.removeFromFavorites")} </Text>
        </Pressable>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  bookcard: {
    margin: 20,
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
  },
  subtitleText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "bold",
  },
  chapterRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginLeft: 24,
  },
  chapterImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  chapterTitle: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
    maxWidth: 128,
  },
  chapterPressable: {
    padding: 8,
    margin: 8,
    backgroundColor: "lightcoral",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
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
