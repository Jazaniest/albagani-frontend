import { useState, useEffect } from "react";

/**
 * useDebounce Hook
 * Menunda perubahan nilai selama `delay` milidetik.
 * 
 * @param {any} value - Nilai yang akan di-debounce
 * @param {number} delay - Waktu tunda dalam milidetik (default: 500ms)
 * @returns {any} - Nilai yang sudah di-debounce
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
