import React, { useContext } from 'react';
import { CookieContext } from './Cookies';
import axios from 'axios';

let api_host = '';

if (process.env.NODE_ENV === 'development') {
  api_host = process.env.HOST + ':' + (parseInt(process.env.PORT) + 2);
}

export const getAxios = (cookies) => {
  const authAxios = axios.create();
  const login = (email, password) => {
    axios.post('http://' + api_host + '/api/token/', {
      email: email,
      password: password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  } 
  const register = (username, email, password) => {
    axios.post('http://' + api_host + '/api/users', {
      username: username,
      email: email,
      password: password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
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