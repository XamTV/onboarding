import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator, TextInput } from "react-native-paper";
import useAuthContext from "../context/AuthContext";
import { Link } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../context/SnackBarContext";
import { SnackBar } from "../components/SnackBar";

export default function SigninPage() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { t } = useTranslation();

  const { user, initializing } = useAuthContext();

  const snackbar = useSnackbar();

  const handleConnexion = () => {
    if (!password) {
      snackbar.enqueue(t("errors.emptyPasswordField"));

      return;
    }
    if (!email) {
      snackbar.enqueue(t("errors.emptyEmailField"));

      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)

      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          snackbar.enqueue(t("errors.emailAlreadyInUse"));
        }

        if (error.code === "auth/invalid-email") {
          snackbar.enqueue(t("errors.emailInvalid"));
        }
        if (error.code === "auth/invalid-credential") {
          snackbar.enqueue(t("errors.emailAndOrPasswordInvalid"));
        }
        console.error(`${error}`);
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
          label={t("email")}
          value={email}
          onChangeText={(email) => setEmail(email)}
          mode="outlined"
        />
        <TextInput
          style={styles.formInput}
          label={t("password")}
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          mode="outlined"
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.formButton} onPress={handleConnexion}>
            <Text style={styles.FormButtonText}>{t("connect")} </Text>
          </Pressable>
          <Link style={styles.link} to={{ screen: "SignupPage" }}>
            {t("noAccount")}
          </Link>
        </View>
        <View style={styles.snackBarContainer}>
          <SnackBar />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
  formButton: {
    padding: 8,
    marginHorizontal: "auto",
    marginVertical: 24,
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
  link: {
    color: "purple",
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
