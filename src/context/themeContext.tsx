import { createContext, useContext } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);
