import { useTranslation } from "react-i18next";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";

type Props = {
  pageId: number;
  pageTitle: string;
  pagePicture: string;
  pageNumber: number;
};

export default function PageCard({
  pageId,
  pageTitle,
  pagePicture,
  pageNumber,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <Card style={styles.bookCard}>
      <Card.Content style={styles.container}>
        {pagePicture !== null && (
          <Card.Cover style={styles.picture} source={{ uri: pagePicture }} />
        )}
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.pageNumber}>
          {t("pageNumber", { pageNumber })}{" "}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  bookCard: {
    margin: 16,
  },
  container: {
    backgroundColor: "wheat",
    borderRadius: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginHorizontal: 16,
    maxWidth: 200,
    fontWeight: "500",
  },
  picture: {
    width: 32,
    height: 32,
  },
  pageNumber: {
    marginHorizontal: 8,
  },
});
