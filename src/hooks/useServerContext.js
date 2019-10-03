import {
  useContext,
  useState
} from 'react';

import isEmpty from 'is-empty';

import { useImmediateEffect } from './useImmediateEffect';
import ServerContext from '../common/ServerContext';

const useServerContext = (init, context) => {
  const serverContextValue = useContext(ServerContext);
  const [hasServerContext, setHasServerContext] = useState(false);
  const [state, setState] = useState(init);

  useImmediateEffect(() => {
      if (!isEmpty(serverContextValue)) {
        setState(serverContextValue);
        setHasServerContext(true);
      }
    }
  );

  return [state, hasServerContext, setState];
};

export default useServerContext;
