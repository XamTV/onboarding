import React, { useContext } from "react";

interface IAuthContext {
  // my exported members
}

const AuthContext = React.createContext({} as IAuthContext);

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  // named export for the provider, which will usually be used only once
  const contextValue: IAuthContext = {
    // define values
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (Object.keys(context).length === 0) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export default useAuthContext;
