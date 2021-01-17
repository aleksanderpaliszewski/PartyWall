import React, {FC} from 'react';
import {ScrollView, View} from 'react-native';
import {Formik, FormikValues} from 'formik';
import {Button} from 'react-native-paper';

import Layout from './Layout';
import CustomTextInput from '../components/CustomTextInput';
import {LogInSchema} from '../utils/schemas';

import styles from '../utils/styles';

interface LoginForm {
  loading: boolean;
  navigateToRegister: () => void;
  handleSubmit: (values: FormikValues) => void;
}

const LoginForm: FC<LoginForm> = ({
  handleSubmit,
  navigateToRegister,
  loading,
}) => (
  <Layout>
    <ScrollView
      contentContainerStyle={styles.formContainer}
      keyboardShouldPersistTaps="always">
      <View style={styles.inputContainer}>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={LogInSchema}
          onSubmit={handleSubmit}>
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
                textContentType="none"
                autoCapitalize="none"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={(touched.username && errors.username) || ''}
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
            </>
          )}
        </Formik>
        <Button style={styles.button} mode="text" onPress={navigateToRegister}>
          Register
        </Button>
      </View>
    </ScrollView>
  </Layout>
);

export default LoginForm;
