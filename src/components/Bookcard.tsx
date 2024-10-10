import { ScrollView, StyleSheet, TextStyle } from "react-native";
import { Card, Text } from "react-native-paper";

type Props = {
  bookId: number;
  picture: string;
  displayTitle: string;
  onPress?: () => void;
};

export default function Bookcard({
  onPress,
  bookId,
  picture,
  displayTitle,
}: Readonly<Props>) {
  return (
    <ScrollView contentContainerStyle={styles.scrollview}>
      <Card style={styles.bookcard} onPress={onPress}>
        <Card.Title titleStyle={styles.title} title={displayTitle} />

        <Card.Cover source={{ uri: picture }} />
        <Card.Content>
          <Text>ref. {bookId} </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  bookcard: {
    margin: 10,
    padding: 10,
  },
  title: {
    textAlign: "center",
  } as TextStyle,
});
