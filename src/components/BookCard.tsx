import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <Card style={styles.bookCard} onPress={onPress}>
      <Card.Title titleStyle={styles.title} title={displayTitle} />

      <Card.Cover source={{ uri: picture }} />
      <Card.Content>
        <Text>{t("reference", { bookId })} </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  bookCard: {
    margin: 20,
    padding: 20,
  },
  title: {
    textAlign: "center",
  } as TextStyle,
});
