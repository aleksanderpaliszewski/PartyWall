import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import LoginForm from '../src/components/LoginForm';

describe('login form', () => {
  it('should have email validation error', async () => {
    const mockFn = jest.fn();

    const {getByTestId, getByText} = render(
      <LoginForm handleSubmit={mockFn} loading={false} />,
    );
    const email = getByTestId('email');
    const button = getByText('Log in');

    await waitFor(() => fireEvent.changeText(email, 'wrongEmail'));
    await waitFor(() => fireEvent.press(button));

    expect(getByText('Invalid email')).toBeTruthy();
  });

  it('should have password validation error', async () => {
    const mockFn = jest.fn();

    const {getByTestId, getByText} = render(
      <LoginForm handleSubmit={mockFn} loading={false} />,
    );
    const email = getByTestId('password');
    const button = getByText('Log in');

    await waitFor(() => fireEvent.changeText(email, '123'));
    await waitFor(() => fireEvent.press(button));

    expect(
      getByText('Password must have a minimum of 8 characters'),
    ).toBeTruthy();
  });

  it('should allows the user to log in', async () => {
    const mockFn = jest.fn();

    const {getByTestId, getByText} = render(
      <LoginForm handleSubmit={mockFn} loading={false} />,
    );
    const email = getByTestId('email');
    const password = getByTestId('password');
    const button = getByText('Log in');

    await waitFor(() => fireEvent.changeText(email, 'mock@email.com'));
    await waitFor(() => fireEvent.changeText(password, 'mockPassword'));
    await waitFor(() => fireEvent.press(button));

    expect(mockFn).toBeCalledWith(
      {
        email: 'mock@email.com',
        password: 'mockPassword',
      },
      expect.anything(),
    );
  });
});
