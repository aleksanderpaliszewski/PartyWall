import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import RegisterForm from '../src/components/RegisterForm';

describe('register form', () => {
  it('should have email validation error', async () => {
    const mockFn = jest.fn();

    const {getByTestId, getByText} = render(
      <RegisterForm register={mockFn} loading={false} />,
    );
    const email = getByTestId('email');
    const button = getByText('Register');

    await waitFor(() => fireEvent.changeText(email, 'wrongEmail'));
    await waitFor(() => fireEvent.press(button));

    expect(getByText('Invalid email')).toBeTruthy();
  });

  it('should have repeat password validation error', async () => {
    const mockFn = jest.fn();

    const {getByTestId, getByText} = render(
      <RegisterForm register={mockFn} loading={false} />,
    );
    const email = getByTestId('password');
    const button = getByText('Register');

    await waitFor(() => fireEvent.changeText(email, 'test@test.pl'));
    await waitFor(() => fireEvent.press(button));

    expect(getByText('Repeat password')).toBeTruthy();
  });

  it('should have password are not the same validation error', async () => {
    const mockFn = jest.fn();

    const {getByTestId, getByText} = render(
      <RegisterForm register={mockFn} loading={false} />,
    );
    const email = getByTestId('password');
    const passwordConfirmation = getByTestId('passwordConfirmation');
    const button = getByText('Register');

    await waitFor(() => fireEvent.changeText(email, 'test@test.pl'));
    await waitFor(() =>
      fireEvent.changeText(passwordConfirmation, 'test2@test.pl'),
    );
    await waitFor(() => fireEvent.press(button));

    expect(getByText('The entered passwords are not the same')).toBeTruthy();
  });

  it('should allows the user to register', async () => {
    const mockFn = jest.fn();

    const {getByTestId, getByText} = render(
      <RegisterForm register={mockFn} loading={false} />,
    );
    const email = getByTestId('email');
    const password = getByTestId('password');
    const passwordConfirmation = getByTestId('passwordConfirmation');
    const button = getByText('Register');

    await waitFor(() => fireEvent.changeText(email, 'mock@email.com'));
    await waitFor(() =>
      fireEvent.changeText(passwordConfirmation, 'mockPassword'),
    );
    await waitFor(() => fireEvent.changeText(password, 'mockPassword'));
    await waitFor(() => fireEvent.press(button));

    expect(mockFn).toBeCalledWith({
      email: 'mock@email.com',
      password: 'mockPassword',
    });
  });
});
