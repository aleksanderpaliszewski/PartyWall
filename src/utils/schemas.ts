import {object, string} from 'yup';

export const LogInSchema = object().shape({
  password: string()
    .min(8, 'Password must have a minimum of 8 characters')
    .required('Enter password'),
  email: string().email('Invalid email').required('Enter email address'),
});
