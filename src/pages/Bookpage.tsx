import { useRoute, RouteProp } from "@react-navigation/native";
import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Chapter, ChapterQuery, StackParamList } from "../types";
import Chaptercard from "../components/Chaptercard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RouteParams = {
  params: {
    bookId: number;
    displayTitle: string;
  };
};

type BookpageScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Bookpage"
>;

type Props = {
  navigation: BookpageScreenNavigationProp;
};

export default function Bookpage({ navigation }: Readonly<Props>) {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { bookId } = route.params;

  const [bookDetail, setBookDetail] = useState<Chapter[]>([]);

  useEffect(() => {
    axios
      .post<ChapterQuery>(
        "https://api-preprod.lelivrescolaire.fr/graph",
        {
          query:
            "query chapters($bookId:Int){viewer{chapters(bookIds:[$bookId]){hits{id title url valid}}}}",
          variables: { bookId },
        },

        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then((res) => {
        const result: Chapter[] = res.data.data.viewer.chapters.hits;
        setBookDetail(result);
      });
  }, []);

  return (
    <View>
      <FlatList
        data={bookDetail}
        renderItem={({ item }) =>
          item.valid ? (
            <Chaptercard
              chapterId={item.id}
              chapterTitle={item.title}
              chapterUrl={item.url}
              onPress={() => {
                navigation.navigate("Chapterpage", {
                  chapterId: item.id,
                  title: item.title,
                });
              }}
            />
          ) : null
        }
      />
    </View>
  );
}
