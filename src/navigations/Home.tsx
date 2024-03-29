import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import Home from '../scenes/Home';
import Product from '../scenes/Product';
import {Scenes} from '../api/enums';

export type ScreenName = Scenes.Home | Scenes.Product;

export type StackParamList = {
  [Scenes.Home]: undefined;
  [Scenes.Product]: undefined;
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
      <Screen name={Scenes.Product} component={Product} />
    </Navigator>
  );
};

export default HomeStackScreen;
