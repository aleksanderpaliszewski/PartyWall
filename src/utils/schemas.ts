import {object, string, number, ref} from 'yup';

export const LogInSchema = object().shape({
  password: string()
    .min(8, 'Password must have a minimum of 8 characters')
    .required('Enter password'),
  username: string().required('Enter username'),
});

export const RegisterSchema = object().shape({
  password: string()
    .min(8, 'Password must have a minimum of 8 characters')
    .required('Enter password'),
  passwordConfirmation: string()
    .oneOf([ref('password')], 'The entered passwords are not the same')
    .required('Repeat password'),
  username: string().required('Enter username'),
});

export const AddProductSchema = object().shape({
  name: string().required('Enter name'),
  price: string().required('Enter price'),
  quantity: number()
    .typeError('Invalid Input: numbers please')
    .required('Enter quantity'),
});
