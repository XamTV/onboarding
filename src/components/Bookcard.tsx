import { ScrollView, StyleSheet, View, StatusBar } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { BookCardProps } from "../types";

export default function Bookcard({
  bookId,
  picture,
  displayTitle,
}: BookCardProps) {
  return (
    <View>
      <Text>{displayTitle} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollview: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
});
