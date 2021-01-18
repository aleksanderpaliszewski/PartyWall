import React, {FC} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

import Layout from './Layout';
import ProductCard from './ProductCard';
import {ProductType} from '../api/types';
import {PRODUCTS_PER_SCREEN} from '../scenes/Home';
import {NO_PRODUCTS_TEXT} from '../utils/constants';

import globalStyles, {COLORS, SPACING} from '../utils/styles';

interface ProductList {
  isLoading: boolean;
  products: ProductType[];
  reload: () => void;
  resetAuthData: () => void;
  fetchMoreProducts: () => void;
  navigateToProduct: () => void;
  deleteProduct: (id: number) => void;
}

const ProductList: FC<ProductList> = ({
  isLoading,
  products,
  fetchMoreProducts,
  resetAuthData,
  reload,
  deleteProduct,
  navigateToProduct,
}) => (
  <Layout>
    <View style={globalStyles.appBar}>
      <Button
        mode="text"
        style={globalStyles.logoutButton}
        labelStyle={globalStyles.logoutButtonLabel}
        onPress={resetAuthData}>
        Log out
      </Button>
    </View>
    <View style={globalStyles.roundedContainer}>
      <FlatList
        data={products}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        keyExtractor={({id}) => id.toString()}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <ProductCard product={item} deleteProduct={deleteProduct} />
        )}
        onEndReached={() => {
          if (products.length >= PRODUCTS_PER_SCREEN) {
            fetchMoreProducts();
          }
        }}
        refreshControl={
          <RefreshControl
            testID="refreshControl"
            style={styles.refreshControl}
            colors={[COLORS.primary, COLORS.secondary]}
            refreshing={isLoading}
            onRefresh={reload}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text>{NO_PRODUCTS_TEXT}</Text>
          </View>
        }
      />
      <Button
        style={[globalStyles.button, styles.fab]}
        mode="contained"
        testID="button"
        onPress={navigateToProduct}>
        Add product
      </Button>
    </View>
  </Layout>
);

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
    overflow: 'hidden',
  },
  flatListContent: {
    paddingBottom: 6 * SPACING.Vertical,
  },
  refreshControl: {
    paddingTop: 2 * SPACING.Vertical,
  },
  fab: {
    position: 'absolute',
    margin: SPACING.Vertical,
    bottom: 2 * SPACING.Vertical,
  },
  emptyList: {
    alignSelf: 'center',
  },
});

export default ProductList;
