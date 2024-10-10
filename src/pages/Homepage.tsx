import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import Bookcard from "../components/Bookcard";
import { Books, Query, StackParamList } from "../types";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function Homepage({ navigation }: Readonly<Props>) {
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

  if (data.length === 0) {
    return <Text>Loading ... </Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) =>
          item.valid ? (
            <Bookcard
              bookId={item.id}
              picture={item.url}
              displayTitle={item.displayTitle}
              onPress={() => {
                navigation.navigate("Bookpage", { bookId: item.id });
              }}
            />
          ) : null
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
