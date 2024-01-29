import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import {useColorScheme} from 'react-native';
import {darkColor, lightColor} from '../styles';

const ThemeContext = createContext<{[key: string]: any}>({});

const ThemeProvider = ({children}: PropsWithChildren): JSX.Element => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<string | null | undefined>(systemTheme);

  const isDarkMode = theme === 'dark';
  const primaryColor: string = isDarkMode ? darkColor : lightColor;
  const secondaryColor: string = isDarkMode ? lightColor : darkColor;

  return (
    <ThemeContext.Provider
      value={{theme, setTheme, primaryColor, secondaryColor}}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const {theme, setTheme} = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return {theme, isDarkMode, setTheme, toggleTheme};
};

const useThemeColors = () => {
  const {primaryColor, secondaryColor} = useContext(ThemeContext);

  const {isDarkMode} = useTheme();
  const backgroundColor = isDarkMode ? '#001C30' : '#FFF';

  return {primaryColor, secondaryColor, backgroundColor};
};

export {ThemeProvider, useTheme, useThemeColors};
