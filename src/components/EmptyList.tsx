import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export const NO_PRODUCTS = 'There are no products on the board';

const EmptyList = () => (
  <View style={styles.emptyList}>
    <Text>{NO_PRODUCTS}</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyList: {
    alignSelf: 'center',
  },
});

export default EmptyList;
