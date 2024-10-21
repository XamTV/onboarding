import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import auth from "@react-native-firebase/auth";

export default function SignupPage() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthUserChange = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthUserChange);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text> Login </Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome User</Text>
    </View>
  );
}
