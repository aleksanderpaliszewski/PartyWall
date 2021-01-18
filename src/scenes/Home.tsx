import React, {FC, useContext, useState, useEffect} from 'react';
import {union} from 'lodash';

import ProductList from '../components/ProductList';
import ApiContext from '../contexts/apiContext';
import SnackBarContext from '../contexts/snackbarContext';
import UserContext from '../contexts/userContext';
import {HomeStackScreenProps} from '../navigations/Home';
import {useFetch} from '../hooks/useFetch';
import {Scenes} from '../api/enums';
import {ProductType} from '../api/types';

export const PRODUCTS_PER_SCREEN = 10;

const Home: FC<HomeStackScreenProps<Scenes.Home>> = ({navigation}) => {
  const api = useContext(ApiContext);
  const {resetAuthData} = useContext(UserContext);
  const {setMessage} = useContext(SnackBarContext);
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
      setProducts((ps) => union(ps, data));
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

  const deleteProduct = (id: number) =>
    api
      .delete(`/products/${id}`)
      .then(reload)
      .catch(({message}) => setMessage(message));

  const navigateToProduct = () => navigation.replace(Scenes.Product);

  return (
    <ProductList
      isLoading={isLoading}
      products={products}
      reload={reload}
      resetAuthData={resetAuthData}
      deleteProduct={deleteProduct}
      fetchMoreProducts={fetchMoreProducts}
      navigateToProduct={navigateToProduct}
    />
  );
};

export default Home;
