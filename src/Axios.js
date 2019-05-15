import React, { useContext } from 'react';
import { CookieContext } from './Cookies';
import axios from 'axios';

let api_uri = process.env.RAZZLE_API_URI;

if (process.env.NODE_ENV === 'development') {
  api_uri = 'http://' + process.env.HOST + ':' + (parseInt(process.env.PORT) + 2);
}

export const getAxios = (cookies) => {
  const authAxios = axios.create();

  authAxios.interceptors.request.use(
    config => {
      const token = cookies.get("token");
      config.headers['Authorization'] = `Bearer: ${token}`;
      return config;
    },
    error => Promise.reject(error)
  );
  const login = (email, password) => {
    return axios.post(api_uri + '/api/token/', {
      email: email,
      password: password
    })
    .then(function (response) {
      cookies.set('token', response.token, {
        path: '/',
        expires: new Date(new Date().getTime()+1000*60*60*24),
        maxAge: 60*60*24,
        domain: process.env.HOST,
        secure: process.env.RAZZLE_NO_HTTPS === 'true' ? false : true,
        httpOnly: false,
        sameSite: true
      });

      console.log(response);
    });

  } 
  const register = (username, email, password) => {
    return axios.post(api_uri + '/api/users', {
      username: username,
      email: email,
      password: password
    })
    .then(function (response) {
      console.log(response);
    });

  } 
  return { axios: authAxios, login, register };
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