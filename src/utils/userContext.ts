import {createContext} from 'react';
import {User} from '../api/interface';

interface UserContext {
  user: User | null;
  setAuthData: (user: User) => unknown;
  resetAuthData: () => unknown;
}

const UserContext = createContext<UserContext>({
  user: null,
  setAuthData: () => null,
  resetAuthData: () => null,
});

export default UserContext;
