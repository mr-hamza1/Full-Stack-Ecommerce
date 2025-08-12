import { useState, useEffect } from "react";

// Reusable debounce hook
export function useDebounce(value, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // cleanup if value changes before delay
  }, [value, delay]);

  return debouncedValue;
}
