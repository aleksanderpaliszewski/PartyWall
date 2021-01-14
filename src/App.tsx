import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-native-paper';

import Home from './scenes/Home';
import theme from './utils/theme';

import {COLORS} from './utils/styles';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: COLORS.white,
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerTransparent: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
