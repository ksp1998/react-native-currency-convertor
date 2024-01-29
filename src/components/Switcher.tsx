import React, {PropsWithChildren} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useThemeColors} from '../context/ThemeContext';
import {lightColor} from '../styles';

interface Props extends PropsWithChildren {
  handleSwitcher: () => void;
}

const Switcher = ({handleSwitcher}: Props) => {
  const {secondaryColor} = useThemeColors();

  return (
    <View style={styles.container}>
      <View style={[styles.line, {backgroundColor: secondaryColor}]} />

      <TouchableOpacity activeOpacity={0.8} onPress={handleSwitcher}>
        <Image
          source={{
            uri: 'https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/switch-icon.png',
          }}
          style={[styles.switcher, {borderColor: secondaryColor}]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    width: '100%',
    height: 2,
  },
  switcher: {
    width: 48,
    height: 48,
    borderWidth: 4,
    borderRadius: 24,
    transform: [{rotate: '90deg'}],
    backgroundColor: lightColor,
  },
});

export default Switcher;
