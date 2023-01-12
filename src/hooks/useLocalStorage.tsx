import React from "react";

export function useLocalStorage(key: string, initialValue: any) {
  const [token, setToken] = React.useState(() => {
    const local = window.localStorage.getItem(key);
    return local ? local : initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, token);
  }, []);

  return { token, setToken };
}
