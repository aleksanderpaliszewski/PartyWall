import {createContext} from 'react';
import Api from './api';

const ApiContext = createContext<Api>(new Api((e) => Promise.reject(e)));

export default ApiContext;
