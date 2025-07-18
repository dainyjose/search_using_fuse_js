import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { searchProductsUsingFuse } from '../utils/searchUtil';
import { debounce } from 'lodash';

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [dummyData, setDummyData] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => setDummyData(data?.products))
      .catch((error) => console.error('Error:', error));
  }, []);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      // RECHECK json data to allProductList
      const data = searchProductsUsingFuse(query, dummyData);

      setSearchResult(data);
    }, 300),
    [],
  );
  return (
    <View style={{ padding: 10, flex: 1, marginBottom: 20 }}>
      <TextInput
        style={{ backgroundColor: '#a9a9a9', padding: 5, borderRadius: 5, paddingVertical: 10 }}
        placeholder="Search..."
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);

          if (text.trim() == '') {
            setSearchResult(dummyData);
          } else {
            debouncedSearch(text);
          }
        }}
      />

      <FlatList
        style={{ flex: 1, marginTop: 10, backgroundColor: '#cccc', padding: 5 }}
        data={searchResult}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemCardStyle}>
            <Text
              // numberOfLines={1}
              style={{
                fontSize: 14,
                color: '#606060',
                letterSpacing: 0.5,
                textAlign: 'left',
                flex: 9 / 10,
                fontWeight: '900',
              }}
            >
              {item?.title}
            </Text>
            <Text
              // numberOfLines={1}
              style={{
                fontSize: 14,
                color: '#606060',
                letterSpacing: 0.5,
                textAlign: 'left',
                flex: 9 / 10,
              }}
            >
              {item?.description}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              {item?.brand && (
                <Text style={{ marginRight: 5, color: '#35454f' }}>{'#' + item?.brand}</Text>
              )}
              {item?.category && <Text style={{ color: '#35454f' }}>{'#' + item?.category}</Text>}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCardStyle: {
    borderBottomColor: '#b2b2b2',
    margin: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomStartRadius: 10,
    alignContent: 'flex-end',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});
