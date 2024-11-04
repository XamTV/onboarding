import { DataContextProvider } from "./src/context/FetchContext";
import { FavoriteContextProvider } from "./src/context/FavoriteContext";

import { AuthContextProvider } from "./src/context/AuthContext";
import RootNavigator from "./RootNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-preprod.lelivrescolaire.fr/graph/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <DataContextProvider>
          <FavoriteContextProvider>
            <RootNavigator />
          </FavoriteContextProvider>
        </DataContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  );
}

export default App;
