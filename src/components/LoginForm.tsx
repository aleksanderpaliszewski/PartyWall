import React, {FC} from 'react';
import {Formik, FormikValues} from 'formik';
import {Button} from 'react-native-paper';

import CustomTextInput from '../components/CustomTextInput';
import {LogInSchema} from '../utils/schemas';

import globalStyles from '../utils/styles';

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
      <>
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
          style={globalStyles.button}
          mode="contained"
          testID="button"
          loading={loading}
          disabled={loading}
          onPress={handleSubmit}>
          Log in
        </Button>
      </>
    )}
  </Formik>
);

export default LoginForm;
