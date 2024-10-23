import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";

type Props = {
  chapterId: number;
  chapterTitle: string;
  chapterUrl: string;
  onPress?: () => void;
};

export default function ChapterCard({
  chapterTitle,
  chapterUrl,
  onPress,
}: Readonly<Props>) {
  return (
    <Card style={styles.bookcard} onPress={onPress}>
      <Card.Content style={styles.container}>
        <Card.Cover
          style={styles.picture}
          source={
            chapterUrl === null
              ? {
                  uri: "https://cdn.pixabay.com/photo/2016/12/05/21/09/duck-1884934_1280.jpg",
                }
              : { uri: chapterUrl }
          }
        />
        <Text style={styles.title}>{chapterTitle}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  bookcard: {
    margin: 20,
  },
  container: {
    backgroundColor: "wheat",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginLeft: 20,
    maxWidth: 250,
    fontWeight: "500",
  },
  picture: {
    width: 70,
    height: 70,
  },
});
