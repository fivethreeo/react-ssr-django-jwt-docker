import {
  useContext,
  useCallback,
  useState
} from 'react';

import { useImmediateEffect } from './useImmediateEffect';
import { SSRCacheContext } from '../utils/SSRCache';

export const useSSRState = (init, key, context) => {
  const SSRCache = useContext(SSRCacheContext);
  const [hasSSRState, setHasSSRState] = useState(false);
  const [state, setState] = useState(init);

  // This wraps setState and updates SSRCache
  const updateState = useCallback(
    (action) => {
      setState((state) => {
        const newState =
          typeof action === 'function'
            ? action(state)
            : action;
        if (typeof window === 'undefined') SSRCache.set(key, newState, context);
        setHasSSRState(true);
        return newState
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setState]
  );

  useImmediateEffect(() => {
    if (!hasSSRState) {
        const value = SSRCache.get(key, context)
        console.log(value)
        if (typeof value !== 'undefined') {
          setState(value);
          setHasSSRState(true);
        }
      }
    }
  );


  return [state, hasSSRState, setState];
};