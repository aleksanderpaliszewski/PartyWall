import React, {FC, useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {FormikValues} from 'formik';

import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import ApiContext from '../utils/apiContext';
import UserContext from '../utils/userContext';
import {User} from '../api/interface';

const Login: FC = () => {
  const api = useContext(ApiContext);
  const {setUser} = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = ({email, password}: FormikValues) => {
    setLoading(true);

    return api
      .post<User>('auth/login', {email, password})
      .then(({data}) => setUser(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <View style={styles.container}>
        <LoginForm handleSubmit={handleSubmit} loading={loading} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default Login;