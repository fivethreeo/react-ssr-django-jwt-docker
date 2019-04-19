import React, { useContext } from 'react';
import { CookieContext } from './Cookies';
import axios from 'axios';

export const getAxios = (cookies) => {
  const authAxios = axios.create();
  return { axios: authAxios };
}

export const AxiosContext = React.createContext(null);

const AxiosProvider = (props) => {

  const cookies = useContext(CookieContext);

  return (
    <AxiosContext.Provider value={getAxios(cookies)}>
      {props.children}
    </AxiosContext.Provider>
  );
}

export default AxiosProvider;