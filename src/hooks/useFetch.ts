import {useState, useEffect, useContext} from 'react';

import ApiContext from '../contexts/apiContext';
import SnackBarContext from '../contexts/snackbarContext';

export const useFetch = <T = any>(initialUrl: string, other: any[] = []) => {
  const api = useContext(ApiContext);
  const {setMessage} = useContext(SnackBarContext);
  const [url, updateUrl] = useState(initialUrl);
  const [reloads, setReloads] = useState(0);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const reload = () => setReloads(reloads + 1);

  useEffect(() => {
    setIsLoading(true);
    api
      .get<T>(url)
      .then(({data: newData}) => setData(newData))
      .catch(({message}) => setMessage(message))
      .finally(() => setTimeout(() => setIsLoading(false), 300));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, api, reloads, ...other]);

  return {
    data,
    isLoading,
    updateUrl,
    reload,
  };
};
