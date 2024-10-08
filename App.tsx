import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./src/pages/Homepage";
import Bookpage from "./src/pages/Bookpage";
import { StackParamList } from "./src/types";
import DataContextProvider from "./src/context/FetchContext";

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
        </Stack.Navigator>
      </DataContextProvider>
    </NavigationContainer>
  );
}

export default App;
