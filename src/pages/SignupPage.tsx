import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { TextInput } from "react-native-paper";
import ToastManager, { Toast } from "toastify-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../RootNavigator";
import useAuthContext from "../context/AuthContext";

type Props = NativeStackScreenProps<StackParamList, "SignupPage">;

export default function SignupPage({ navigation }: Props) {
  const { user, initializing } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const createUser = () => {
    if (!email) {
      return Toast.error("L'adresse email est requise");
    }
    if (password.length < 6) {
      return Toast.error("Votre mot de passe doit faire plus de 6 caractères");
    }
    if (password !== confirmPassword) {
      return Toast.error("Les mots de passe ne sont pas identique");
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Toast.success("compte crée");
        auth().signOut();
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Toast.error("Cette adresse email est déjà utilisée");
        }

        if (error.code === "auth/invalid-email") {
          Toast.error("Cette adresse email est invalide");
        }

        console.error(error);
      });
  };

  if (initializing) return null;

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
          label="email *"
          value={email}
          onChangeText={(email) => setEmail(email)}
          mode="outlined"
          error={!email ? true : false}
        />
        <TextInput
          style={styles.formInput}
          label="mot de passe *"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          mode="outlined"
          error={!password ? true : false}
        />
        <TextInput
          style={styles.formInput}
          label="confirmation du mot de passe *"
          value={confirmPassword}
          onChangeText={(password) => setconfirmPassword(password)}
          secureTextEntry={true}
          mode="outlined"
          error={!confirmPassword ? true : false}
        />

        <Pressable style={styles.formButton} onPress={createUser}>
          <Text style={styles.FormButtonText}>Créer mon compte</Text>
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
});
