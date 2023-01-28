import React from "react";

export default function useLocalStorage(key: string, value: string | null) {
  const [state, setState] = React.useState(() => {
    if (!value) return;

    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : value;
    } catch (e) {
      return value;
    }
  });

  React.useEffect(() => {
    if (state) {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (e) {
        console.log(e);
      }
    }
  }, [state, key]);

  return [state, setState];
}
