import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator, TextInput } from "react-native-paper";
import ToastManager, { Toast } from "toastify-react-native";
import useAuthContext from "../context/AuthContext";
import firestore from "@react-native-firebase/firestore";
import { useTranslation } from "react-i18next";

export default function SignupPage() {
  const { user, initializing } = useAuthContext();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const createUser = () => {
    if (!email) {
      return Toast.error(t("errors.emailRequired"));
    }
    if (password.length < 6) {
      return Toast.error("errors.passwordLength");
    }
    if (password !== confirmPassword) {
      return Toast.error("errors.passwordsDoesntMatch");
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firestore().collection("login").doc(`${res.user.uid}`).set({
          email: res.user.email,
          uid: res.user.uid,
        });

        Toast.success(t("success.accountCreated"));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Toast.error(t("errors.emailAlreadyInUse"));
        }

        if (error.code === "auth/invalid-email") {
          Toast.error("errors.emailInvalid");
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
        <ToastManager
          position="top"
          positionValue={300}
          animationIn={`slideInRight`}
          animationOut={`slideOutLeft`}
          textStyle={styles.toastText}
        />
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
  toastText: {
    fontSize: 16,
    maxWidth: 200,
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
