import { useRef, useCallback } from 'react';

const useDebounce = (fn, delay) => {
  const timeoutRef = useRef(null);

  const debouncedFn = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }, [fn, delay]);

  return debouncedFn;
}

export default useDebounce;
