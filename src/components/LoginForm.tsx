import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik, FormikValues} from 'formik';
import {Button} from 'react-native-paper';

import CustomTextInput from '../components/CustomTextInput';
import {LogInSchema} from '../utils/schemas';

import {COLORS, SPACING} from '../utils/styles';

interface LoginForm {
  loading: boolean;
  handleSubmit: (values: FormikValues) => void;
}

const LoginForm: FC<LoginForm> = ({handleSubmit, loading}) => (
  <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    validationSchema={LogInSchema}
    onSubmit={handleSubmit}>
    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
      <View style={styles.inputContainer}>
        <CustomTextInput
          testID="email"
          fieldName="email"
          placeholder="E-mail"
          label="E-mail"
          textContentType="emailAddress"
          autoCapitalize="none"
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          error={(touched.email && errors.email) || ''}
        />
        <CustomTextInput
          secureTextEntry
          testID="password"
          fieldName="password"
          placeholder="Password"
          label="Password"
          textContentType="password"
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={(touched.password && errors.password) || ''}
        />
        <Button
          style={styles.button}
          mode="contained"
          testID="button"
          loading={loading}
          disabled={loading}
          onPress={handleSubmit}>
          Log in
        </Button>
      </View>
    )}
  </Formik>
);

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 2 * SPACING.Horizontal,
    paddingVertical: 6 * SPACING.Vertical,
    backgroundColor: COLORS.white,
    opacity: 0.95,
  },
  header: {
    marginBottom: 2 * SPACING.Vertical,
    textAlign: 'center',
    position: 'absolute',
    top: 50,
  },
  button: {
    marginTop: 3 * SPACING.Vertical,
    width: 100,
    alignSelf: 'center',
  },
});

export default LoginForm;
