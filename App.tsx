import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./src/pages/Homepage";
import Bookpage from "./src/pages/Bookpage";
import { DataContextProvider } from "./src/context/FetchContext";
import Chapterpage from "./src/pages/Chapterpage";

export type StackParamList = {
  Home: undefined;
  Bookpage: { bookId: number; displayTitle: string };
  Chapterpage: { chapterId: number; title: string };
};

const Stack = createNativeStackNavigator<StackParamList>();

function App() {
  return (
    <NavigationContainer>
      <DataContextProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Homepage} />
          <Stack.Screen
            name="Bookpage"
            component={Bookpage}
            options={({ route }) => ({ title: route.params.displayTitle })}
          />
          <Stack.Screen
            name="Chapterpage"
            component={Chapterpage}
            options={({ route }) => ({ title: route.params.title })}
          />
        </Stack.Navigator>
      </DataContextProvider>
    </NavigationContainer>
  );
}

export default App;
