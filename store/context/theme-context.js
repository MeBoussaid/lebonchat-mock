import React, { useState, useEffect } from "react";

const ThemeContext = React.createContext({
  theme: "dark",
  setDarkTheme: () => {},
  setLightTheme: () => {},
});

export default ThemeContext;

export const ThemeContextProvider = (props) => {
  useEffect(() => {
    const isDarkThemeUserDefault = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    // ce que l'utilisateur a choisi (enregistré dns local storage) passe prime  sur son default général
    const themeInLocalStorage = localStorage.getItem("themeInLocalStorage");

    if (isDarkThemeUserDefault) {
      setTheme("dark");
    }

    if (themeInLocalStorage) {
      setTheme(themeInLocalStorage);
    }
  }, []);

  const [theme, setTheme] = useState("light");
  const setDarkTheme = () => {
    setTheme("dark");
    localStorage.setItem("themeInLocalStorage", "dark");
  };
  const setLightTheme = () => {
    setTheme("light");
    localStorage.setItem("themeInLocalStorage", "light");
  };
  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setDarkTheme: setDarkTheme,
        setLightTheme: setLightTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
