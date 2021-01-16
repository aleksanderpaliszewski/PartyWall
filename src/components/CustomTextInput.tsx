import React from 'react';
import {DefaultTheme, TextInput, Text} from 'react-native-paper';
import {Theme} from 'react-native-paper/src/types';

import globalStyles, {COLORS, SPACING} from '../utils/styles';
import {StyleSheet} from 'react-native';

const theme: Theme = {
  ...DefaultTheme,
  roundness: 7,
  colors: {
    ...DefaultTheme.colors,
    placeholder: COLORS.border,
    text: COLORS.black,
    background: COLORS.white,
  },
};

const CustomTextInput = ({error = '', style = {}, ...props}) => (
  <>
    <TextInput
      {...props}
      mode="outlined"
      theme={theme}
      underlineColor={COLORS.border}
      placeholderTextColor={COLORS.secondary}
      style={[styles.input, globalStyles.shadow, style]}
      error={!!error}
    />
    {!!error && <Text style={styles.textError}>{error}</Text>}
  </>
);

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginVertical: SPACING.Vertical,
  },
  textError: {
    color: COLORS.error,
    fontSize: 14,
    marginLeft: SPACING.Vertical,
  },
});

export default CustomTextInput;
