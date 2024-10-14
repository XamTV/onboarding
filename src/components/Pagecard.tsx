import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";

type Props = {
  pageId: number;
  pageTitle: string;
  pagePicture: string;
  pageNumber: number;
};

export default function Pagecard({
  pageId,
  pageTitle,
  pagePicture,
  pageNumber,
}: Readonly<Props>) {
  return (
    <Card style={styles.bookcard}>
      <Card.Content style={styles.container}>
        {pagePicture !== null && (
          <Card.Cover style={styles.picture} source={{ uri: pagePicture }} />
        )}
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.pageNumber}>p.{pageNumber}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  bookcard: {
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
