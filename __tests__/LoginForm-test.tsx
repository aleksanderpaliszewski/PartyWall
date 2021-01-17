import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  GetByAPI,
} from '@testing-library/react-native';
import LoginForm from '../src/components/LoginForm';
import {ReactTestInstance} from 'react-test-renderer';
import {FormikValues} from 'formik';

describe('login form', () => {
  let getByTestId: (text: string | RegExp) => ReactTestInstance;
  let getByText: (text: string | RegExp) => ReactTestInstance;
  let mockHandleSubmit: (values: FormikValues) => void;
  let mockNavigate: () => void;

  beforeEach(() => {
    mockHandleSubmit = jest.fn();
    mockNavigate = jest.fn();

    const wrapper = render(
      <LoginForm
        handleSubmit={mockHandleSubmit}
        navigateToRegister={mockNavigate}
        loading={false}
      />,
    ) as GetByAPI;
    getByTestId = wrapper.getByTestId;
    getByText = wrapper.getByText;
  });

  it('should have email validation error', async () => {
    const email = getByTestId('email');
    const button = getByText('Log in');

    await waitFor(() => fireEvent.changeText(email, 'wrongEmail'));
    await waitFor(() => fireEvent.press(button));

    expect(getByText('Invalid email')).toBeTruthy();
  });

  it('should have password validation error', async () => {
    const email = getByTestId('password');
    const button = getByText('Log in');

    await waitFor(() => fireEvent.changeText(email, '123'));
    await waitFor(() => fireEvent.press(button));

    expect(
      getByText('Password must have a minimum of 8 characters'),
    ).toBeTruthy();
  });

  it('should allows the user to log in', async () => {
    const email = getByTestId('email');
    const password = getByTestId('password');
    const button = getByText('Log in');

    await waitFor(() => fireEvent.changeText(email, 'mock@email.com'));
    await waitFor(() => fireEvent.changeText(password, 'mockPassword'));
    await waitFor(() => fireEvent.press(button));

    expect(mockHandleSubmit).toBeCalledWith(
      {
        email: 'mock@email.com',
        password: 'mockPassword',
      },
      expect.anything(),
    );
  });
});
