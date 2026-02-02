import { useState, useEffect, useRef } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true); // ← Prevents setState on unmount
  const prevValueRef = useRef(value);

  useEffect(() => {
    mountedRef.current = true;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Immediate for empty/unchanged (safe with mountedRef)
    if (String(value) === "" || prevValueRef.current === value) {
      if (mountedRef.current) {
        setDebouncedValue(value);
      }
      prevValueRef.current = value;
      return;
    }

    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setDebouncedValue(value);
        prevValueRef.current = value;
      }
    }, delay);

    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}
