import {User} from '../api/interface';
import Api, {APIError} from '../utils/api';
import {useCallback, useMemo} from 'react';
import {AxiosError} from 'axios';

export const useAuth = (setUser: (user: User | null) => void) => {
  const setAuthData = (user: User) => {
    Api.setToken(user.jwtToken);
    setUser(user);
  };

  const resetAuthData = useCallback(() => {
    Api.resetToken();
    setUser(null);
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

  return {
    setAuthData,
    resetAuthData,
    api,
  };
};
