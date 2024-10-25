import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { TextInput } from "react-native-paper";
import ToastManager, { Toast } from "toastify-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../RootNavigator";

type Props = NativeStackScreenProps<StackParamList, "SigninPage">;

export default function SigninPage({ navigation }: Props) {
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onAuthUserChange = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthUserChange);
    return subscriber;
  }, []);

  const handleConnexion = () => {
    if (!password) {
      return Toast.error("Le champ mot de passe ne peut pas être vide");
    }
    if (!email) {
      return Toast.error("Le champ email ne peut pas être vide ");
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("HomePage");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Toast.error("Cet adresse email est deja utilisé");
        }

        if (error.code === "auth/invalid-email") {
          Toast.error("adresse email invalide");
        }

        Toast.error(`Email et/ou mot de passe invalide`);
      });
  };

  if (initializing) return null;
  console.log(user);

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
          <Text>Pas de compte ?</Text>
          <Pressable
            style={styles.formButton}
            onPress={() => {
              navigation.navigate("SignupPage");
            }}
          >
            <Text style={styles.FormButtonText}>S'enregistrer</Text>
          </Pressable>
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
  toastText: {
    fontSize: 16,
    maxWidth: 200,
  },
});
