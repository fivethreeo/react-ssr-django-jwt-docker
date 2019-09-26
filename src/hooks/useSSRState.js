import {
  useContext,
  useState
} from 'react';

import { useImmediateEffect } from './useImmediateEffect';
import { SSRCacheContext } from '../utils/SSRCache';

export const useSSRState = (init, key, context) => {
  const SSRCache = useContext(SSRCacheContext);
  const [hasSSRState, setHasSSRState] = useState(false);
  const [state, setState] = useState(init);

  useImmediateEffect(() => {
    if (!hasSSRState) {
        const value = SSRCache.get(key, context)
        if (typeof value !== 'undefined') {
          setState(value);
          setHasSSRState(true);
        }
      }
    }
  );


  return [state, hasSSRState, setState];
};