import { DataContextProvider } from "./src/context/FetchContext";
import { FavoriteContextProvider } from "./src/context/FavoriteContext";

import { AuthContextProvider } from "./src/context/AuthContext";
import RootNavigator from "./RootNavigator";

function App() {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <FavoriteContextProvider>
          <RootNavigator />
        </FavoriteContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  );
}

export default App;
