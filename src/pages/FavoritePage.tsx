import { FlatList, Pressable, StyleSheet, View } from "react-native";
import useFavorite from "../context/FavoriteContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../RootNavigator";
import FavoriteCard from "../components/FavoriteCard";
import { useMemo } from "react";
import { BOOKS_QUERY } from "../service/Queries";
import { useQuery } from "@apollo/client";
import { ActivityIndicator, Text } from "react-native-paper";
import useAuthContext from "../context/AuthContext";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<StackParamList, "FavoritePage">;

export default function FavoritePage({ navigation }: Readonly<Props>) {
  const { liked } = useFavorite();
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const { loading, error, data: bookData } = useQuery(BOOKS_QUERY);
  const books = bookData?.viewer.books.hits || [];
  const bookIdsOfLikedChapters = useMemo(
    () =>
      Object.values(liked.chapters).filter(
        (bookId) => typeof bookId === "number"
      ),
    [liked.chapters]
  );

  if (books.length === 0 || !user) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <Text>{t("emptyPages.favoritePage")}</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <Text>{t("errors.fromQuery", { message: error.message })}</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={books.filter(
          (book) =>
            liked.books[book.id] ||
            bookIdsOfLikedChapters.some((bookId) => bookId === book.id)
        )}
        renderItem={({ item }) => (
          <FavoriteCard
            onPress={() =>
              navigation.navigate("BookPage", {
                bookId: item.id,
                displayTitle: item.displayTitle ?? "",
              })
            }
            displayTitle={item.displayTitle ?? ""}
            picture={item.url ?? ""}
            bookId={item.id}
          />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  buttonContainer: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  bottomSheetButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 2,
  },
  bottomSheetButtonText: {
    fontWeight: 600,
    textDecorationLine: "underline",
  },
});
