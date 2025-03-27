import { createStore } from "solid-js/store";

interface Auth {
  [key: string]: any;
}

export const [Auth, setAuth] = createStore<Auth>({});

// Recuperare un valore
export const getAuth = (key: string) => {
  return Auth[key];
};