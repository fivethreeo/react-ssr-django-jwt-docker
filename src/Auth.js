import React, { useContext } from 'react';

const AuthContext = React.createContext(null);

export default authComponent = (props) => {
  return (
    <AuthContext.Provider value={cookies}>
      {props.children}
    </AuthContext.Provider>
  );
}