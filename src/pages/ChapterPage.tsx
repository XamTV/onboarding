import { View, FlatList, Text, StyleSheet, Pressable, Platform } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";

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
import functions from '@react-native-firebase/functions';
import { getMessaging, onMessage, setBackgroundMessageHandler } from "@react-native-firebase/messaging";

const getLogs = (log: string) => {

  if ( Platform.OS === "android") {
    console.log("android", log)
  } else {
    console.log("ios", log)
  }

}

type Page = {
  id: number;
  title: string;
  picture: string;
  page: number;
  valid: boolean;
  chapter: {title : string}
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
  const { chapterId, bookId, title } = route.params;


  const [open, setOpen] = useState(false);


  const { liked, toggleLiked } = useFavorite();
  const { user, userData } = useAuthContext();
  const { t } = useTranslation();
  const {
    loading,
    error,
    data: pageData,
  } = useQuery<PageQuery>(PAGES_QUERY, {
    /** chapterId need an Integer not a number */
    variables: { chapterId: parseInt(chapterId)},
    fetchPolicy: "no-cache",
    
  });

  const pages = pageData?.viewer.pages.hits || [];


getLogs(`BookId === ${bookId} //// ChapterId === ${chapterId}`)
  

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
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );
  }
  if (Object.keys(pages).length === 0 || !user) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <Text>{"emptyPages.chapterPage"}</Text>
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
            ? ("favorites.addToFavorites")
            : ("favorites.removeFromFavorites")}
        </Text>
      </Pressable>

      {
        //TODO Switch Text to i18next
      }
      {userData?.role === "teacher" ? (
        <Pressable
          style={[style.buttons, style.notificationButton]}
          onPress={() => functions()
            .httpsCallableFromUrl('http://127.0.0.1:5001/onboarding-89c59/europe-west1/teacherNotification')({ bookId, title, chapterId  })
            .then(response => {
              console.info(response.data);
              setOpen(true)
            })
            .catch(error => {
              console.error("Error calling teacherNotification function:", error as Error);
            })}
        >
          <Text>Send Notification</Text>
        </Pressable>
      ) : null}

      <Text style={style.title}>
        
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
  notificationButton: {
    backgroundColor: "lightblue",
  },
});
