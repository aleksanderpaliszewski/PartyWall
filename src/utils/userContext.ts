import {createContext} from 'react';
import {User} from '../api/interface';

interface UserContext {
  user: User | null;
  setUser: (user: User | null) => unknown;
}

const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => null,
});

export default UserContext;
