import React, {FC} from 'react';
import {NavigationContainer as Container} from '@react-navigation/native';

import LoginStack from './Login';
import HomeStack from './Home';
import {User} from '../api/interface';

interface Props {
  user: User | null;
}

const NavigationContainer: FC<Props> = ({user}) => {
  return <Container>{user ? <HomeStack /> : <LoginStack />}</Container>;
};

export default NavigationContainer;
