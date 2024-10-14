import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import BookCard from "../components/Bookcard";
import useData, { Book } from "../context/FetchContext";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Modal, Portal, Provider } from "react-native-paper";
import { useMemo, useState } from "react";
import { StackParamList } from "../../App";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomePage({ navigation }: Readonly<Props>) {
  const { books } = useData();

  const [modalHandle, setModalHandle] = useState<{
    visible: boolean;
    selected?: "Levels" | "Subject";
  }>({ visible: false, selected: undefined });
  const [levelFilter, setLevelFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

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

  const filteredData = books.filter((book) => {
    const validLevel =
      !levelFilter || book.levels.some((level) => level.name === levelFilter);
    const validSubject =
      !subjectFilter ||
      book.subjects.some((subject) => subject.name === subjectFilter);
    return validSubject && validLevel;
  });
  if (books.length === 0) {
    return (
      <View style={[styles.loaderContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <Provider>
      <Portal>
        <Modal
          style={styles.modalContainer}
          visible={modalHandle.visible}
          onDismiss={() => setModalHandle({ visible: false })}
        >
          {modalHandle.selected === "Levels" ? (
            <FlatList<string>
              style={styles.filterList}
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
              style={styles.filterList}
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
      <View style={styles.container}>
        <Button
          onPress={() => {
            setModalHandle({ visible: true, selected: "Levels" });
          }}
          title={levelFilter ? `${levelFilter}` : "Tous niveaux"}
        />
        <Button
          onPress={() => {
            setModalHandle({ visible: true, selected: "Subject" });
          }}
          title={subjectFilter ? `${subjectFilter}` : "Tous sujets"}
        />
        <FlatList<Book>
          data={filteredData} // ici le data doit devenir le filteredData
          renderItem={({ item }) =>
            item.valid ? (
              <BookCard
                bookId={item.id}
                picture={item.url}
                displayTitle={item.displayTitle}
                onPress={() => {
                  navigation.navigate("Bookpage", {
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
  );
}
const styles = StyleSheet.create({
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
});
