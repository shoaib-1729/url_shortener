/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { getCurrentUser } from "./db/authApi";

// create context using create context
const UrlContext = createContext();
// provide that context to the app using context provider
const UrlProvider = ({ children }) => {
  // fetch the value after user gets logged in, phir woh data user provider ko de dena taaki woh usko globally provide  kar sakte across the app.
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);
  // check user is currently logged in
  const isAuthenticated = user?.role === "authenticated";
  // fetch the user data whenever the app loads for the first time
  useEffect(() => {
    fetchUser();
  }, []);
  // pass the user data to context provider
  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

// export one more function for accessing the user data, taaki baar baar naa kara pade, ab bass function use karna rahega
export const UrlState = () => {
  return useContext(UrlContext);
};
export default UrlProvider;
