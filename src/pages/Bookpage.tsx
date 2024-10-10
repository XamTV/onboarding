import { useRoute, RouteProp } from "@react-navigation/native";
import { View, Text } from "react-native";

type RouteParams = {
  params: {
    bookId: number;
  };
};

export default function Bookpage() {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { bookId } = route.params;

  return (
    <View>
      <Text> Livre n° {bookId} </Text>
    </View>
  );
}
