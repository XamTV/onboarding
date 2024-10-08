import { View, StyleSheet, StatusBar, FlatList } from "react-native";
import Bookcard from "../components/Bookcard";
import { StackParamList } from "../types";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useData } from "../context/FetchContext";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function Homepage({ navigation }: Readonly<Props>) {
  const data = useData();

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
                navigation.navigate("Bookpage", {
                  bookId: item.id,
                  displayTitle: item.displayTitle,
                });
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
