import React, {FC, useState, useContext} from 'react';
import {FormikValues} from 'formik';

import {LoginStackScreenProps} from '../navigations/Login';
import LoginForm from '../components/LoginForm';
import ApiContext from '../contexts/apiContext';
import UserContext from '../contexts/userContext';
import SnackBarContext from '../contexts/snackbarContext';
import {Scenes} from '../api/enums';
import {User} from '../api/interface';

const Login: FC<LoginStackScreenProps<Scenes.Login>> = ({navigation}) => {
  const api = useContext(ApiContext);
  const {setAuthData} = useContext(UserContext);
  const {setMessage} = useContext(SnackBarContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = ({username, password}: FormikValues) => {
    setLoading(true);

    return api
      .post<User>('auth/login', {username, password})
      .then(({data}) => setAuthData(data))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <LoginForm
      loading={loading}
      handleSubmit={handleSubmit}
      navigateToRegister={() => navigation.replace(Scenes.Register)}
    />
  );
};

export default Login;
