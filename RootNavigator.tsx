import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookPage from "./src/pages/BookPage";
import ChapterPage from "./src/pages/ChapterPage";
import FavoritePage from "./src/pages/FavoritePage";
import HomePage from "./src/pages/HomePage";
import SigninPage from "./src/pages/SigninPage";
import SignupPage from "./src/pages/SignupPage";
import { Button } from "react-native";
import auth from "@react-native-firebase/auth";
import useAuthContext from "./src/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

export type StackParamList = {
  SigninPage: undefined;
  HomePage: undefined;
  BookPage: { bookId: number; displayTitle: string };
  ChapterPage: { chapterId: number; title: string; bookId: number };
  FavoritePage: undefined;
  SignupPage: undefined;
};
function RootNavigator() {
  const Stack = createNativeStackNavigator<StackParamList>();

  const { user, initializing } = useAuthContext();

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName={"HomePage"}>
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{
              headerLeft: () => (
                <Button title="Deconnexion" onPress={() => auth().signOut()} />
              ),
            }}
          />
          <Stack.Screen
            name="BookPage"
            component={BookPage}
            options={({ route }) => ({ title: route.params.displayTitle })}
          />
          <Stack.Screen
            name="ChapterPage"
            component={ChapterPage}
            options={({ route }) => ({ title: route.params.title })}
          />
          <Stack.Screen name="FavoritePage" component={FavoritePage} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={"SigninPage"}>
          <Stack.Screen name="SigninPage" component={SigninPage} />
          <Stack.Screen name="SignupPage" component={SignupPage} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default RootNavigator;
