import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import useData from "../context/FetchContext";
import useFavorite from "../context/FavoriteContext";
import { useCallback } from "react";

type Props = {
  onPress: () => void;
  displayTitle: string;
  picture: string;
};

export default function FavoriteCard({
  onPress,
  displayTitle,
  picture,
}: Props) {
  const { chapters } = useData();
  const { likedBooks, toggleLiked } = useFavorite();

  return (
    <Card style={styles.bookcard} onPress={onPress}>
      <Card.Title titleStyle={styles.title} title={displayTitle} />
      <Card.Cover source={{ uri: picture }} />

      <Text style={styles.subtitleText}>Chapitres</Text>

      <Card.Content>
        <FlatList
          data={chapters.filter((chapter) => likedBooks[chapter.id])}
          renderItem={({ item }) => (
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
                onPress={() => toggleLiked(item.id)}
                style={styles.chapterPressable}
              >
                <Text>X</Text>
              </Pressable>
            </View>
          )}
        />
      </Card.Content>
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
    backgroundColor: "lightcoral",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
});
