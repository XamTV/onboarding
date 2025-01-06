import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookPage from "./src/pages/BookPage";
import ChapterPage from "./src/pages/ChapterPage";
import FavoritePage from "./src/pages/FavoritePage";
import HomePage from "./src/pages/HomePage";
import SigninPage from "./src/pages/SigninPage";
import SignupPage from "./src/pages/SignupPage";
import { Button, View } from "react-native";
import auth from "@react-native-firebase/auth";
import useAuthContext from "./src/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import useNotifications from "./src/hooks/useNotifications";
import Constant from "expo-constants";
import SafeAreaWrapper from "./src/components/SafeAreaWrapper";

// Définition des paramètres de navigation
export type StackParamList = {
  SigninPage: undefined;
  HomePage: undefined;
  BookPage: { bookId: number; displayTitle: string };
  ChapterPage: {
    chapterId: number | string;
    chapterTitle: string;
    bookId: number;
    bookTitle: string;
  };
  FavoritePage: undefined;
  SignupPage: undefined;
};

const SCREENS = {
  screens: {
    HomePage: "homepage",
    BookPage: "bookpage/:title",
    ChapterPage: "chapterpage/:chapterTitle/:bookId/:chapterId",
    FavoritePage: "favoritepage",
    SigninPage: "signin",
    SignupPage: "signup",
  },
};

export const scheme: string = `${Constant.expoConfig?.scheme}://`;
function RootNavigator() {
  const Stack = createNativeStackNavigator<StackParamList>();
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const { getInitialURL, subscribe } = useNotifications();

  return (
    <NavigationContainer
      linking={{
        prefixes: [scheme],
        config: SCREENS,
        getInitialURL,
        subscribe,
      }}
    >
      <SafeAreaWrapper>
        {user ? (
          <Stack.Navigator initialRouteName={"HomePage"}>
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{
                headerLeft: () => (
                  <Button
                    title={t("disconnect")}
                    onPress={() => auth().signOut()}
                  />
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
              options={({ route }) => ({ title: route.params.chapterTitle })}
            />
            <Stack.Screen name="FavoritePage" component={FavoritePage} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName={"SigninPage"}>
            <Stack.Screen name="SigninPage" component={SigninPage} />
            <Stack.Screen name="SignupPage" component={SignupPage} />
          </Stack.Navigator>
        )}
      </SafeAreaWrapper>
    </NavigationContainer>
  );
}

export default RootNavigator;
