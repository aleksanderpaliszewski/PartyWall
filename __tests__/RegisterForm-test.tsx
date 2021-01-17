import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  GetByAPI,
} from '@testing-library/react-native';
import RegisterForm from '../src/components/RegisterForm';
import {ReactTestInstance} from 'react-test-renderer';
import {FormikValues} from 'formik';

describe('register form', () => {
  let getByTestId: (text: string | RegExp) => ReactTestInstance;
  let getByText: (text: string | RegExp) => ReactTestInstance;
  let mockHandleSubmit: (values: FormikValues) => void;
  let mockNavigate: () => void;

  beforeEach(() => {
    mockHandleSubmit = jest.fn();
    mockNavigate = jest.fn();

    const wrapper = render(
      <RegisterForm
        handleSubmit={mockHandleSubmit}
        navigateToLogin={mockNavigate}
        loading={false}
      />,
    ) as GetByAPI;
    getByTestId = wrapper.getByTestId;
    getByText = wrapper.getByText;
  });

  it('should have username validation error', async () => {
    const username = getByTestId('username');
    const button = getByText('Register');

    await waitFor(() => fireEvent.changeText(username, ''));
    await waitFor(() => fireEvent.press(button));

    expect(getByText('Enter username')).toBeTruthy();
  });

  it('should have repeat password validation error', async () => {
    const password = getByTestId('password');
    const button = getByText('Register');

    await waitFor(() => fireEvent.changeText(password, 'mockPassword'));
    await waitFor(() => fireEvent.press(button));

    expect(getByText('Repeat password')).toBeTruthy();
  });

  it('should have password are not the same validation error', async () => {
    const password = getByTestId('password');
    const passwordConfirmation = getByTestId('passwordConfirmation');
    const button = getByText('Register');

    await waitFor(() => fireEvent.changeText(password, 'mockPassword'));
    await waitFor(() =>
      fireEvent.changeText(passwordConfirmation, 'mockPassword2'),
    );
    await waitFor(() => fireEvent.press(button));

    expect(getByText('The entered passwords are not the same')).toBeTruthy();
  });

  it('should allows the user to register', async () => {
    const username = getByTestId('username');
    const password = getByTestId('password');
    const passwordConfirmation = getByTestId('passwordConfirmation');
    const button = getByText('Register');

    await waitFor(() => fireEvent.changeText(username, 'mockUser'));
    await waitFor(() =>
      fireEvent.changeText(passwordConfirmation, 'mockPassword'),
    );
    await waitFor(() => fireEvent.changeText(password, 'mockPassword'));
    await waitFor(() => fireEvent.press(button));

    expect(mockHandleSubmit).toBeCalledWith({
      username: 'mockUser',
      password: 'mockPassword',
    });
  });
});
