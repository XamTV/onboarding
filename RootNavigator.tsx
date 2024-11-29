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
import { useTranslation } from "react-i18next";
import * as Linking from "expo-linking";
import messaging, {
  onNotificationOpenedApp,
  getInitialNotification,
} from "@react-native-firebase/messaging";
import { useEffect, useState } from "react";
import { Linking as RNLinking } from "react-native";

// Définition des paramètres de navigation
export type StackParamList = {
  SigninPage: undefined;
  HomePage: undefined;
  BookPage: { bookId: number; displayTitle: string };
  ChapterPage: { chapterId: string; title: string; bookId: number };
  FavoritePage: undefined;
  SignupPage: undefined;
};

const SCREENS = {
  screens: {
    HomePage: "homepage",
    BookPage: "bookpage/:title",
    ChapterPage: "chapterpage/:title/:bookId/:chapterId",
    FavoritePage: "favoritepage",
    SigninPage: "signin",
    SignupPage: "signup",
  },
};

function RootNavigator() {
  const Stack = createNativeStackNavigator<StackParamList>();
  const { user } = useAuthContext();
  const { t } = useTranslation();

  return (
    <NavigationContainer
      linking={{
        prefixes: [Linking.createURL("/")],
        config: SCREENS,
        async getInitialURL() {
          const url = await RNLinking.getInitialURL();
          console.log("url", url);
          if (url != null) {
            return url;
          }

          /** Si une notification est reçu d'un deeplink au lancement de l'app. On check si il vient d'une notification  */
          const message = await getInitialNotification(messaging);

          console.log("message", message);
          return message?.data?.url as string;
        },
        subscribe(listener) {
          const eventListenerSubscription = Linking.addEventListener(
            "url",
            ({ url }: { url: string }) => listener(url)
          );

          const unsubscribe = messaging().onNotificationOpenedApp(
            (remoteMessage) => {
              const url = remoteMessage.data?.url;
              if (url) listener(url as string);
            }
          );

          return () => {
            eventListenerSubscription.remove();
            unsubscribe;
          };
        },
      }}
    >
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
