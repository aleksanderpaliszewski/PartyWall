import React, {FC, useState, useContext} from 'react';
import {FormikValues} from 'formik';

import RegisterForm from '../components/RegisterForm';
import ApiContext from '../utils/apiContext';
import SnackBarContext from '../utils/snackbarContext';
import UserContext from '../utils/userContext';
import {LoginStackScreenProps} from '../navigations/Login';
import {Scenes} from '../api/enums';
import {User} from '../api/interface';

const Register: FC<LoginStackScreenProps<Scenes.Register>> = ({navigation}) => {
  const api = useContext(ApiContext);
  const {setAuthData} = useContext(UserContext);
  const {setMessage} = useContext(SnackBarContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = ({email, password}: FormikValues) => {
    setLoading(true);

    return api
      .post<User>('auth/register', {email, password})
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
