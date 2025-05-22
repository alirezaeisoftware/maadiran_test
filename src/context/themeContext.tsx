import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
  isDarkMode: false,
  toggle: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggle = () => setIsDarkMode((prev) => !prev);
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
