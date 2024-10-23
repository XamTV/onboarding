import { StyleSheet, TextStyle } from "react-native";
import { Card, Text } from "react-native-paper";

type Props = {
  bookId: number;
  picture: string;
  displayTitle: string;
  onPress?: () => void;
};

export default function BookCard({
  onPress,
  bookId,
  picture,
  displayTitle,
}: Readonly<Props>) {
  return (
    <Card style={styles.bookcard} onPress={onPress}>
      <Card.Title titleStyle={styles.title} title={displayTitle} />

      <Card.Cover source={{ uri: picture }} />
      <Card.Content>
        <Text>ref. {bookId} </Text>
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
