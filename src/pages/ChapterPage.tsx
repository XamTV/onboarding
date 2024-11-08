import { View, FlatList, Text, StyleSheet, Pressable } from "react-native";
import { useCallback, useMemo } from "react";

import * as R from "remeda";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../RootNavigator";
import PageCard from "../components/PageCard";
import useFavorite from "../context/FavoriteContext";
import { PAGES_QUERY } from "../service/Queries";
import { useQuery } from "@apollo/client";

type Page = {
  id: number;
  title: string;
  picture: string;
  page: number;
  valid: boolean;
};

type PageQuery = {
  viewer: {
    pages: {
      hits: Page[];
    };
  };
};

type Props = NativeStackScreenProps<StackParamList, "ChapterPage">;

export default function ChapterPage({ route }: Readonly<Props>) {
  const { chapterId, bookId } = route.params;
  const { liked, toggleLiked } = useFavorite();

  const { data: pageData } = useQuery<PageQuery>(PAGES_QUERY, {
    variables: { chapterId },
    fetchPolicy: "cache-first",
  });

  const pages = pageData?.viewer.pages.hits || [];

  const sortedPages = useMemo(
    () => (pages ? R.sortBy(Object.values(pages).flat(), R.prop("page")) : []),
    [pages]
  );

  const onFavoritePress = useCallback(
    () => toggleLiked(bookId, chapterId),

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
          {liked.chapters[chapterId] === 0
            ? "Ajouter aux favoris"
            : "Retirer des favoris"}
        </Text>
      </Pressable>
      <Text style={style.title}>
        P.{sortedPages[0]?.page} - P.
        {sortedPages[sortedPages.length - 1]?.page}
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
