import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-native-paper';

import Home from './scenes/Home';
import Login from './scenes/Login';
import theme from './utils/theme';
import UserContext from './utils/userContext';
import Scenes from './navigations/Scenes';
import {User} from './api/interface';

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const Stack = createStackNavigator();

  return (
    <Provider theme={theme}>
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}>
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
      </UserContext.Provider>
    </Provider>
  );
};

export default App;
