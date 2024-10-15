import { useRoute, RouteProp } from "@react-navigation/native";
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import ChapterCard from "../components/Chaptercard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";

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

type BookpageScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Bookpage"
>;

type BookPageScreenRouteProp = RouteProp<StackParamList, "Bookpage">;

type Props = {
  navigation: BookpageScreenNavigationProp;
  route: BookPageScreenRouteProp;
};

export default function BookPage({ navigation, route }: Readonly<Props>) {
  const { bookId } = route.params;

  const [bookDetail, setBookDetail] = useState<Chapter[]>([]);
  const [isLiked, setIsliked] = useState(false);

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
    <View style={style.bookPageContainer}>
      <Pressable
        style={!isLiked ? style.favoriteAddbutton : style.favoriteRemovebutton}
        onPress={() => setIsliked(!isLiked)}
      >
        <Text style={style.buttonText}>
          {!isLiked ? "Ajouter aux favoris" : "Retirer des favoris"}
        </Text>
      </Pressable>
      <FlatList<Chapter>
        data={bookDetail}
        renderItem={({ item }) =>
          item.valid ? (
            <ChapterCard
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

const style = StyleSheet.create({
  bookPageContainer: {
    marginBottom: 60,
  },
  favoriteAddbutton: {
    backgroundColor: "lightgreen",
    marginHorizontal: "auto",
    marginVertical: 16,
    padding: 8,
    borderRadius: 32,
  },
  favoriteRemovebutton: {
    backgroundColor: "#f1807e",
    marginHorizontal: "auto",
    marginVertical: 16,
    padding: 8,
    borderRadius: 32,
  },
  buttonText: {
    fontSize: 16,
  },
});
