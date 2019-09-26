import React, { useContext, useEffect, useRef } from 'react';

export const RegistryContext = React.createContext();

export const useRegistry = () => {
  const registry = useRef({});

  return [registry, ({children}) => (
    <RegistryContext.Provider value={registry}>
      {children}
    </RegistryContext.Provider>)];
}

export const useRegister = (id, context, deps) => {
  const registry = useContext(RegistryContext);

  useEffect(() => {
    registry.current[id] = context;
    return () => {
      delete registry.current[id];
    }
  });
}

