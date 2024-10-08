import { StyleSheet, Text, TextStyle } from "react-native";
import { Card } from "react-native-paper";
import { ChapterCardProps } from "../types";

export default function Chaptercard({
  chapterId,
  chapterTitle,
  chapterUrl,
}: Readonly<ChapterCardProps>) {
  return (
    <Card style={styles.bookcard}>
      <Card.Title titleStyle={styles.title} title={chapterTitle} />

      <Card.Cover
        source={
          chapterUrl === null
            ? {
                uri: "https://cdn.pixabay.com/photo/2016/12/05/21/09/duck-1884934_1280.jpg",
              }
            : { uri: chapterUrl }
        }
      />
      <Card.Content>
        <Text>ref. {chapterId} </Text>
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
  } as TextStyle,
});
