import {StatusBar, StyleSheet} from 'react-native';

export const COLORS = {
  primary: '#301cbe',
  secondary: '#730040',
  background: '#F0F0F0',
  border: '#dcdcdc',
  dark: '#322f3d',
  white: '#FFFFFF',
  black: '#000000',
  error: '#AE1C23',
};

export const SPACING = {
  Horizontal: 15,
  Vertical: 10,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2 * SPACING.Horizontal,
    marginVertical: 2 * SPACING.Vertical,
  },
  grow: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statusBar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  text: {
    color: COLORS.white,
  },
  header: {
    fontSize: 30,
    color: COLORS.white,
  },
  content: {
    fontSize: 16,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContainer: {
    width: '100%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 2 * SPACING.Horizontal,
    paddingTop: 6 * SPACING.Vertical,
    paddingBottom: 3 * SPACING.Vertical,
    backgroundColor: COLORS.white,
  },
  button: {
    marginTop: 2 * SPACING.Vertical,
    alignSelf: 'center',
    borderRadius: 30,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
