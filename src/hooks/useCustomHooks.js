import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for debounced values
 * Delays updating the debounced value until the user stops typing
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const debounceTimer = useRef(null);

  useEffect(() => {
    clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(debounceTimer.current);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for localStorage
 * Syncs state with localStorage
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Custom hook for performance monitoring
 */
export function usePerformanceMonitor(componentName) {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      console.log(`${componentName} rendered in ${(endTime - startTime).toFixed(2)}ms`);
    };
  }, [componentName]);
}
