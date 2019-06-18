import React, { useState, useContext } from "react";
import serialize from 'serialize-javascript';

const ServerContext = React.createContext(null);

export const ServerContextProvider = ({context, children}) => {
  const [state, setState] = useState(context);
  return (
  	<ServerContext.Provider value={[state, setState]}>
  	  {children}
  	</ServerContext.Provider>)
}

export const useServerContext = (contextKey) => {
    const [state, setState] = useContext(ServerContext);
    const setContext = (context) => {
    	const upd = {}
    	upd[contextKey] = context
    	setState(state => ({...state, ...upd}))
    }
    return [state ? state[contextKey] : null, setContext];
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
