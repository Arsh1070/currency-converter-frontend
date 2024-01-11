import { useEffect, useRef } from 'react';

export const useDebounce = (callback: (value?: string) => void, delay: number = 500) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

/* export const useDebounce = (fn: () => void, delay: number = 500): (() => void) => {
  let timeout: NodeJS.Timeout | any;

  return function () {
    const context: any = this;
    const args: any = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      fn.apply(context, args);
    }, delay);
  };
};
 */
