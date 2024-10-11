import { useRoute, RouteProp } from "@react-navigation/native";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import * as R from "remeda";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import Pagecard from "../components/Pagecard";

type RouteParams = {
  params: {
    chapterId: number;
    title: string;
  };
};

type Page = {
  id: number;
  title: string;
  picture: string;
  page: number;
  valid: boolean;
};

type PageQuery = {
  data: {
    viewer: {
      pages: {
        hits: Page[];
      };
    };
  };
};

type ChapterPageScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Chapterpage"
>;

type Props = {
  navigation: ChapterPageScreenNavigationProp;
};

export default function Chapterpage({ navigation }: Readonly<Props>) {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { chapterId } = route.params;

  const [pageDetail, setPageDetail] = useState<Page[]>();

  useEffect(() => {
    axios
      .post<PageQuery>(
        "https://api-preprod.lelivrescolaire.fr/graph",
        {
          query:
            "query pages($chapterId:Int){viewer{pages(chapterIds:[$chapterId]){hits{id title picture page valid}}}}",
          variables: { chapterId },
        },

        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then((res) => {
        const result: Page[] = res.data.data.viewer.pages.hits;
        setPageDetail(result);
      });
  }, []);

  const sortedPages = pageDetail ? R.sortBy(pageDetail, R.prop("page")) : [];

  return (
    <View>
      <Text style={styles.title}>
        P.{sortedPages[0]?.page} - P.
        {sortedPages[sortedPages.length - 1]?.page}{" "}
      </Text>
      <FlatList<Page>
        data={sortedPages}
        renderItem={({ item }) =>
          item.valid ? (
            <Pagecard
              pageId={item.id}
              pageTitle={item.title}
              pagePicture={item.picture}
              pageNumber={item.page}
            />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginHorizontal: "auto",
    marginVertical: 8,
    maxWidth: 200,
    fontWeight: "500",
  },
});
