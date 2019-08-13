import React, { useContext, useState } from "react";
import serialize from 'serialize-javascript';

const ServerContext = React.createContext(null);

export const ServerContextProvider = ({value, children}) => {
  return (
  	<ServerContext.Provider value={value}>
  	  {children}
  	</ServerContext.Provider>)
}

export const useServerContext = (contextKey, defaultValue) => { 

    const serverContext = useContext(ServerContext);

    const setServerContextValue = (value) => {
      serverContext[contextKey] = value;
    }
    
    return [serverContext[contextKey] ? serverContext[contextKey] : defaultValue, setServerContextValue];
}

export const ServerContextComponent = ({ nonce,  context }) => {
  return (
    <script
      type="text/javascript"
      nonce={nonce}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `window.__SERVER_CONTEXT__=${serialize(context)}`,
      }}
    />
  );
}

export default ServerContext; 
