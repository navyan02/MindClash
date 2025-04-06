import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const isBrowser = typeof window !== "undefined";

  const [storedValue, setStoredValue] = useState(() => {
    if (!isBrowser) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.log(err);
    }
  }, [key, storedValue, isBrowser]);

  return [storedValue, setStoredValue];
}
