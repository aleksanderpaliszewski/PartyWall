import {createContext} from 'react';

interface Snackbar {
  setMessage: (message: string) => unknown;
}

const SnackBarContext = createContext<Snackbar>({
  setMessage: () => null,
});

export default SnackBarContext;
