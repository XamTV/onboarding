import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Button,
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import BookCard from "../components/BookCard";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Modal, Portal, Provider, TextInput } from "react-native-paper";
import { useMemo, useState } from "react";
import { StackParamList } from "../../RootNavigator";
import useAuthContext from "../context/AuthContext";
import { BOOKS_QUERY } from "../service/Queries";
import { useQuery } from "@apollo/client";
import * as R from "remeda";
import { useTranslation } from "react-i18next";
import { colorSelector } from "../service/ColorSelector";
import Animated, { useSharedValue } from "react-native-reanimated";
import BottomSheet from "../components/BottomSheet";

type Props = NativeStackScreenProps<StackParamList, "HomePage">;

const removeDiacritics = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function HomePage({ navigation }: Readonly<Props>) {
  const {
    loading,
    error,
    data: bookData,
  } = useQuery(BOOKS_QUERY, {
    fetchPolicy: "cache-first",
  });
  const books = bookData?.viewer.books.hits || [];
  const { user } = useAuthContext();
  const { t } = useTranslation();

  const [modalHandle, setModalHandle] = useState<{
    visible: boolean;
    selected?: "Levels" | "Subject";
  }>({ visible: false, selected: undefined });
  const [levelFilter, setLevelFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");

  const levels = useMemo(
    () => [
      ...new Set(
        books.flatMap((book) => book.levels.map((level) => level.name))
      ),
    ],
    [books]
  );

  const subjects = useMemo(
    () => [
      ...new Set(
        books.flatMap((book) => book.subjects.map((subject) => subject.name))
      ),
    ],
    [books]
  );

  const cacheBooksTextData = useMemo(() => {
    return R.fromEntries(
      books.map((book) => [
        book.id,

        [
          removeDiacritics(book.displayTitle?.toLowerCase() ?? ""),
          ...book.subjects.map((subject) =>
            removeDiacritics(subject.name.toLowerCase())
          ),
          ...book.levels.map((level) =>
            removeDiacritics(level.name.toLowerCase())
          ),
        ].join(" "),
      ])
    );
  }, [books]);

  const normalizedTextFilter = useMemo(
    () => removeDiacritics(textFilter.toLowerCase()),
    [textFilter]
  );

  const filteredData = books.filter((book) => {
    const validLevel =
      !levelFilter || book.levels.some((level) => level.name === levelFilter);
    const validSubject =
      !subjectFilter ||
      book.subjects.some((subject) => subject.name === subjectFilter);
    const validText =
      !textFilter || cacheBooksTextData[book.id].includes(normalizedTextFilter);
    return validSubject && validLevel && validText;
  });

  const validBooks = filteredData.filter((item) => item.valid);
  const isOpen = useSharedValue(false);

  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };

  const contentStyle = {
    color: "black",
  };

  if (loading) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  if (books.length === 0 || !user) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <Text>{t("emptyPages.homePage")}</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={[style.loaderContainer, style.horizontal]}>
        <Text>{t("error", { message: error.message })}</Text>
      </View>
    );
  }

  return (
    <Provider>
      <Portal>
        <Modal
          style={style.modalContainer}
          visible={modalHandle.visible}
          onDismiss={() => setModalHandle({ visible: false })}
        >
          {modalHandle.selected === "Levels" ? (
            <FlatList<string>
              style={style.filterList}
              data={levels}
              renderItem={({ item }) => (
                <Button
                  title={item}
                  onPress={() => {
                    setLevelFilter(item);
                    setModalHandle({ visible: false });
                  }}
                />
              )}
            />
          ) : (
            <FlatList<string>
              style={style.filterList}
              data={subjects}
              renderItem={({ item }) => (
                <Button
                  title={item}
                  onPress={() => {
                    setSubjectFilter(item);
                    setModalHandle({ visible: false });
                  }}
                />
              )}
            />
          )}

          <Button
            title={t("filterReset")}
            onPress={() => {
              if (modalHandle.selected === "Levels") {
                setLevelFilter("");
              } else if (modalHandle.selected === "Subject") {
                setSubjectFilter("");
              }
              setModalHandle({ visible: false });
            }}
          />
        </Modal>
      </Portal>
      <View style={style.container}>
        <Text style={style.buttonText}>
          {t("welcomeMessage", {
            user: user?.email ?? "",
          })}
        </Text>
        <Pressable style={style.buttons} onPress={toggleSheet}>
          <Text style={style.buttonText}>
            {t("categories.selectCategories")}{" "}
          </Text>
        </Pressable>
        <Pressable
          style={style.buttons}
          onPress={() => {
            navigation.navigate("FavoritePage");
          }}
        >
          <Text style={style.buttonText}>{t("favorites.myFavorites")} </Text>
        </Pressable>
        <TextInput
          style={style.textFilterInput}
          label={t("searchBooks")}
          value={textFilter}
          onChangeText={setTextFilter}
          mode="outlined"
        />
        <FlatList
          data={validBooks}
          numColumns={2}
          columnWrapperStyle={style.columnWrapper}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BookCard
              bookId={item.id}
              picture={item.url ?? ""}
              displayTitle={item.displayTitle ?? ""}
              onPress={() => {
                navigation.navigate("BookPage", {
                  bookId: item.id,
                  displayTitle: item.displayTitle ?? "",
                });
              }}
            />
          )}
        />
      </View>
      <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
        <View style={style.buttonInBottoSheetContainer}>
          <Pressable
            style={[
              style.buttonsInBottomSheet,
              { backgroundColor: colorSelector(subjectFilter) },
            ]}
            onPress={() => {
              setModalHandle({ visible: true, selected: "Levels" });
            }}
          >
            <Text style={style.buttonText}>
              {levelFilter ? `${levelFilter}` : t("categories.levels")}
            </Text>
          </Pressable>
          <Pressable
            style={[
              style.buttonsInBottomSheet,
              { backgroundColor: colorSelector(subjectFilter) },
            ]}
            onPress={() => {
              setModalHandle({ visible: true, selected: "Subject" });
            }}
          >
            <Text style={style.buttonText}>
              {subjectFilter ? `${subjectFilter}` : t("categories.subjects")}
            </Text>
          </Pressable>
        </View>
      </BottomSheet>
    </Provider>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  columnWrapper: {
    maxWidth: "100%",
    marginHorizontal: 16,
    marginVertical: 8,
    justifyContent: "space-between",
    alignContent: "center",
    gap: 16,
  },
  modalContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 30,
    marginVertical: 10,
    height: 400,
    borderRadius: 20,
  },
  filterList: {
    margin: 10,
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
  buttons: {
    marginHorizontal: "auto",
    marginVertical: 3,
    padding: 8,
    borderRadius: 32,
    minWidth: 100,
    backgroundColor: "lightblue",
  },
  buttonsInBottomSheet: {
    marginHorizontal: 4,
    marginVertical: 1,
    padding: 8,
    borderRadius: 32,
    minWidth: 100,
    backgroundColor: "lightblue",
  },
  buttonContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  buttonInBottoSheetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },

  textFilterInput: {
    minWidth: 200,
    marginHorizontal: "auto",
    marginBottom: 10,
  },
});
