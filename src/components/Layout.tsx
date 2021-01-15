import React, {FC} from 'react';
import {KeyboardAvoidingView, StatusBar, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {isIos} from '../utils/constants';

import {COLORS} from '../utils/styles';

const Layout: FC = ({children}) => {
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      style={styles.linearGradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <KeyboardAvoidingView
        style={[styles.grow, styles.statusBar]}
        behavior={isIos ? 'padding' : 'height'}>
        {children}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  grow: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statusBar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  linearGradient: {
    flex: 1,
    opacity: 0.8,
  },
});

export default Layout;
