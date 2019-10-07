import { useServerNoopEffect } from './IsomorphicEffects';

export const useWindowEvent = (event, callback) => {
  useServerNoopEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

export const useGlobalMouseClick = (callback) => {
  return useWindowEvent('click', callback);
};

export const useGlobalMouseUp = (callback) => {
  return useWindowEvent('mouseup', callback);
};

export const useGlobalMouseMove = (callback) => {
  return useWindowEvent('mousemove', callback);
};