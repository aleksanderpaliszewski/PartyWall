import React, {FC} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

import Layout from './Layout';
import DrinkCard from './DrinkCard';
import FoodCard from './FoodCard';
import EmptyList from './EmptyList';
import {ProductType} from '../api/types';
import {Drink} from '../api/interface';
import {PRODUCTS_PER_SCREEN} from '../scenes/Home';

import globalStyles, {COLORS, SPACING} from '../utils/styles';

interface ProductList {
  isLoading: boolean;
  products: ProductType[];
  reload: () => void;
  resetAuthData: () => void;
  fetchMoreProducts: () => void;
  navigateToProduct: () => void;
  isDrink: (product: ProductType) => product is Drink;
}

const ProductList: FC<ProductList> = ({
  isLoading,
  products,
  fetchMoreProducts,
  resetAuthData,
  isDrink,
  reload,
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
        renderItem={({item}) =>
          isDrink(item) ? (
            <DrinkCard product={item} />
          ) : (
            <FoodCard product={item} />
          )
        }
        onEndReached={() => {
          if (products.length >= PRODUCTS_PER_SCREEN) {
            fetchMoreProducts();
          }
        }}
        refreshControl={
          <RefreshControl
            style={styles.refreshControl}
            colors={[COLORS.primary, COLORS.secondary]}
            refreshing={isLoading}
            onRefresh={reload}
          />
        }
        ListEmptyComponent={<EmptyList />}
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
});

export default ProductList;
