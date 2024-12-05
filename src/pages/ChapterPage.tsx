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
import functions from "@react-native-firebase/functions";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useSnackbar } from "../context/SnackBarContext";
import { use } from "i18next";
import { SnackBar } from "../components/SnackBar";

type Page = {
  id: number;
  title: string;
  picture: string;
  page: number;
  valid: boolean;
  chapter: { title: string };
};

type PageQuery = {
  viewer: {
    pages: {
      hits: Page[];
    };
  };
};

export default function ChapterPage({
  route,
}: Readonly<NativeStackScreenProps<StackParamList, "ChapterPage">>) {
  const { chapterId, bookId, chapterTitle, bookTitle } = route.params;

  const isChapterParsed =
    typeof chapterId === "string" ? parseInt(chapterId) : chapterId;

  const { liked, toggleLiked } = useFavorite();
  const { user, userData } = useAuthContext();
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const { t } = useTranslation();
  const snackbar = useSnackbar();
  const {
    loading,
    error,
    data: pageData,
  } = useQuery<PageQuery>(PAGES_QUERY, {
    variables: {
      chapterId: isChapterParsed,
    },
    fetchPolicy: "cache-first",
  });

  const teacherNotificationUrl =
    "https://teachernotification-hb7zfd533a-ew.a.run.app";

  // for local test :
  // const teacherNotificationUrl =
  //   "http://127.0.0.1:5001/onboarding-89c59/europe-west1/teacherNotification";

  const handleNotification = () => {
    functions()
      .httpsCallableFromUrl(teacherNotificationUrl)({
        bookId,
        bookTitle,
        chapterTitle,
        chapterId,
      })
      .then((response) => {
        console.info(response.data);

        snackbar.enqueue(t("succes.notificationSent"));
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.error(t("errors.cloudFunction", { message: error.message }));
        }
        console.error(JSON.stringify(error));
      });
  };

  const pages = pageData?.viewer.pages.hits || [];

  const sortedPages = useMemo(
    () => (pages ? R.sortBy(Object.values(pages).flat(), R.prop("page")) : []),
    [pages]
  );

  const onFavoritePress = useCallback(
    () => toggleLiked(bookId, isChapterParsed),

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
        <Text>{JSON.stringify(error)}</Text>
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
          liked.chapters[isChapterParsed]
            ? style.favoriteRemovebutton
            : style.favoriteAddbutton,
        ]}
        onPress={onFavoritePress}
      >
        <Text style={style.buttonText}>
          {liked.chapters[isChapterParsed] === 0
            ? t("favorites.addToFavorites")
            : t("favorites.removeFromFavorites")}
        </Text>
      </Pressable>
      <Pressable
        style={[style.buttons, style.notificationButton]}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Text style={style.buttonText}>{t("homePage")}</Text>
      </Pressable>

      {userData?.role === "teacher" ? (
        <Pressable
          style={[style.buttons, style.notificationButton]}
          onPress={handleNotification}
        >
          <Text>{t("sendNotification")}</Text>
        </Pressable>
      ) : null}

      <Text style={style.title}>
        {t("chapterRange", {
          from: sortedPages[0]?.page,
          to: sortedPages[sortedPages.length - 1]?.page,
        })}
      </Text>
      <Text style={style.title}></Text>
      {userData?.role === "teacher" ? (
        <View style={style.snackBarContainer}>
          <SnackBar />
        </View>
      ) : null}
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
  notificationButton: {
    backgroundColor: "lightblue",
  },
  snackBarContainer: {
    alignItems: "center",
    marginTop: 64,
  },
});
