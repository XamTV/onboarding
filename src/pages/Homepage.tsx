import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import Bookcard from "../components/Bookcard";
import { Subject, Level, Books, StackParamList } from "../types";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Modal, Portal, Provider } from "react-native-paper";
import { useState } from "react";
import useData from "../context/FetchContext";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function Homepage({ navigation }: Readonly<Props>) {
  const { data } = useData();

  const filteredData = {
    ...data, // {le data filtré}
  };

  const [visible, setVisible] = useState(false);
  const [levelFilter, setLevelFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [selected, setSelected] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Books[]>();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // useMemo
  const levels: string[] = [
    ...new Set(data.flatMap((book) => book.levels.map((level) => level.name))),
  ];

  const subjects: string[] = [
    ...new Set(
      data.flatMap((book) => book.subjects.map((subject) => subject.name))
    ),
  ];

  console.log(levels);
  console.log(subjects);

  if (data.length === 0) {
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
          {selected === "Levels" ? (
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
          ) : selected === "Subjects" ? (
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
          ) : null}

          <Button
            title="Réinitialiser le filtre"
            onPress={() => {
              selected === "Levels"
                ? setLevelFilter("")
                : selected === "Subjects"
                ? setSubjectFilter("")
                : null;
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
        <FlatList<Books>
          data={filteredBooks} // ici le data doit devenir le filteredData
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
