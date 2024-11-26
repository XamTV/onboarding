import { FavoriteContextProvider } from "./src/context/FavoriteContext";

import { AuthContextProvider } from "./src/context/AuthContext";
import RootNavigator from "./RootNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import functions from "@react-native-firebase/functions";
import "./i18next";
import { SnackbarProvider } from "./src/context/SnackBarContext";

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
