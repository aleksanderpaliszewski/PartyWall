import 'react-native-gesture-handler';
import React, {useState, useMemo} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, Snackbar} from 'react-native-paper';

import Home from './scenes/Home';
import Login from './scenes/Login';
import theme from './utils/theme';
import UserContext from './utils/userContext';
import Scenes from './navigations/Scenes';
import {User} from './api/interface';
import SnackBarContext from './utils/snackbarContext';
import {useAuth} from './hooks/useAuth';
import ApiContext from './utils/apiContext';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const {api, setAuthData, resetAuthData} = useAuth(setUser);

  const Stack = createStackNavigator();

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
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                {user ? (
                  <Stack.Screen
                    name={Scenes.Home}
                    component={Home}
                    options={{headerTransparent: true}}
                  />
                ) : (
                  <Stack.Screen
                    name={Scenes.Login}
                    component={Login}
                    options={{headerTransparent: true}}
                  />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </SnackBarContext.Provider>
          <View>
            <Snackbar
              visible={!!errorMessage}
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
