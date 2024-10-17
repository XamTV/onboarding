import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import ChapterCard from "../components/Chaptercard";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import useFavorite from "../context/FavoriteContext";

type RouteParams = {
  params: {
    bookId: number;
    displayTitle: string;
  };
};

type Chapter = {
  id: number;
  title: string;
  url: string;
  valid: boolean;
};

type ChapterQuery = {
  data: {
    viewer: {
      chapters: {
        hits: Chapter[];
      };
    };
  };
};

type Props = NativeStackScreenProps<StackParamList, "BookPage">;

export default function BookPage({ navigation, route }: Readonly<Props>) {
  const { toggleLiked, likedBooks } = useFavorite();

  const { bookId } = route.params;
  const [bookDetail, setBookDetail] = useState<Chapter[]>([]);

  const onFavoritePress = useCallback(() => {
    toggleLiked(bookId);
  }, [bookId]);

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

  const renderItem = useCallback(
    ({ item }: { item: Chapter }) => {
      return item.valid ? (
        <ChapterCard
          chapterId={item.id}
          chapterTitle={item.title}
          chapterUrl={item.url}
          onPress={() => {
            navigation.navigate("ChapterPage", {
              chapterId: item.id,
              title: item.title,
            });
          }}
        />
      ) : null;
    },
    [bookDetail]
  );

  return (
    <View style={style.bookPageContainer}>
      <Pressable
        style={
          likedBooks[bookId] !== true
            ? [style.buttons, style.favoriteAddbutton]
            : [style.buttons, style.favoriteRemovebutton]
        }
        onPress={onFavoritePress}
      >
        <Text style={style.buttonText}>
          {likedBooks[bookId] !== true
            ? "Ajouter aux favoris"
            : "Retirer des favoris"}
        </Text>
      </Pressable>
      <FlatList<Chapter> data={bookDetail} renderItem={renderItem} />
    </View>
  );
}

const style = StyleSheet.create({
  bookPageContainer: {
    marginBottom: 60,
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
