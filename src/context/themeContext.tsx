import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
  isDarkMode: false,
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);
