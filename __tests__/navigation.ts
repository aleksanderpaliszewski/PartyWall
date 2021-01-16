import {
  LoginStackScreenProps,
  ScreenName as LoginScreenName,
} from '../src/navigations/Login';
import {
  HomeStackScreenProps,
  ScreenName as HomeScreenName,
} from '../src/navigations/Home';
import {Scenes} from '../src/api/enums';

function getPropsMock(sn: LoginScreenName | HomeScreenName) {
  return {
    navigation: {
      goBack: jest.fn(),
      navigate: jest.fn(),
      addListener: jest.fn(),
      canGoBack: jest.fn(),
      closeDrawer: jest.fn(),
      dangerouslyGetParent: jest.fn(),
      dangerouslyGetState: jest.fn(),
      dispatch: jest.fn(),
      isFocused: jest.fn(),
      jumpTo: jest.fn(),
      openDrawer: jest.fn(),
      pop: jest.fn(),
      popToTop: jest.fn(),
      push: jest.fn(),
      removeListener: jest.fn(),
      replace: jest.fn(),
      reset: jest.fn(),
      setOptions: jest.fn(),
      setParams: jest.fn(),
      toggleDrawer: jest.fn(),
    },
    route: {
      key: '1',
      name: sn,
      params: undefined,
    },
  };
}

export function getLoginProps() {
  return getPropsMock(Scenes.Login) as LoginStackScreenProps<Scenes.Login>;
}

export function getRegisterProps() {
  return getPropsMock(
    Scenes.Register,
  ) as LoginStackScreenProps<Scenes.Register>;
}

export function getHomeProps() {
  return getPropsMock(Scenes.Home) as HomeStackScreenProps<Scenes.Home>;
}
