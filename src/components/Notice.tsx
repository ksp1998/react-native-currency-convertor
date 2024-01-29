import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {darkColor, lightColor} from '../styles';

interface Props {
  from: string;
  to: string;
  toValue: number | undefined;
}

const Notice = ({from, to, toValue}: Props): JSX.Element => {
  return (
    <View style={styles.noticeWrapper}>
      <Text style={styles.noticeText}>
        {new Date().toDateString()}
        {'  '}
        <Text style={styles.bold}>
          1 {from.toUpperCase()} = {toValue?.toPrecision(4)} {to.toUpperCase()}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeWrapper: {
    backgroundColor: lightColor,
    paddingVertical: 4,
    paddingHorizontal: 20,
  },
  noticeText: {
    color: darkColor,
    fontSize: 13,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Notice;
