import { useRoute, RouteProp } from "@react-navigation/native";
import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Chapter, ChapterQuery } from "../types";
import Chaptercard from "../components/Chaptercard";

type RouteParams = {
  params: {
    bookId: number;
    displayTitle: string;
  };
};

export default function Bookpage() {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { bookId, displayTitle } = route.params;

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

  console.log(bookDetail);

  return (
    <View>
      <Text> Livre n° {displayTitle} </Text>
      <FlatList
        data={bookDetail}
        renderItem={({ item }) =>
          item.valid ? (
            <Chaptercard
              chapterId={item.id}
              chapterTitle={item.title}
              chapterUrl={item.url}
            />
          ) : null
        }
      />
    </View>
  );
}
