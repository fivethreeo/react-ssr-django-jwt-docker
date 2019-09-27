import { useEffect, useLayoutEffect } from 'react';

// eslint-disable-next-line max-len
// See https://github.com/reduxjs/react-redux/blob/316467a/src/hooks/useSelector.js#L6-L15
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useIsomorphicNoopLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : () => ({});

export const  useIsomorphicNoopEffect =
  typeof window !== 'undefined' ? useEffect : () => ({});

export const useClientNoopEffect =
  typeof window !== 'undefined' ? () => ({}) : useEffect;

