import React from 'react';
import {GetByAPI, render} from '@testing-library/react-native';
import ProductList from '../src/components/ProductList';
import {NO_PRODUCTS} from '../src/components/EmptyList';

describe('product list', () => {
  it('should display no products text', async () => {
    const {getByText} = render(
      <ProductList
        isLoading={false}
        products={[]}
        reload={jest.fn()}
        resetAuthData={jest.fn()}
        fetchMoreProducts={jest.fn()}
        isDrink={jest.fn() as any}
        navigateToProduct={jest.fn()}
      />,
    ) as GetByAPI;

    expect(getByText(NO_PRODUCTS)).toBeTruthy();
  });
});
