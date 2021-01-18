import React from 'react';
import {GetByAPI, render} from '@testing-library/react-native';

import ProductList from '../../src/components/ProductList';
import {NO_PRODUCTS_TEXT} from '../../src/utils/constants';

const mockProducts = [
  {
    id: 1,
    name: 'Coca-cola',
    price: '120$',
    quantity: 2,
    volume: '2L',
  },
];

describe('product list', () => {
  it('should display no products text', async () => {
    const {getByText} = render(
      <ProductList
        isLoading={false}
        products={[]}
        reload={jest.fn()}
        resetAuthData={jest.fn()}
        fetchMoreProducts={jest.fn()}
        navigateToProduct={jest.fn()}
        deleteProduct={jest.fn()}
      />,
    ) as GetByAPI;

    expect(getByText(NO_PRODUCTS_TEXT)).toBeTruthy();
  });

  it('should display one product', async () => {
    const {getAllByTestId} = render(
      <ProductList
        isLoading={false}
        products={mockProducts}
        reload={jest.fn()}
        resetAuthData={jest.fn()}
        fetchMoreProducts={jest.fn()}
        navigateToProduct={jest.fn()}
        deleteProduct={jest.fn()}
      />,
    ) as GetByAPI;

    expect(getAllByTestId('product').length).toEqual(1);
  });
});
