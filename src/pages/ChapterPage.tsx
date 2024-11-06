import { View, FlatList, Text, StyleSheet, Pressable } from "react-native";
import { useCallback, useMemo } from "react";

import * as R from "remeda";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../RootNavigator";
import PageCard from "../components/PageCard";
import useFavorite from "../context/FavoriteContext";
import { PAGES_QUERY } from "../service/Queries";
import { useQuery } from "@apollo/client";
import { ActivityIndicator } from "react-native-paper";
import useAuthContext from "../context/AuthContext";
import { useTranslation } from "react-i18next";

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
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const {
    loading,
    error,
    data: pageData,
  } = useQuery<PageQuery>(PAGES_QUERY, {
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

  if (loading) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <Text>{t("error")}</Text>
      </View>
    );
  }
  if (Object.keys(pages).length === 0 || !user) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <Text>{t("emptyPages.chapterPage")}</Text>
      </View>
    );
  }
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
            ? t("favorites.addToFavorites")
            : t("favorites.removeFromFavorites")}
        </Text>
      </Pressable>
      <Text style={style.title}>
        {t("chapterRange", {
          from: sortedPages[0]?.page,
          to: sortedPages[sortedPages.length - 1]?.page,
        })}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
