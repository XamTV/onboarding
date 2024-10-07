import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import Bookcard from "../components/Bookcard";
import { Books, Query } from "../types";

export default function Homepage() {
  const [data, setData] = useState<Books[]>([]);

  useEffect(() => {
    axios
      .post<Query>(
        "https://api-preprod.lelivrescolaire.fr/graph",
        {
          query:
            "query{viewer{books{hits{id displayTitle url subjects{name}levels{name}valid}}}}",
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then((res) => {
        const result: Books[] = res.data.data.viewer.books.hits;
        setData(result);
      });
  }, []);

  console.log(data);

  if (data.length === 0) {
    return <Text>Loading ... </Text>;
  }
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <ScrollView style={styles.scrollview}>
        {data.map((book: Books) => (
          <Bookcard
            key={book.id}
            bookId={book.id}
            picture={book.url}
            displayTitle={book.displayTitle}
          />
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollview: {
    backgroundColor: "lightgrey",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingTop: 40,
  },
});
