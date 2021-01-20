import React, {FC, useState, useContext} from 'react';
import {FormikValues} from 'formik';

import RegisterForm from '../components/RegisterForm';
import ApiContext from '../contexts/apiContext';
import SnackBarContext from '../contexts/snackbarContext';
import UserContext from '../contexts/userContext';
import {LoginStackScreenProps} from '../navigations/Login';
import {Scenes} from '../api/enums';
import {User} from '../api/interface';

const Register: FC<LoginStackScreenProps<Scenes.Register>> = ({navigation}) => {
  const api = useContext(ApiContext);
  const {setAuthData} = useContext(UserContext);
  const {setMessage} = useContext(SnackBarContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = ({username, password}: FormikValues) => {
    setLoading(true);

    return api
      .post<User>('auth/register', {username, password})
      .then(({data}) => setAuthData(data))
      .catch(({message}) => setMessage(message))
      .finally(() => setLoading(false));
  };

  return (
    <RegisterForm
      loading={loading}
      handleSubmit={handleSubmit}
      navigateToLogin={() => navigation.replace(Scenes.Login)}
    />
  );
};

export default Register;
