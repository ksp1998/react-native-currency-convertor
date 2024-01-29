import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {darkColor} from '../styles';
import {useTheme} from '../context/ThemeContext';

const Header = (): JSX.Element => {
  const {isDarkMode, toggleTheme} = useTheme();

  const backgroundColor = isDarkMode ? '#001C30' : darkColor;

  return (
    <View style={[styles.header, {backgroundColor}]}>
      <Text style={styles.title}>Currency Convertor</Text>
      <Pressable onPress={toggleTheme}>
        <Text style={styles.title}>{isDarkMode ? '🔆' : '🌙'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default Header;
