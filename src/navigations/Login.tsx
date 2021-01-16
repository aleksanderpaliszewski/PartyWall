import React from 'react';
import {Scenes} from '../api/enums';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import Login from '../scenes/Login';
import Register from '../scenes/Register';

export type ScreenName = Scenes.Login | Scenes.Register;

export type StackParamList = {
  [Scenes.Login]: undefined;
  [Scenes.Register]: undefined;
};

export interface LoginStackScreenProps<T extends ScreenName> {
  navigation: StackNavigationProp<StackParamList, T>;
  route: RouteProp<StackParamList, T>;
}

const {Navigator, Screen} = createStackNavigator<StackParamList>();

const LoginStackScreen = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={Scenes.Login} component={Login} />
      <Screen name={Scenes.Register} component={Register} />
    </Navigator>
  );
};

export default LoginStackScreen;
