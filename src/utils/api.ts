import axios, {AxiosError, AxiosResponse} from 'axios';
import qs from 'qs';
import urljoin from 'url-join';

import {API_BASE_URL} from '@env';

if (API_BASE_URL) {
  axios.defaults.baseURL = API_BASE_URL;
}

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
}

function stringifyQuery(object = {}) {
  return qs.stringify(object, {
    arrayFormat: 'repeat',
    addQueryPrefix: true,
  });
}
