import React, { useContext } from 'react';
import { CookieContext } from './Cookies';
import axios from 'axios';

export const getAxios = (cookies) => {
  const authAxios = axios.create();
  const noauthAxios = axios.create();
  return { authAxios, noauthAxios };
}

export const AxiosContext = React.createContext(null);

export default (props) => {

  const cookies = useContext(CookieContext);

  return (
    <AxiosContext.Provider value={getAxios(cookies)}>
      {props.children}
    </AxiosContext.Provider>
  );
}