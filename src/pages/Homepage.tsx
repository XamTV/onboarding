import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import Bookcard from "../components/Bookcard";
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

export default function Homepage({ navigation }: Readonly<Props>) {
  const { books } = useData();

  const [visible, setVisible] = useState(false);
  const [levelFilter, setLevelFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [selected, setSelected] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
    const validLevel = levelFilter
      ? book.levels.some((level) => level.name === levelFilter)
      : true;
    const validSubject = subjectFilter
      ? book.subjects.some((subject) => subject.name === subjectFilter)
      : true;
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
          visible={visible}
          onDismiss={hideModal}
        >
          {selected === "Levels" && (
            <FlatList<string>
              style={styles.filterList}
              data={levels}
              renderItem={({ item }) => (
                <Button
                  title={item}
                  onPress={() => {
                    setLevelFilter(item);
                    hideModal();
                  }}
                />
              )}
            />
          )}
          {selected === "Subjects" && (
            <FlatList<string>
              style={styles.filterList}
              data={subjects}
              renderItem={({ item }) => (
                <Button
                  title={item}
                  onPress={() => {
                    setSubjectFilter(item);
                    hideModal();
                  }}
                />
              )}
            />
          )}

          <Button
            title="Réinitialiser le filtre"
            onPress={() => {
              if (selected === "Levels") {
                setLevelFilter("");
              } else if (selected === "Subjects") {
                setSubjectFilter("");
              }
              hideModal();
            }}
          />
        </Modal>
      </Portal>
      <View style={styles.container}>
        <Button
          onPress={() => {
            showModal();
            setSelected("Levels");
          }}
          title={levelFilter ? `${levelFilter}` : "Tout niveaux"}
        />
        <Button
          onPress={() => {
            showModal();
            setSelected("Subjects");
          }}
          title={subjectFilter ? `${subjectFilter}` : "Tout sujets"}
        />
        <FlatList<Book>
          data={filteredData} // ici le data doit devenir le filteredData
          renderItem={({ item }) =>
            item.valid ? (
              <Bookcard
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
