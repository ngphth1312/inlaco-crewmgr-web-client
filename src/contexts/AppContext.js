import { createContext, useState, useContext } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState("");

  const value = {
    accessToken,
    setAccessToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const appContext = useContext(AppContext);

    if(!appContext){
        console.log("useAppContext can only been used within AppProvider")
    }

    return appContext;
}