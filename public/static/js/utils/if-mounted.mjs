import { Hooks } from '../preact/preact.mjs';

export const useIfMounted = () => {
  const mountedRef = Hooks.useRef(false);
  Hooks.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return Hooks.useCallback((fn) => {
    return (...args) => {
      if (mountedRef.current) {
        fn(...args);
      }
    };
  }, []);
};
