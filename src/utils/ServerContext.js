import React, { useState, useContext } from "react";
import serialize from 'serialize-javascript';

const ServerContext = React.createContext(null);

export const ServerContextProvider = ({value, children}) => {
  const [state, setState] = useState(value);
  console.log(state)
  return (
  	<ServerContext.Provider value={[state, setState]}>
  	  {children}
  	</ServerContext.Provider>)
}

export const useServerContext = (contextKey) => { 
    const [state, setState] = useState(null);

    const [serverState, setServerState] = useContext(ServerContext);
    	console.log(state)

    React.useEffect(() => {
    	setServerState(state);
    }, [state]);
    return [serverState, setState];
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
