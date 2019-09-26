import {
  useRef,
  useState,
  useCallback
} from 'react';

import { useIsomorphicLayoutEffect } from './IsomorphicEffects';

/**
 * This is a drop-in replacement for useState, limited to object-based state.
 * During initial mount it will mutably update the state, instead of scheduling
 * a React update using setState
 */
export const useImmediateState = (init) => {
  const isMounted = useRef(false);
  const [state, setState] = useState(init);

  // This wraps setState and updates the state mutably on initial mount
  const updateState = useCallback(
    (action, alsoUpdate) => {
      if (!isMounted.current) {
        const newState =
          typeof action === 'function'
            ? action(state)
            : action;
        Object.assign(state, newState);
      } else {
        setState(action);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return [state, updateState];
};