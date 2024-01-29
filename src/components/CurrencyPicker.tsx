import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useThemeColors} from '../context/ThemeContext';
import {CurrencyValueProps} from './CurrencyConvertor';

interface Props {
  openDropdown?: boolean;
  setOpenDropdown: (open: boolean) => void;
  onCurrencyChange: (value: CurrencyValueProps) => void;
}

const CurrencyPicker = ({
  openDropdown = false,
  setOpenDropdown,
  onCurrencyChange,
}: Props) => {
  const {secondaryColor, backgroundColor} = useThemeColors();

  const [currencies, setCurrencies] = useState<CurrencyValueProps[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    (async () => {
      fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json',
      )
        .then(response => response.json())
        .then(response =>
          setCurrencies(
            Object.entries(response).map(curr => ({
              code: curr[0],
              title: curr[1],
            })),
          ),
        )
        .catch(error => console.log(error.message));
    })();
  }, []);

  const windowHeight = Dimensions.get('window').height;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openDropdown}
      onRequestClose={() => setOpenDropdown(false)}>
      <View
        style={[
          styles.container,
          {
            backgroundColor,
            borderColor: secondaryColor,
            height: windowHeight * 0.75,
          },
        ]}>
        <View style={styles.modalHeader}>
          <View style={styles.headerTitle}>
            <Text>Choose Currency</Text>
            <TouchableOpacity onPress={() => setOpenDropdown(false)}>
              <Text style={styles.closeModal}>×</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.searchInput]}
            inputMode="search"
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search Currency"
            clearButtonMode="while-editing"
          />
        </View>

        <FlatList
          data={currencies.filter(curr =>
            curr.title
              ?.toString()
              .toLowerCase()
              .includes(searchText.toLowerCase()),
          )}
          renderItem={({item}) =>
            item.title ? (
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                  onCurrencyChange(item);
                  setOpenDropdown(false);
                }}>
                <View
                  style={[styles.currencyItem, {borderColor: secondaryColor}]}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/7403/7403267.png',
                    }}
                    style={[styles.flag]}
                  />

                  <Text style={[styles.currencyText, {color: secondaryColor}]}>
                    {item.title?.toString()}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <></>
            )
          }
          keyExtractor={item => item.code}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width: '100%',
  },
  headerTitle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInput: {
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
  closeModal: {
    fontSize: 32,
  },
  currencyText: {
    fontSize: 18,
    paddingVertical: 8,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    bottom: 0,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderBottomWidth: 1,
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 16,
  },
});

export default CurrencyPicker;
