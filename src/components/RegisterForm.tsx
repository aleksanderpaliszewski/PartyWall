import React, {FC} from 'react';
import {View} from 'react-native';
import {Formik, FormikValues} from 'formik';
import {Button} from 'react-native-paper';

import CustomTextInput from '../components/CustomTextInput';
import {RegisterSchema} from '../utils/schemas';
import Layout from './Layout';

import styles from '../utils/styles';

interface RegisterForm {
  loading: boolean;
  navigateToLogin: () => void;
  handleSubmit: (values: FormikValues) => void;
}

const RegisterForm: FC<RegisterForm> = ({
  loading,
  handleSubmit,
  navigateToLogin,
}) => (
  <Layout>
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Formik
          initialValues={{
            username: '',
            password: '',
            passwordConfirmation: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={({username, password}) =>
            handleSubmit({username, password})
          }>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <CustomTextInput
                testID="username"
                fieldName="username"
                placeholder="Username"
                label="Username"
                textContentType="nickname"
                autoCapitalize="none"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={(touched.username && errors.username) || ''}
              />
              <CustomTextInput
                secureTextEntry
                testID="password"
                placeholder="Password"
                label="Password"
                fieldName="password"
                textContentType="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={(touched.password && errors.password) || ''}
              />
              <CustomTextInput
                secureTextEntry
                testID="passwordConfirmation"
                placeholder="Password confirmation"
                label="Password confirmation"
                fieldName="passwordConfirmation"
                textContentType="none"
                value={values.passwordConfirmation}
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={handleBlur('passwordConfirmation')}
                error={
                  (touched.passwordConfirmation &&
                    errors.passwordConfirmation) ||
                  ''
                }
              />
              <Button
                style={styles.button}
                mode="contained"
                testID="button"
                loading={loading}
                disabled={loading}
                onPress={handleSubmit}>
                Register
              </Button>
            </>
          )}
        </Formik>
        <Button style={styles.button} mode="text" onPress={navigateToLogin}>
          Log in
        </Button>
      </View>
    </View>
  </Layout>
);

export default RegisterForm;
