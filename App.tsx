import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./src/pages/Homepage";
import Bookpage from "./src/pages/Bookpage";
import { StackParamList } from "./src/types";

const Stack = createNativeStackNavigator<StackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Bookpage" component={Bookpage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
