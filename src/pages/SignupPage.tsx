import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator, TextInput } from "react-native-paper";

import { useSnackbar } from "../context/SnackBarContext";
import { SnackBar } from "../components/SnackBar";

import useAuthContext from "../context/AuthContext";
import firestore from "@react-native-firebase/firestore";
import { useTranslation } from "react-i18next";

export default function SignupPage() {
  const { user, initializing } = useAuthContext();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const snackbar = useSnackbar();

  const createUser = () => {
    if (!email) {
      snackbar.enqueue(t("errors.emailRequired"));

      return;
    }
    if (password.length < 6) {
      snackbar.enqueue(t("errors.passwordLength"));

      return;
    }
    if (password !== confirmPassword) {
      snackbar.enqueue(t("errors.passwordsDoesntMatch"));

      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firestore().collection("login").doc(`${res.user.uid}`).set({
          email: res.user.email,
          uid: res.user.uid,
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          snackbar.enqueue(t("errors.emailAlreadyInUse"));
        }

        if (error.code === "auth/invalid-email") {
          snackbar.enqueue(t("errors.emailInvalid"));
        }

        console.error(error);
      });
  };

  if (initializing) {
    return (
      <View style={[styles.loaderContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.formContainer}>
        <TextInput
          style={styles.formInput}
          label={t("requiredInput.email")}
          value={email}
          onChangeText={(email) => setEmail(email)}
          mode="outlined"
          error={!email}
        />
        <TextInput
          style={styles.formInput}
          label={t("requiredInput.password")}
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          mode="outlined"
          error={!password}
        />
        <TextInput
          style={styles.formInput}
          label={t("requiredInput.confirmPassword")}
          value={confirmPassword}
          onChangeText={(password) => setConfirmPassword(password)}
          secureTextEntry={true}
          mode="outlined"
          error={!confirmPassword}
        />

        <Pressable style={styles.formButton} onPress={createUser}>
          <Text style={styles.FormButtonText}>{t("accountCreation")} </Text>
        </Pressable>
        <View style={styles.snackBarContainer}>
          <SnackBar />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formButton: {
    padding: 8,
    marginHorizontal: "auto",
    marginVertical: 8,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  FormButtonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
  formContainer: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
  },
  formInput: {
    marginTop: 8,
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
  snackBarContainer: {
    alignItems: "center",
    marginTop: 70,
  },
  snackBarText: {
    fontSize: 14,
    color: "white",
  },
});
