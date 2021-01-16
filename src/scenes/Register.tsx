import React, {FC, useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {FormikValues} from 'formik';
import {Button} from 'react-native-paper';

import Layout from '../components/Layout';
import RegisterForm from '../components/RegisterForm';
import ApiContext from '../utils/apiContext';
import SnackBarContext from '../utils/snackbarContext';
import {LoginStackScreenProps} from '../navigations/Login';
import {Scenes} from '../api/enums';
import UserContext from '../utils/userContext';
import {User} from '../api/interface';

import globalStyles from '../utils/styles';

const Register: FC<LoginStackScreenProps<Scenes.Register>> = ({navigation}) => {
  const api = useContext(ApiContext);
  const {setAuthData} = useContext(UserContext);
  const {setMessage} = useContext(SnackBarContext);

  const [loading, setLoading] = useState(false);

  const register = ({email, password}: FormikValues) => {
    setLoading(true);

    return api
      .post<User>('auth/register', {email, password})
      .then(({data}) => setAuthData(data))
      .catch(({message}) => setMessage(message))
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={globalStyles.inputContainer}>
          <RegisterForm register={register} loading={loading} />
          <Button
            style={globalStyles.button}
            mode="text"
            onPress={() => navigation.replace(Scenes.Login)}>
            Log in
          </Button>
        </View>
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

export default Register;
