import tough  from 'tough-cookie';

const Cookie = tough.Cookie;

export const getParsedCookies = (cookie_headers) => {
  return cookie_headers ? 
    (cookie_headers instanceof Array ?
      cookie_headers : [cookie_headers])
    .map(Cookie.parse) : [];
}

export const getCookie = (parsed_cookies, cookie_name) => {
  return parsed_cookies.filter(
    (cookie) => (cookie.key === cookie_name));
}

