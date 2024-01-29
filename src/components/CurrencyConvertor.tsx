import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {InputContainer, Notice, Switcher} from '.';
import {useThemeColors} from '../context/ThemeContext';

export interface CurrencyValueProps {
  code: string;
  title: string | unknown;
}

interface CurrencyProps {
  value: CurrencyValueProps;
  amount: number;
  values: {[key: string]: number};
}

const CurrencyConvertor = (): JSX.Element => {
  const {backgroundColor} = useThemeColors();

  const [fromCurrency, setFromCurrency] = useState<CurrencyProps>({
    value: {code: 'inr', title: 'Indian Rupee'},
    amount: 0,
    values: {},
  });
  const [targetCurrency, setTargetCurrency] = useState<CurrencyProps>({
    value: {code: 'usd', title: 'United States Dollar'},
    amount: 0,
    values: {},
  });

  useEffect(() => {
    (async () => {
      fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency.value.code}.json`,
      )
        .then(response => response.json())
        .then(response =>
          setFromCurrency(prev => ({
            ...prev,
            values: response[fromCurrency.value.code],
          })),
        );
    })();
  }, [fromCurrency.value.code]);

  useEffect(() => {
    setTargetCurrency(prev => ({
      ...prev,
      amount:
        fromCurrency.amount *
          fromCurrency.values?.[targetCurrency.value.code] ?? 0,
    }));
  }, [fromCurrency, targetCurrency.value.code]);

  const handleSwitch = () => {
    const fromValue = fromCurrency.value;
    const targetValue = targetCurrency.value;

    setFromCurrency(prev => ({...prev, value: targetValue}));
    setTargetCurrency(prev => ({...prev, value: fromValue}));
  };

  const handleFromCurrencyChange = (value: CurrencyValueProps) =>
    setFromCurrency(prev => ({...prev, value}));

  const handleTargetCurrencyChange = (value: CurrencyValueProps) =>
    setTargetCurrency(prev => ({...prev, value}));

  return (
    <View style={[styles.mainWrapper, {backgroundColor}]}>
      <Notice
        from={fromCurrency.value.code}
        to={targetCurrency.value.code}
        toValue={fromCurrency.values[targetCurrency.value.code]}
      />
      <InputContainer
        value={fromCurrency.value}
        amount={fromCurrency.amount}
        symbol={fromCurrency.value.code}
        onChangeText={(text: string) =>
          setFromCurrency(prev => ({...prev, amount: Number(text)}))
        }
        onCurrencyChange={handleFromCurrencyChange}
      />
      <Switcher handleSwitcher={handleSwitch} />
      <InputContainer
        value={targetCurrency.value}
        amount={targetCurrency.amount}
        symbol={targetCurrency.value.code}
        disable={true}
        onCurrencyChange={handleTargetCurrencyChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    height: '100%',
  },
});

export default CurrencyConvertor;
