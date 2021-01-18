import 'react-native';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

Enzyme.configure({adapter: new Adapter()});
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native-reanimated', () => {
  const mock = require('react-native-reanimated/mock');
  const getValue = (node) => {
    if (typeof node === 'number') {
      return node;
    }

    return node && node.__value;
  };
  mock.default.cond = (a, b, c) => (getValue(a) ? b : c);
  mock.default.call = (a, b) => {};

  return mock;
});
