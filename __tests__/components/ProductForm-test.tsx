import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import ProductForm from '../../src/components/ProductForm';

describe('product form', () => {
  it('should display volume', async () => {
    const {getByTestId} = render(
      <ProductForm loading={false} isDrink={true} handleSubmit={jest.fn()} />,
    );

    expect(getByTestId('volume')).toBeTruthy();
  });

  it('should not display volume', async () => {
    const {queryByTestId} = render(
      <ProductForm loading={false} isDrink={false} handleSubmit={jest.fn()} />,
    );

    expect(queryByTestId('volume')).toBeNull();
  });

  it('should display description and weight', async () => {
    const {getByTestId} = render(
      <ProductForm loading={false} isDrink={false} handleSubmit={jest.fn()} />,
    );

    expect(getByTestId('description')).toBeTruthy();
    expect(getByTestId('weight')).toBeTruthy();
  });

  it('should not display description and weight', async () => {
    const {queryByTestId} = render(
      <ProductForm loading={false} isDrink={true} handleSubmit={jest.fn()} />,
    );

    expect(queryByTestId('description')).toBeNull();
    expect(queryByTestId('weight')).toBeNull();
  });

  it('should show quantity validation error', async () => {
    const mockHandleSubmit = jest.fn();
    const {getByTestId, getByText} = render(
      <ProductForm
        loading={false}
        isDrink={false}
        handleSubmit={mockHandleSubmit}
      />,
    );

    const quantity = getByTestId('quantity');
    const button = getByText('Add product');

    await waitFor(() => fireEvent.changeText(quantity, 'abc'));
    await waitFor(() => fireEvent.press(button));

    expect(getByText('Invalid Input: numbers please')).toBeTruthy();
  });

  it('should allows add food', async () => {
    const mockHandleSubmit = jest.fn();
    const {getByTestId, getByText} = render(
      <ProductForm
        loading={false}
        isDrink={false}
        handleSubmit={mockHandleSubmit}
      />,
    );

    const name = getByTestId('name');
    const price = getByTestId('price');
    const quantity = getByTestId('quantity');
    const description = getByTestId('description');
    const weight = getByTestId('weight');
    const button = getByText('Add product');

    await waitFor(() => fireEvent.changeText(name, 'Lays'));
    await waitFor(() => fireEvent.changeText(price, '120$'));
    await waitFor(() => fireEvent.changeText(quantity, '150'));
    await waitFor(() => fireEvent.changeText(description, 'Chili'));
    await waitFor(() => fireEvent.changeText(weight, '1kg'));
    await waitFor(() => fireEvent.press(button));

    expect(mockHandleSubmit).toBeCalledWith(
      {
        name: 'Lays',
        price: '120$',
        quantity: '150',
        description: 'Chili',
        weight: '1kg',
        volume: '',
      },
      expect.anything(),
    );
  });

  it('should allows add drink', async () => {
    const mockHandleSubmit = jest.fn();
    const {getByTestId, getByText} = render(
      <ProductForm
        loading={false}
        isDrink={true}
        handleSubmit={mockHandleSubmit}
      />,
    );

    const name = getByTestId('name');
    const price = getByTestId('price');
    const quantity = getByTestId('quantity');
    const volume = getByTestId('volume');
    const button = getByText('Add product');

    await waitFor(() => fireEvent.changeText(name, 'Cola'));
    await waitFor(() => fireEvent.changeText(price, '120$'));
    await waitFor(() => fireEvent.changeText(quantity, '150'));
    await waitFor(() => fireEvent.changeText(volume, '2L'));
    await waitFor(() => fireEvent.press(button));

    expect(mockHandleSubmit).toBeCalledWith(
      {
        name: 'Cola',
        price: '120$',
        quantity: '150',
        description: '',
        weight: '',
        volume: '2L',
      },
      expect.anything(),
    );
  });
});
