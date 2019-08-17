import React, { createContext } from 'react';
import serialize from 'serialize-javascript';

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

  ssr.get = (key) => data[key];
  ssr.set = (key, val) => data[key] = val;
  
  ssr.Provider = ({children}) => <SSRCacheContext.Provider value={ssr}>{children}</SSRCacheContext.Provider>;

  if (typeof window !== 'undefined' && window[windowkey]) {
    ssr.restoreData(window[windowkey]);
  }

  return ssr;
}

