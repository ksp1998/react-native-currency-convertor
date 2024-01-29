import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {darkColor} from './styles';
import {ThemeProvider} from './context/ThemeContext';
import {Header, CurrencyConvertor} from './components';

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={isDarkMode ? '#000' : darkColor} />
      <ThemeProvider>
        <Header />
        <CurrencyConvertor />
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;
