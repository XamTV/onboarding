import { StyleSheet, TextStyle } from "react-native";
import { Card } from "react-native-paper";

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
    <Card style={styles.bookCard} onPress={onPress}>
      <Card.Title titleStyle={styles.title} title={displayTitle} />

      <Card.Cover
        style={{ borderTopEndRadius: 0, borderTopStartRadius: 0 }}
        source={{ uri: picture }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  bookCard: {
    width: "48%",
  },
  title: {
    textAlign: "center",
  } as TextStyle,
});
