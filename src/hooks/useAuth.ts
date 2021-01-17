import {User} from '../api/interface';
import Api, {APIError} from '../utils/api';
import {useCallback, useMemo, useEffect} from 'react';
import {AxiosError} from 'axios';
import Storage from '../utils/storage';

export const useAuth = (
  setUser: (user: User | null) => void,
  setErrorMessage: (message: string) => void,
) => {
  const setAuthData = useCallback(
    (user: User) => {
      Api.setToken(user.jwtToken);
      setUser(user);
      Storage.setItem('user', user);
    },
    [setUser],
  );

  const resetAuthData = useCallback(() => {
    Api.resetToken();
    setUser(null);
    Storage.removeItem('user');
  }, [setUser]);

  const api = useMemo(() => {
    const handleUnauthorized = (error: APIError | AxiosError) => {
      if (error instanceof APIError && error.status === 401) {
        resetAuthData();
      }
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response!.status === 401
      ) {
        resetAuthData();
      }
      throw error;
    };

    return new Api(handleUnauthorized);
  }, [resetAuthData]);

  useEffect(() => {
    Storage.getItem<User>('user').then((user) => {
      if (!user) {
        return;
      }
      setAuthData(user);

      return api.get('/hello').catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage('Zaloguj się ponownie');
        }
      });
    });
  }, [api, setAuthData, setErrorMessage]);

  return {
    setAuthData,
    resetAuthData,
    api,
  };
};
