import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator, TextInput } from "react-native-paper";
import ToastManager, { Toast } from "toastify-react-native";
import useAuthContext from "../context/AuthContext";
import { Link } from "@react-navigation/native";

export default function SigninPage() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { user, initializing } = useAuthContext();

  const handleConnexion = () => {
    if (!password) {
      return Toast.error("Le champ mot de passe ne peut pas être vide");
    }
    if (!email) {
      return Toast.error("Le champ email ne peut pas être vide ");
    }
    auth()
      .signInWithEmailAndPassword(email, password)

      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Toast.error("Cet adresse email est deja utilisé");
        }

        if (error.code === "auth/invalid-email") {
          Toast.error("adresse email invalide");
        }
        if (error.code === "auth/invalid-credential") {
          Toast.error("Email et/ou mot de passe invalide");
        }
        console.error(`${error}`);
      });
  };

  if (initializing)
    return (
      <View style={[styles.loaderContainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );

  if (!user) {
    return (
      <View style={styles.formContainer}>
        <ToastManager
          positionValue={320}
          animationIn={`slideInRight`}
          animationOut={`slideOutLeft`}
          textStyle={styles.toastText}
        />
        <TextInput
          style={styles.formInput}
          label="email "
          value={email}
          onChangeText={(email) => setEmail(email)}
          mode="outlined"
        />
        <TextInput
          style={styles.formInput}
          label="mot de passe "
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          mode="outlined"
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.formButton} onPress={handleConnexion}>
            <Text style={styles.FormButtonText}>Se connecter</Text>
          </Pressable>
          <Link style={styles.link} to={{ screen: "SignupPage" }}>
            Pas de compte ?
          </Link>
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
