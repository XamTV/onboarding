import { View, FlatList, Text, StyleSheet, Pressable } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import * as R from "remeda";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import PageCard from "../components/PageCardTemp";
import useFavorite from "../context/FavoriteContextTemp";

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

type Props = NativeStackScreenProps<StackParamList, "ChapterPage">;

export default function ChapterPage({ navigation, route }: Props) {
  const { chapterId, bookId } = route.params;
  const { liked, toggleLikedChapters } = useFavorite();

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

  const sortedPages = useMemo(
    () => (pageDetail ? R.sortBy(pageDetail, R.prop("page")) : []),
    [pageDetail]
  );

  const onFavoritePress = useCallback(
    () => toggleLikedChapters(bookId, chapterId),
    [chapterId]
  );

  const renderItem = useCallback(
    ({ item }: { item: Page }) => {
      return item.valid ? (
        <PageCard
          pageId={item.id}
          pageTitle={item.title}
          pagePicture={item.picture}
          pageNumber={item.page}
        />
      ) : null;
    },
    [sortedPages]
  );

  return (
    <View>
      <Pressable
        style={[
          style.buttons,
          liked.chapters[chapterId]
            ? style.favoriteRemovebutton
            : style.favoriteAddbutton,
        ]}
        onPress={onFavoritePress}
      >
        <Text style={style.buttonText}>
          {liked.chapters[chapterId] !== true
            ? "Ajouter aux favoris"
            : "Retirer des favoris"}
        </Text>
      </Pressable>
      <Text style={style.title}>
        P.{sortedPages[0]?.page} - P.
        {sortedPages[sortedPages.length - 1]?.page}{" "}
      </Text>
      <FlatList<Page> data={sortedPages} renderItem={renderItem} />
    </View>
  );
}

const style = StyleSheet.create({
  title: {
    textAlign: "center",
    marginHorizontal: "auto",
    marginVertical: 8,
    maxWidth: 200,
    fontWeight: "500",
  },
  buttons: {
    backgroundColor: "lightgreen",
    marginHorizontal: "auto",
    marginVertical: 16,
    padding: 8,
    borderRadius: 32,
  },
  favoriteAddbutton: {
    backgroundColor: "lightgreen",
  },
  favoriteRemovebutton: {
    backgroundColor: "#f1807e",
  },
  buttonText: {
    fontSize: 16,
  },
});
