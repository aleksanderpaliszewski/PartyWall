import {object, string, ref} from 'yup';

export const LogInSchema = object().shape({
  password: string()
    .min(8, 'Password must have a minimum of 8 characters')
    .required('Enter password'),
  email: string().email('Invalid email').required('Enter email address'),
});

export const RegisterSchema = object().shape({
  password: string()
    .min(8, 'Password must have a minimum of 8 characters')
    .required('Enter password'),
  passwordConfirmation: string()
    .oneOf([ref('password')], 'The entered passwords are not the same')
    .required('Repeat password'),
  email: string().email('Invalid email').required('Enter email address'),
});
