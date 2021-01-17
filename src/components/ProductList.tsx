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

import {COLORS, SPACING} from '../utils/styles';

interface ProductList {
  isLoading: boolean;
  products: ProductType[];
  reload: () => void;
  resetAuthData: () => void;
  fetchMoreProducts: () => void;
  isDrink: (product: ProductType) => product is Drink;
}

const ProductList: FC<ProductList> = ({
  products,
  fetchMoreProducts,
  resetAuthData,
  isDrink,
  isLoading,
  reload,
}) => (
  <Layout>
    <View style={styles.buttonWrapper}>
      <Button
        mode="text"
        style={styles.button}
        labelStyle={styles.buttonLabel}
        onPress={resetAuthData}>
        Log out
      </Button>
    </View>
    <View style={styles.container}>
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
    </View>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 10,
    opacity: 0.9,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 2 * SPACING.Vertical,
    paddingHorizontal: SPACING.Horizontal,
  },
  button: {
    alignSelf: 'flex-end',
  },
  buttonLabel: {
    color: COLORS.white,
  },
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
});

export default ProductList;
