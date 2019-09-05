import React, { createContext } from 'react';
import serialize from 'serialize-javascript';
import stringify from 'fast-json-stable-stringify';

// When we have separate strings it's useful to run a progressive
// version of djb2 where we pretend that we're still looping over
// the same string
const phash = (h, x) => {
  h = h | 0;
  for (let i = 0, l = x.length | 0; i < l; i++) {
    h = (h << 5) + h + x.charCodeAt(i);
  }

  return h;
};

// This is a djb2 hashing function
const hash = (x) => phash(5381 | 0, x) >>> 0;


export const SSRCacheContext = createContext(null);

export const SSRDataComponent = ({ windowkey, data, ...props }) => {
  return (
    <script
      type="text/javascript"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `window.${windowkey}=${serialize(data)}`,
      }}
      {...props}
    />
  );
}

export const createSSRCache = (params={}) => {
  
  const windowkey = params.windowkey ? params.windowkey : '__SSRDATA__';

  const data = {};

  const ssr = () => {}
  
  ssr.restoreData = (restore) => Object.assign(data, restore);
  ssr.extractData = () => Object.assign({}, data);
  ssr.Component = (props) => <SSRDataComponent data={data} windowkey={windowkey} {...props} />;

  ssr.get = (key, context) => {
    const hashkey = context ? phash(key, stringify(context)) >>> 0 : key;
    return data[hashkey];
  };

  ssr.set = (key, val, context) => {
    const hashkey = context ? phash(key, stringify(context)) >>> 0 : key;
    data[hashkey] = val;
  }

  ssr.Provider = ({children}) => <SSRCacheContext.Provider value={ssr}>{children}</SSRCacheContext.Provider>;

  if (typeof window !== 'undefined' && window[windowkey]) {
    ssr.restoreData(window[windowkey]);
  }

  return ssr;
}

