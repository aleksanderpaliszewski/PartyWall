import axios, {AxiosError, AxiosResponse} from 'axios';
import qs from 'qs';
import urljoin from 'url-join';

import {API_BASE_URL} from '@env';

if (API_BASE_URL) {
  axios.defaults.baseURL = API_BASE_URL;
}

interface APIErrorPayload {
  message: string;
  details?: APIErrorDetails;
}

interface APIErrorDetails {
  [key: string]: string;
}

export class APIError extends Error {
  details: APIErrorDetails;
  status: number;
  code?: number;
  originalError: AxiosError<APIErrorPayload>;

  constructor(error: AxiosError<APIErrorPayload>) {
    if (!error.response || !error.response.data) {
      super(error.message);
      this.details = {};
      this.status = 0;
    } else {
      const {details, message}: APIErrorPayload = error.response!.data;
      super(message || error.message);
      this.details = details || {};
      this.status = error.response!.status;
    }

    this.originalError = error;
  }
}

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new APIError(error)),
);

type UnauthorizedHandler = (error: AxiosError) => Promise<never>;

export default class Api {
  handleUnauthorized: UnauthorizedHandler;

  constructor(handleUnauthorized: UnauthorizedHandler) {
    this.handleUnauthorized = handleUnauthorized;
  }

  get<T>(uri: string, query?: object): Promise<AxiosResponse<T>> {
    return axios
      .get<T>(urljoin(uri, stringifyQuery(query)))
      .catch(this.handleUnauthorized);
  }

  post<T>(uri: string, data: object): Promise<AxiosResponse<T>> {
    return axios.post<T>(uri, data).catch(this.handleUnauthorized);
  }

  static setToken(token: string) {
    console.log(token);
    axios.defaults.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  static resetToken() {
    delete axios.defaults.headers.Authorization;
  }
}

function stringifyQuery(object = {}) {
  return qs.stringify(object, {
    arrayFormat: 'repeat',
    addQueryPrefix: true,
  });
}
