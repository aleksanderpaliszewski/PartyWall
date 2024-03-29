import {DefaultTheme, useTheme as useDefaultTheme} from 'react-native-paper';
import {Theme} from 'react-native-paper/src/types';

import {COLORS} from './styles';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.secondary,
    placeholder: COLORS.border,
    text: COLORS.black,
    background: COLORS.white,
  },
};

export default theme;

export function useTheme() {
  return useDefaultTheme(theme);
}
