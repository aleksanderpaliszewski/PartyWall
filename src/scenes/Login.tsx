import React, {FC, useState, useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {FormikValues} from 'formik';
import {Button} from 'react-native-paper';

import {LoginStackScreenProps} from '../navigations/Login';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import ApiContext from '../utils/apiContext';
import UserContext from '../utils/userContext';
import SnackBarContext from '../utils/snackbarContext';
import {Scenes} from '../api/enums';
import {User} from '../api/interface';

import globalStyles from '../utils/styles';

const Login: FC<LoginStackScreenProps<Scenes.Login>> = ({navigation}) => {
  const api = useContext(ApiContext);
  const {setAuthData} = useContext(UserContext);
  const {setMessage} = useContext(SnackBarContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = ({email, password}: FormikValues) => {
    setLoading(true);

    return api
      .post<User>('auth/login', {email, password})
      .then(({data}) => setAuthData(data))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always">
        <View style={globalStyles.inputContainer}>
          <LoginForm handleSubmit={handleSubmit} loading={loading} />
          <Button
            style={globalStyles.button}
            mode="text"
            onPress={() => navigation.replace(Scenes.Register)}>
            Register
          </Button>
        </View>
      </ScrollView>
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
