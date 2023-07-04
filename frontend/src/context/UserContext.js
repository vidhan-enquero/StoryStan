import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    isAuthenticated: false,
    userImage: null
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
