import {StatusBar, StyleSheet} from 'react-native';

export const COLORS = {
  primary: '#301cbe',
  secondary: '#730040',
  background: '#F0F0F0',
  dark: '#322f3d',
  white: '#FFFFFF',
  black: '#000000',
};

export default StyleSheet.create({
  grow: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  text: {
    color: COLORS.white,
  },
  header: {
    fontSize: 24,
  },
  content: {
    fontSize: 16,
  },
  linearGradient: {
    flex: 1,
    opacity: 0.8,
  },
});
