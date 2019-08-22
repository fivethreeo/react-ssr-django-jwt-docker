import {
  useContext,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';


import { useImmediateEffect } from "./useImmediateEffect";
import { useImmediateState } from "./useImmediateState";

import { SSRCacheContext } from '../utils/SSRCache';

// See https://github.com/reduxjs/react-redux/blob/316467a/src/hooks/useSelector.js#L6-L15
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useSSRState = (init, keycontext, keyfun = (keycontext) => keycontext) => {
  const key = keyfun(keycontext);
  const SSRCache = useContext(SSRCacheContext);
  const [state, setState] = useImmediateState(init);

  useImmediateEffect(() => {
      const value = SSRCache.get(key)
      if (typeof value !== 'undefined') {
        setState(value, (updatedValue) => {
          if (typeof window !== 'undefined') Object.assign(state, updatedValue);
        });
      }
    },
  []);

  // This wraps setState and updates the state mutably on initial mount
  const updateState = useCallback(
    (action) => {
      setState(action, (updatedValue) => {
        if (typeof window === 'undefined') SSRCache.set(key, updatedValue); Object.assign(state, updatedValue);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return [state, updateState];
};