import { createContext, useState } from "react";
import { IContextData } from "../interfaces/IAuthContext.interface";

const Context = createContext({} as IContextData);

export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );
  const [email, setEmail] = useState<string>("");

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        isLoggedIn,
        setIsLoggedIn,
        email,
        setEmail,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default Context;
