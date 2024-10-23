import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import useData, { Chapter } from "../context/FetchContext";
import useFavorite from "../context/FavoriteContext";
import { useCallback } from "react";

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
  const { chapterCache } = useData();
  const { liked, toggleLikedBooks, toggleLikedChapters } = useFavorite();

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
          onPress={() => toggleLikedChapters(bookId, item.id)}
          style={styles.chapterPressable}
        >
          <Text>X</Text>
        </Pressable>
      </View>
    );
  }, []);

  return (
    <Card style={styles.bookcard} onPress={onPress}>
      <Card.Title titleStyle={styles.title} title={displayTitle} />
      {liked.books[bookId] ? <Card.Cover source={{ uri: picture }} /> : null}

      {chapterCache[bookId].some((chapter) => liked.chapters[chapter.id]) ? (
        <Text style={styles.subtitleText}>Chapitres</Text>
      ) : null}

      <Card.Content>
        <FlatList
          data={chapterCache[bookId].filter(
            (chapter) => liked.chapters[chapter.id]
          )}
          renderItem={renderItem}
        />
      </Card.Content>
      {liked.books[bookId] ? (
        <Pressable
          onPress={() => toggleLikedBooks(bookId)}
          style={styles.chapterPressable}
        >
          <Text>Supprimer le livre des favoris</Text>
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
});
