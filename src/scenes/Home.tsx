import React, {FC, useContext, useState, useEffect} from 'react';
import _ from 'lodash';

import ProductList from '../components/ProductList';
import UserContext from '../utils/userContext';
import {HomeStackScreenProps} from '../navigations/Home';
import {useFetch} from '../hooks/useFetch';
import {Scenes} from '../api/enums';
import {ProductType} from '../api/types';
import {Drink, Food} from '../api/interface';

export const PRODUCTS_PER_SCREEN = 10;

const Home: FC<HomeStackScreenProps<Scenes.Home>> = () => {
  const {resetAuthData} = useContext(UserContext);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [offset, setOffset] = useState(0);

  const {data, updateUrl, reload, isLoading} = useFetch<ProductType[]>(
    `/products?_start=${offset}&_limit=${PRODUCTS_PER_SCREEN}`,
    [],
  );

  useEffect(() => {
    if (!data) {
      return;
    } else if (offset > 0) {
      setProducts((products) => _.union(products, data));
    } else {
      setProducts(data);
    }
  }, [data, updateUrl, offset]);

  const fetchMoreProducts = () => {
    const newOffset = offset + 10;
    setOffset(newOffset);

    if (data?.length) {
      updateUrl(`/products?_start=${newOffset}&_limit=${PRODUCTS_PER_SCREEN}`);
    }
  };

  const isDrink = (product: Food | Drink): product is Drink =>
    !!(product as Drink).volume;

  return (
    <ProductList
      isLoading={isLoading}
      products={products}
      reload={reload}
      resetAuthData={resetAuthData}
      fetchMoreProducts={fetchMoreProducts}
      isDrink={isDrink}
    />
  );
};

export default Home;
