import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  Button,
} from "react-native";
import Bookcard from "../components/Bookcard";
import { StackParamList } from "../types";

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

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <Portal>
        <Modal
          style={styles.modalContainer}
          visible={visible}
          onDismiss={hideModal}
        >
          <Text>Coucou</Text>
          <Text>Coucou</Text>
          <Text>Coucou</Text>
          <Text>Coucou</Text>
          <Text>Coucou</Text>

          <Button onPress={hideModal} title="Fermer" />
        </Modal>
      </Portal>
      <View style={styles.container}>
        <Button onPress={showModal} title="Filters" />
        <FlatList
          data={data} // ici le data doit devenir le filteredData
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
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 30,
    height: 400,
    borderRadius: 20,
  },
});
