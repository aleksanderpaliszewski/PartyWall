import 'react-native-gesture-handler';
import React, {useState, useMemo} from 'react';
import {View} from 'react-native';
import {Provider, Snackbar} from 'react-native-paper';

import NavigationContainer from './navigations/Container';
import {useAuth} from './hooks/useAuth';
import UserContext from './contexts/userContext';
import SnackBarContext from './contexts/snackbarContext';
import ApiContext from './contexts/apiContext';
import {User} from './api/interface';
import theme from './utils/theme';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const {api, setAuthData, resetAuthData} = useAuth(setUser, setErrorMessage);

  const snackbarControls = useMemo(
    () => ({
      setMessage(message: string) {
        setErrorMessage(message);
      },
    }),
    [],
  );

  return (
    <Provider theme={theme}>
      <ApiContext.Provider value={api}>
        <UserContext.Provider value={{user, setAuthData, resetAuthData}}>
          <SnackBarContext.Provider value={snackbarControls}>
            <NavigationContainer user={user} />
          </SnackBarContext.Provider>
          <View>
            <Snackbar
              visible={!!errorMessage}
              duration={2000}
              onDismiss={() => setErrorMessage('')}>
              {errorMessage}
            </Snackbar>
          </View>
        </UserContext.Provider>
      </ApiContext.Provider>
    </Provider>
  );
};

export default App;
