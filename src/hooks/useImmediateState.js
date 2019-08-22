import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';

// See https://github.com/reduxjs/react-redux/blob/316467a/src/hooks/useSelector.js#L6-L15
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

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
        if (alsoUpdate) alsoUpdate(newState)
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