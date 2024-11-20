import { FavoriteContextProvider } from "./src/context/FavoriteContext";

import { AuthContextProvider } from "./src/context/AuthContext";
import RootNavigator from "./RootNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./i18next";
import { SnackbarProvider } from "./src/context/SnackBarContext";

const client = new ApolloClient({
  uri: "https://api-preprod.lelivrescolaire.fr/graph/",
  cache: new InMemoryCache(),
});

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
