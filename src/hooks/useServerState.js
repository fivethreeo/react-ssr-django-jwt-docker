import {
  useContext,
  useState
} from 'react';

import isEmpty from 'is-empty';

import { useImmediateEffect } from './useImmediateEffect';
import ServerStateContext from '../common/ServerStateContext';

const useServerState = (init, slice = null) => {
  const serverContextValue = useContext(ServerStateContext);
  const [hasServerState, setHasServerState] = useState(false);
  const [state, setState] = useState(init);

  useImmediateEffect(() => {
    if (!isEmpty(serverContextValue)) {
      if (!slice) {
        setState(serverContextValue);
        setHasServerState(true);
      }
      else {
        if (typeof serverContextValue[slice] !== 'undefined' &&
         !isEmpty(serverContextValue[slice])) {
          setState(serverContextValue[slice]);
          setHasServerState(true);
        }
      }
    }
  });

  return [ state, hasServerState, setState ];
};

export default useServerState;
