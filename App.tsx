// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./src/pages/Homepage";
import Bookpage from "./src/pages/Bookpage";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Bookpage" component={Bookpage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
