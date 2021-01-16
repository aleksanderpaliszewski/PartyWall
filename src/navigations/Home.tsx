import React from 'react';
import {Scenes} from '../api/enums';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import Home from '../scenes/Home';

export type ScreenName = Scenes.Home;

export type StackParamList = {
  [Scenes.Home]: undefined;
};

export interface HomeStackScreenProps<T extends ScreenName> {
  navigation: StackNavigationProp<StackParamList, T>;
  route: RouteProp<StackParamList, T>;
}

const {Navigator, Screen} = createStackNavigator<StackParamList>();

const HomeStackScreen = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={Scenes.Home} component={Home} />
    </Navigator>
  );
};

export default HomeStackScreen;
