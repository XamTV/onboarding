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
import useData, { Book } from "../context/FetchContext";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Modal, Portal, Provider, TextInput } from "react-native-paper";
import { useMemo, useState } from "react";
import { StackParamList } from "../../RootNavigator";
import useAuthContext from "../context/AuthContext";

type Props = NativeStackScreenProps<StackParamList, "HomePage">;

const removeDiacritics = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function HomePage({ navigation }: Readonly<Props>) {
  const { books } = useData();
  const { user } = useAuthContext();

  const [modalHandle, setModalHandle] = useState<{
    visible: boolean;
    selected?: "Levels" | "Subject";
  }>({ visible: false, selected: undefined });
  const [levelFilter, setLevelFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");

  const levels: string[] = useMemo(
    () => [
      ...new Set(
        books.flatMap((book) => book.levels.map((level) => level.name))
      ),
    ],
    [books]
  );

  const subjects: string[] = useMemo(
    () => [
      ...new Set(
        books.flatMap((book) => book.subjects.map((subject) => subject.name))
      ),
    ],
    [books]
  );

  const [cachedBooksTextData, setCachedBooksTextData] = useState<{
    [key: string]: string;
  }>({});

  useMemo(() => {
    const newCache: { [key: string]: string } = {};
    books.forEach((book) => {
      newCache[book.id] = [
        removeDiacritics(book.displayTitle?.toLowerCase() || ""),
        ...book.subjects.map((subject) =>
          removeDiacritics(subject.name.toLowerCase())
        ),
        ...book.levels.map((level) =>
          removeDiacritics(level.name.toLowerCase())
        ),
      ].join(" ");
    });
    setCachedBooksTextData(newCache);
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
      !textFilter ||
      cachedBooksTextData[book.id].includes(normalizedTextFilter);
    return validSubject && validLevel && validText;
  });

  return user ? (
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
            title="Réinitialiser le filtre"
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
          {user && user.email !== null ? `Bonjour, ${user.email}` : "Bonjour"}
        </Text>
        <View style={style.buttonContainer}>
          <Pressable
            style={style.buttons}
            onPress={() => {
              setModalHandle({ visible: true, selected: "Levels" });
            }}
          >
            <Text style={style.buttonText}>
              {levelFilter ? `${levelFilter}` : "Tous niveaux"}
            </Text>
          </Pressable>
          <Pressable
            style={style.buttons}
            onPress={() => {
              setModalHandle({ visible: true, selected: "Subject" });
            }}
          >
            <Text style={style.buttonText}>
              {subjectFilter ? `${subjectFilter}` : "Tous sujets"}
            </Text>
          </Pressable>

          <Pressable
            style={style.buttons}
            onPress={() => {
              navigation.navigate("FavoritePage");
            }}
          >
            <Text style={style.buttonText}>Mes Favoris</Text>
          </Pressable>
        </View>
        <TextInput
          style={style.textFilterInput}
          label="Rechercher un livre"
          value={textFilter}
          onChangeText={setTextFilter}
          mode="outlined"
        />
        <FlatList<Book>
          data={filteredData}
          renderItem={({ item }) =>
            item.valid ? (
              <BookCard
                bookId={item.id}
                picture={item.url}
                displayTitle={item.displayTitle}
                onPress={() => {
                  navigation.navigate("BookPage", {
                    bookId: item.id,
                    displayTitle: item.displayTitle,
                  });
                }}
              />
            ) : null
          }
        />
      </View>
    </Provider>
  ) : books.length === 0 ? (
    <View style={[style.loaderContainer, style.horizontal]}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : null;
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
    backgroundColor: "lightblue",
    marginHorizontal: "auto",
    marginVertical: 16,
    padding: 8,
    borderRadius: 32,
    minWidth: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },
  textFilterInput: {
    minWidth: 200,
    marginHorizontal: "auto",
  },
});
