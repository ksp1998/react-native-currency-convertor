import React, {PropsWithChildren, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import {useTheme, useThemeColors} from '../context/ThemeContext';
import {CurrencyPicker} from '.';
import {CurrencyValueProps} from './CurrencyConvertor';

interface Props extends PropsWithChildren {
  value: CurrencyValueProps;
  amount?: number;
  symbol: string;
  disable?: boolean;
  onChangeText?: (text: string) => void;
  onCurrencyChange: (value: CurrencyValueProps) => void;
}

const InputContainer = ({
  value,
  amount = 0,
  symbol,
  disable = false,
  onChangeText: handleChangeText,
  onCurrencyChange: handleCurrencyChange,
}: Props) => {
  const {isDarkMode} = useTheme();
  const {secondaryColor} = useThemeColors();

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const inputColor = useMemo(
    () => (isDarkMode ? '#FFF' : '#000'),
    [isDarkMode],
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setOpenDropdown(true)}>
        <View style={styles.currencyContainer}>
          <View style={styles.flagWrapper}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/7403/7403267.png',
              }}
              style={styles.flag}
            />
          </View>

          <View style={styles.currencyDropdownWrapper}>
            <Text style={[styles.countryCode, {color: secondaryColor}]}>
              {value.code.toUpperCase()}
              {'    '}
              <View style={[styles.arrow, {borderColor: secondaryColor}]} />
            </Text>
            <Text style={[styles.currencyTitle, {color: secondaryColor}]}>
              {value.title?.toString()}
            </Text>
          </View>
        </View>
      </Pressable>

      <CurrencyPicker
        onCurrencyChange={handleCurrencyChange}
        {...{openDropdown, setOpenDropdown}}
      />

      <View style={styles.amountContainer}>
        {!disable && (
          <TextInput
            inputMode="numeric"
            value={`${amount}`}
            style={[styles.input, {color: inputColor}]}
            onChangeText={handleChangeText}
          />
        )}

        {disable && (
          <Text style={[styles.amount, {color: secondaryColor}]}>
            {Math.floor(amount)}
            <Text style={styles.decimals}>
              {amount.toFixed(2).toString().slice(-3)}
            </Text>
          </Text>
        )}
        <Text style={[styles.currencySymbol]}>{symbol}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flagWrapper: {
    height: '75%',
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 16,
  },
  currencyDropdownWrapper: {},
  countryCode: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    width: 10,
    height: 10,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    transform: [{rotate: '45deg'}],
    borderRadius: 2,
  },
  currencyTitle: {
    opacity: 0.75,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  input: {
    fontSize: 36,
    padding: 0,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  decimals: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  currencySymbol: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default InputContainer;
