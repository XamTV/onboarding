import React from "react";
import { Snackbar as PaperSnackbar } from "react-native-paper";
import { useSnackbar } from "../context/SnackBarContext";
import { StyleSheet } from "react-native";

export const SnackBar = () => {
  const {
    controller: { text, ...props },
    queue,
  } = useSnackbar();

  return (
    <PaperSnackbar {...props} style={styles.snackBarContainer}>
      {queue.length > 1 ? `(${queue.length}) ${text}` : text}
    </PaperSnackbar>
  );
};

const styles = StyleSheet.create({
  snackBarContainer: {
    alignItems: "center",
    marginTop: 70,
  },
});
