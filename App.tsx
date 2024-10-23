import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./src/pages/HomePage";
import BookPage from "./src/pages/BookPage";
import ChapterPage from "./src/pages/ChapterPage";
import { DataContextProvider } from "./src/context/FetchContext";
import { FavoriteContextProvider } from "./src/context/FavoriteContext";
import FavoritePage from "./src/pages/FavoritePage";

export type StackParamList = {
  HomePage: undefined;
  BookPage: { bookId: number; displayTitle: string };
  ChapterPage: { chapterId: number; title: string; bookId: number };
  FavoritePage: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

function App() {
  return (
    <NavigationContainer>
      <DataContextProvider>
        <FavoriteContextProvider>
          <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen name="HomePage" component={HomePage} />
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
        </FavoriteContextProvider>
      </DataContextProvider>
    </NavigationContainer>
  );
}

export default App;
