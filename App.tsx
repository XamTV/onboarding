import { FavoriteContextProvider } from "./src/context/FavoriteContext";

import { AuthContextProvider } from "./src/context/AuthContext";
import RootNavigator from "./RootNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import functions from "@react-native-firebase/functions";
import "./i18next";
import { SnackbarProvider } from "./src/context/SnackBarContext";
import { useEffect , useRef} from "react";
import { AppState,  } from "react-native";


const client = new ApolloClient({
  uri: "https://api-preprod.lelivrescolaire.fr/graph/",
  cache: new InMemoryCache(),
});

// Use a local emulator in development
if (__DEV__) {
  // If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
  functions().useEmulator("10.0.2.2", 5001);
}

function App() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider>
        <AuthContextProvider>
          <FavoriteContextProvider>
            <RootNavigator />
          </FavoriteContextProvider>
        </AuthContextProvider>
      </SnackbarProvider>
    </ApolloProvider>
  );
}

export default App;
