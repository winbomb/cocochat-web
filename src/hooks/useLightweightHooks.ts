import React, { useEffect, useCallback } from "react";

/**
 * Lightweight replacement for rooks' useKey
 * Attaches a keyboard event listener for the specified key
 */
export function useKey(
  key: string,
  callback: (event: KeyboardEvent) => void,
  options?: { when?: boolean; target?: React.RefObject<any>; eventTypes?: string[] }
) {
  const when = options?.when !== false;
  const eventTypes = options?.eventTypes || ["keydown"];
  const target = options?.target;
  const handler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        callback(event);
      }
    },
    [key, callback]
  );

  useEffect(() => {
    if (!when) return;
    const element = target?.current || document;
    eventTypes.forEach((eventType) => {
      element.addEventListener(eventType, handler);
    });
    return () => {
      eventTypes.forEach((eventType) => {
        element.removeEventListener(eventType, handler);
      });
    };
  }, [when, handler, target, eventTypes]);
}

/**
 * Lightweight replacement for rooks' useOutsideClick
 * Calls callback when a click happens outside the referenced element
 */
export function useOutsideClick(ref: React.RefObject<HTMLElement | null>, callback: (event: MouseEvent) => void) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
}

/**
 * Lightweight replacement for rooks' useLocalstorageState
 * Syncs state with localStorage
 */
export function useLocalstorageState<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const [value, setValue] = React.useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors
    }
  }, [key, value]);

  const remove = React.useCallback(() => {
    localStorage.removeItem(key);
    setValue(initialValue);
  }, [key, initialValue]);

  return [value, setValue, remove];
}

/**
 * Lightweight replacement for rooks' useDebounce
 * Returns a debounced version of the callback
 */
export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const callbackRef = React.useRef(callback);
  callbackRef.current = callback;

  return React.useCallback((...args: any[]) => {
    const timer = setTimeout(() => callbackRef.current(...args), delay);
    return () => clearTimeout(timer);
  }, [delay]);
}