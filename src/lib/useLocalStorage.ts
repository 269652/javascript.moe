/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { atom, useAtom } from "jotai";

const atoms: Record<string, any> = {};

function isLocalStorageAvailable() {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

function getCookie(key: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(key: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${key}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}

export const useLocalStorage = <T>(
  initialVal: T,
  key: string
): [T, (v: T) => void] => {
  if (typeof window === "undefined") return [initialVal, () => {}];

  const hasLocalStorage = isLocalStorageAvailable();

  let loaded = initialVal;
  try {
    const raw = hasLocalStorage ? localStorage.getItem(key) : getCookie(key);
    if (raw) loaded = JSON.parse(raw);
  } catch (e) {
    console.log("Error loading value for:", key, e);
  }

  if (!atoms[key]) atoms[key] = atom(loaded);

  const atm = atoms[key];
  const [val, setVal] = useAtom<T>(atm);

  useEffect(() => {
    try {
      const raw = hasLocalStorage ? localStorage.getItem(key) : getCookie(key);
      if (raw) setVal(JSON.parse(raw));
    } catch (e) {
      console.log("Error reading on mount for:", key, e);
    }
  }, []);

  const update = (newVal: T) => {
    try {
      const serialized = JSON.stringify(newVal);
      if (hasLocalStorage) {
        localStorage.setItem(key, serialized);
      } else {
        setCookie(key, serialized);
      }
      setVal(newVal);
    } catch (e) {
      console.log("Error updating value for:", key, e);
    }
  };

  return [val, update];
};
