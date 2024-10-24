import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { TextInput } from "react-native-paper";
import ToastManager, { Toast } from "toastify-react-native";

export default function SignupPage() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const showToast = () => {
    Toast.error("Votre mot de passe doit faire plus de 6 caractères");
  };

  const onAuthUserChange = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthUserChange);
    return subscriber;
  }, []);

  const createUser = () => {
    if (!password || password.length < 6) {
      return Toast.error("Votre mot de passe doit faire plus de 6 caractères");
    }
    if (!email || email.length < 1) {
      return Toast.error("Email invalide");
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Toast.error("Cet adresse email est deja utilisé");
        }

        if (error.code === "auth/invalid-email") {
          Toast.error("adresse email invalide");
        }

        console.error(error);
      });
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log("user signed out"));
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.formContainer}>
        <ToastManager
          position="top"
          positionValue={200}
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

        <Pressable style={styles.formButton} onPress={createUser}>
          <Text style={styles.FormButtonText}>Créer mon compte</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email} </Text>
      <Button title="Se déconnecter" onPress={logout} />
    </View>
  );
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
