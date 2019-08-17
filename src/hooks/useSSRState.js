import {
  useContext,
  useCallback,
} from 'react';

import { useImmediateEffect } from "./useImmediateEffect";
import { useImmediateState } from "./useImmediateState";

import { SSRCacheContext } from '../utils/SSRCache';

export const useSSRState = (init, keycontext, keyfun = (keycontext) => keycontext) => {
  const key = keyfun(keycontext);
  const SSRCache = useContext(SSRCacheContext);
  const [state, setState] = useImmediateState(init);

  useImmediateEffect(() => {
    const value = SSRCache.get(key)
    if (value!==undefined) {
      setState(value)
    }
  });
  // This wraps setState and updates the state mutably on initial mount
  const updateState = useCallback(
    (action) => {
      setState(action, (v) => SSRCache.set(key, v));
      
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return [state, updateState];
};