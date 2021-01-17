import React, {FC} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Formik, FormikValues} from 'formik';
import {Button} from 'react-native-paper';

import Layout from './Layout';
import CustomTextInput from '../components/CustomTextInput';
import {LogInSchema} from '../utils/schemas';

import globalStyles from '../utils/styles';

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
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always">
      <View style={globalStyles.inputContainer}>
        <Formik
          initialValues={{
            email: '',
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
        <Button
          style={globalStyles.button}
          mode="text"
          onPress={navigateToRegister}>
          Register
        </Button>
      </View>
    </ScrollView>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default LoginForm;
